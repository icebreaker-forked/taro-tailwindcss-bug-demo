/**
 * @description 登录校验
 */

import Dialog from "@/components/Dialog";
import Title from "@/components/Title";
import { MainColor, PUBLIC_IMG_URL } from "@/constants";
import useBindingJobNumber from "@/hooks/useBindingJobNumber";
import useStore from "@/store";
import Route from "@/utils/route";
import { View } from "@tarojs/components";
import "./index.scss";

const QuestionDialogImg = `${PUBLIC_IMG_URL}/question_dialog_img.png`;

export default (fromPage?: string) => {
	const { token } = useStore(state => state.common);
	const { onShowBindingJobNumberDialog } = useBindingJobNumber();
	const userInfo = useStore(state => state.userInfo.userInfo);
	const { isFromADWApp } = useStore(state => state.common);

	const newFromPage = fromPage ? encodeURIComponent(fromPage) : undefined;

	//登录弹窗
	const handleShowLoginTip = () => {
		Dialog.show({
			showClose: false,
			content: (
				<View style={{ padding: "30px 0" }}>
					<Title title={"欢迎登录"} />
					<View style={{ textAlign: "center", paddingTop: "15px" }}>登录天津-津志惠，开启绿色低碳新生活</View>
				</View>
			),
			btns: [
				{
					label: "取消",
					type: "primary",
					fill: "outline",
					color: MainColor,
					onClick: (_, c) => c?.()
				},
				{
					label: "去登录",
					type: "primary",
					onClick: (_, c) => {
						Route.navigateTo({
							url: "/pages/login/index",
							query: {
								fromPage: newFromPage
							}
						});
						c?.();
					}
				}
			]
		});
	};

	//显示基线测算和adw绑定工号弹窗
	const handleInitialAppDialog = () => {
		if (isFromADWApp && !Boolean(userInfo?.employeeNum)) {
			onShowBindingJobNumberDialog();
		} else if (userInfo?.isCompletePro === 0) {
			Dialog.show({
				showClose: false,
				content: (
					<View className={"question_dialog_wrap"}>
						<View className={"question_dialog_top_img"} style={{ backgroundImage: `url(${QuestionDialogImg})` }} />
						<Title title={"欢迎使用津志惠"} rootClass={"question_dialog_title"} />
						<View className={"question_dialog_desc"}>
							在开启您的低碳之旅前，首先让我们来了解一下您每周的基础碳足迹是多少吧！
						</View>
						<View className={"question_dialog_desc"}>
							下面会有一些关于您饮食和通勤方面的问题，我们将会根据您的回答来计算您的每周基础碳足迹，请您务必如实回答哦～
						</View>
					</View>
				),
				btns: [
					{
						label: "下次再说",
						type: "primary",
						fill: "outline",
						color: MainColor,
						onClick: (_, c) => c?.()
					},
					{
						label: "去填写",
						type: "primary",
						onClick: (_, c) => {
							Route.navigateTo({
								url: "/subPages/index/Question/index",
								query: {
									fromPage: newFromPage
								}
							});
							c?.();
						}
					}
				]
			});
		}
	};

	return {
		//是否登录
		isLogin: Boolean(token),
		//显示登录弹窗
		onShowLoginTip: handleShowLoginTip,
		//显示基线测算和adw绑定工号弹窗
		onInitialAppDialog: handleInitialAppDialog
	};
};
