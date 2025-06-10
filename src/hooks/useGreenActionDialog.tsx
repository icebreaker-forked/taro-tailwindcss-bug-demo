/*
 *@description:
 * @author wayne
 * @date 2023-04-25 15:10
 */

import { ResultInfoCode } from "@/api/constant";
import { doPunchTheClockApi } from "@/api/modules/punchTheClock";
import { uploadSingleImage } from "@/api/modules/upload";
import Dialog, { DialogCommonTemplate } from "@/components/Dialog";
import { PUBLIC_IMG_URL, Type } from "@/constants";
import useStore from "@/store";
import { getDayDetailByType } from "@/utils";
import Toast from "@/utils/Toast";
import { Photograph } from "@nutui/icons-react-taro";
import { ButtonProps } from "@nutui/nutui-react-taro";
import { Text } from "@tarojs/components";

interface ShowGreenActionDialogProps {
	type: number;
	imgUrl: string;
	callback?: () => any;
}

interface BtnInfoProps extends ButtonProps {
	label: string;
	onClick: (_: Event, c: () => void) => void;
}

interface TitleInfo {
	title: string;
	subTitle: string;
	btnInfo: BtnInfoProps;
}

const DailyWalkImg = `${PUBLIC_IMG_URL}/dialog_daily_walk.png`;

export default () => {
	const { list, getPunchTheClockListAction } = useStore(state => state.punchTheClock);

	/**
	 * 根据type获取不同的title和提交btn
	 * @param type
	 */
	const getShowGreenActionDialogTitleInfo = (type: number, configDetail: any, callback?: any): TitleInfo => {
		//是否已完成打卡
		const isCompleted = configDetail?.isCompleted;
		//获得的碳币
		const carbonCoin = configDetail?.carbonCoin;
		//减碳量
		const carbonReductionValue = configDetail?.carbonReductionValue;
		//title
		const title = configDetail?.name;
		//title desc
		const titleDesc = configDetail?.callWord;

		//通用的btn
		const getBtnInfo = () => {
			return {
				label: isCompleted ? "确定" : "我已完成",
				type: "primary",
				fill: isCompleted ? "ouline" : "solid",
				onClick: async (_, c) => {
					if (isCompleted) {
						c?.();
					} else {
						Toast.loading();
						const res = await doPunchTheClockApi({ type });
						if (res?.data?.code === ResultInfoCode.SUCCESS) {
							await getPunchTheClockListAction();
							if (callback) {
								await callback(type);
							}
							Toast.info(`获得${carbonCoin}碳币，减少碳排放量${carbonReductionValue}kg。`);
						}
						// Toast.hideLoading();
						c?.();
					}
				}
			};
		};

		//拍照的btn
		const getPhotoBtnInfo = () => {
			return {
				label: isCompleted ? "我已完成" : "拍照上传",
				fill: isCompleted ? "ouline" : "solid",
				icon: <Photograph />,
				type: "primary",
				onClick: (_, c) => {
					if (isCompleted) {
						c?.();
					} else {
						uploadSingleImage({
							moduleName: "punch",
							showLoading: true,
							success: async (fileInfo: any) => {
								const res = await doPunchTheClockApi({
									type,
									fieldId: fileInfo?.id,
									fieldUrl: fileInfo?.url
								});
								if (res?.data?.code === ResultInfoCode.SUCCESS) {
									await getPunchTheClockListAction();
									if (callback) {
										await callback(type);
									}
									Toast.info(`获得${carbonCoin}碳币，减少碳排放量${carbonReductionValue}kg。`);
								}
								c?.();
								// Toast.hideLoading();
							}
						});
					}
				}
			};
		};

		switch (type) {
			case Type.vegetarianDie:
			case Type.stairs:
			case Type.finishTraining:
			case Type.pickUpHouse:
			case Type.plantTrees:
			case Type.others:
				return {
					title,
					subTitle: titleDesc,
					btnInfo: getPhotoBtnInfo()
				};
			case Type.utilize:
			case Type.lightDisk:
			case Type.meat:
			case Type.bringMeal:
			case Type.fly:
			case Type.cycling:
			case Type.publicTransport:
			case Type.newEnergy:
			case Type.paper:
			case Type.shortenTheMeeting:
			case Type.email:
			case Type.douseTheGlim:
			case Type.classification:
			case Type.purchase:
			case Type.environmentalProtection:
			case Type.recycle:
			case Type.waterSaving:
				return {
					title,
					subTitle: titleDesc,
					btnInfo: getBtnInfo()
				};
		}
		return {
			title: "",
			subTitle: "",
			btnInfo: {}
		};
	};

	/**
	 * 根据不同的type打开不同的弹窗
	 * @param _props
	 */
	const showGreenActionDialog = (_props: ShowGreenActionDialogProps) => {
		const { type, imgUrl, callback } = _props;
		const configDetail = getDayDetailByType(list, type);
		console.log("=========config:", configDetail);

		const { title, subTitle, btnInfo } = getShowGreenActionDialogTitleInfo(type, configDetail, callback);

		Dialog.show({
			content: (
				<DialogCommonTemplate
					imgMaskNode={
						configDetail?.isCompleted ? (
							<>
								<Text className={"iconfont icon-Frame"} />
								<Text className={"text_desc"}>{`已完成${title}`}</Text>
							</>
						) : undefined
					}
					imgUrl={imgUrl || DailyWalkImg}
					title={title}
					desc={subTitle}
				/>
			),
			btns: [btnInfo]
		});
	};

	return {
		showGreenActionDialog
	};
};
