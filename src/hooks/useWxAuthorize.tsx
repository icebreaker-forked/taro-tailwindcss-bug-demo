/*
 *@description:
 * @author wayne
 * @date 2023-04-25 11:23
 */
import { ResultInfoCode } from "@/api/constant";
import { doPunchTheClockApi, getStepNumber } from "@/api/modules/punchTheClock";
import Dialog, { DialogCommonTemplate } from "@/components/Dialog";
import { PUBLIC_IMG_URL, Type } from "@/constants";
import useSessionKey from "@/hooks/useSessionKey";
import useStore from "@/store";
import { getDayDetailByType } from "@/utils";
import Toast from "@/utils/Toast";
import { Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState } from "react";

const DailyWalkImg = `${PUBLIC_IMG_URL}/dialog_daily_walk.png`;

export default () => {
	const [currentStepNumber, setStepNumber] = useState<undefined | number>();
	const punchTheClockList = useStore(state => state.punchTheClock.list);
	const getPunchTheClockListAction = useStore(state => state.punchTheClock.getPunchTheClockListAction);
	const { onCheckoutSessionKey } = useSessionKey();

	//获取某一项是否授权
	const getSettingItemByScope = async (scope: string) => {
		const settings = await Taro.getSetting();
		return settings?.authSetting?.[scope];
	};
	//步行授权
	const weRunAuthorize = (callback?: (step: number) => void) => {
		getSettingItemByScope("scope.werun").then(resFlag => {
			console.log("=========resFlag:", resFlag);
			if (resFlag === undefined || resFlag) {
				const getStepCallback = () => {
					const isNotGetStepNumFlag = currentStepNumber === undefined;
					Toast.loading();
					Taro.getWeRunData({
						success: async res => {
							//获取当天的步数
							let stepsData;
							if (isNotGetStepNumFlag) {
								const { sessionKey } = await onCheckoutSessionKey();
								stepsData = await getStepNumber({
									sessionKey,
									iv: res?.iv,
									encryptedData: res?.encryptedData
								});
							}
							Toast.hideLoading();
							const stepNum = isNotGetStepNumFlag ? stepsData?.data?.data : currentStepNumber;
							callback?.(stepNum);
							setStepNumber(stepNum);
						},
						fail: () => {
							console.error("微信运动获取失败！");
							Toast.hideLoading();
						}
					});
				};
				//第一次授权
				if (resFlag === undefined) {
					Taro.authorize({
						scope: "scope.werun",
						success: getStepCallback
					});
				} else {
					getStepCallback();
				}
			} else {
				//没有开启授权
				Dialog.show({
					content: (
						<DialogCommonTemplate
							// imgUrl={DailyWalkImg}
							title={"温馨提示"}
							desc={"未开通微信运动步数权限，请前往小程序设置功能开启。"}
						/>
					),
					btns: [
						{
							label: "确定",
							type: "primary",
							fill: "outline",
							onClick: (_, c) => {
								Taro.openSetting();
								c?.();
							}
						}
					]
				});
			}
		});
	};

	//步行授权并打卡
	const weRunAuthorizePunchTheClock = (callback?: any) => {
		weRunAuthorize(currentStepNumber => {
			//打卡的配置项
			const configDetail = getDayDetailByType(punchTheClockList, Type.walk);

			//设置的目标值
			const settingStepNumber = 5000;
			//当天的步数是否达标
			const stepIsStandard = currentStepNumber >= settingStepNumber;

			//当天是否打过卡
			const isCompleted = configDetail?.isCompleted === 1;
			//减碳量
			const carbonReductionValue = configDetail?.carbonReductionValue;
			//可获得的碳币
			const carbonCoin = configDetail?.carbonCoin;

			Dialog.show({
				content: (
					<DialogCommonTemplate
						imgUrl={DailyWalkImg}
						imgMaskNode={
							isCompleted ? (
								<>
									<Text className={"iconfont icon-Frame"} />
									<Text className={"text_desc"}>已完成每日签到</Text>
								</>
							) : undefined
						}
						title={stepIsStandard ? "每日步行" : "温馨提示"}
						desc={
							stepIsStandard
								? `步行或骑行更加有益身体健康，同时平均减少二氧化碳排放${carbonReductionValue}kg/分钟。`
								: `当前已步行${currentStepNumber}步，当日步行达到5000步才可以完成该打卡哦，请再接再厉！`
						}
					/>
				),
				btns: [
					{
						label: "确定",
						type: "primary",
						onClick: async (_, c) => {
							if (stepIsStandard && !isCompleted) {
								Toast.loading();
								const res = await doPunchTheClockApi({
									stepNumber: currentStepNumber,
									type: Type.walk
								});

								if (res?.data?.code === ResultInfoCode.SUCCESS) {
									await getPunchTheClockListAction();
									if (callback) {
										await callback(Type.walk);
									}
									Toast.info(`获得${carbonCoin}碳币，减少碳排放量${carbonReductionValue}kg。`);
								}
								Toast.hideLoading();
								c?.();
							} else {
								c?.();
							}
						}
					}
				]
			});
		});
	};

	return {
		getSettingItemByScope,
		weRunAuthorizePunchTheClock,
		currentStepNumber,
		weRunAuthorize
	};
};
