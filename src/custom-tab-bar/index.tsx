/*
 *@description:
 * @author wayne
 * @date 2023-04-03 14:56
 */
import { Tabbar } from "@nutui/nutui-react-taro";
import Taro from "@tarojs/taro";
// import "@/assets/iconfont/iconfont.css";
import Dialog from "@/components/Dialog";
import { APPID_ENUM, MainColor } from "@/constants";
import useLoginAuth from "@/hooks/useLoginAuth/useLoginAuth";
import useStore from "@/store";
import Route from "@/utils/route";
import { Home } from "@nutui/icons-react-taro";
import { View } from "@tarojs/components";
import { memo, useEffect, useState } from "react";
import "./index.scss";

interface TabbarItem {
	pagePath: string;
	text: string;
}

const list = [
	{
		pagePath: "pages/index/index",
		text: "首页"
	},
	{
		pagePath: "pages/green-living-hall/index",
		text: "订单"
	},
	{
		pagePath: "pages/accommodation/index",
		text: "专家"
	},
	{
		pagePath: "pages/mine/index",
		text: "我的"
	}
];

// const TabItemActionPng = `${PUBLIC_IMG_URL}/tab_bar_action.png`;

const ICON_LIST = ["shouye", "lvhuoguan", "action1", "wode"];

const CustomTabBar = (): JSX.Element => {
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const { isLogin, onShowLoginTip } = useLoginAuth();
	const versionNum = useStore(state => state.common.versionNum);

	const handleSwitch = index => {
		if (!isLogin && index === 3) {
			onShowLoginTip();
			return;
		}

		if (index === 1) {
			if (versionNum > 6) {
				Dialog.show({
					showClose: false,
					content: (
						<View className={"new_dialog"}>
							<View className={"title"}>温馨提示</View>
							<View className={"msg"}>功能上新中，敬请期待...</View>
						</View>
					),
					btns: [
						{
							label: "确定",
							type: "primary",
							fill: "outline",
							onClick: (_, c) => c?.()
						}
					]
				});
				return;
			}

			Route.navigateToMiniApp({
				appId: APPID_ENUM.greenLivingHallAppid
			});
			return;
		}
		// 默认选中当前页面
		const currentRouteInfo = Route.getCurrentRoute();
		const currentClickPagePath = list?.[index]?.pagePath;
		if (currentRouteInfo.url === currentClickPagePath && activeIndex != index) {
			setActiveIndex(Number(index));
			return;
		}
		Taro.switchTab({
			url: `/${currentClickPagePath}`
		});
	};

	const getIndex = path => list.findIndex(item => item.pagePath === path);

	useEffect(() => {
		// 默认选中当前页面
		const currentRouteInfo = Route.getCurrentRoute();
		if (currentRouteInfo.url) {
			setActiveIndex(getIndex(currentRouteInfo.url));
		}

		// 监听变化
		wx.onAppRoute((res: { path: string }) => {
			if (res.path) {
				const index = getIndex(res.path);
				setActiveIndex(index >= 0 ? index : 0);
			}
		});
	}, []);

	return (
		<Tabbar
			size={23}
			fixed={true}
			value={activeIndex}
			activeColor={MainColor}
			onSwitch={handleSwitch}
			inactiveColor={"#A1B6BF"}
			className={"container"}
		>
			{list.map((item, index) => {
				const icon = ICON_LIST[index];
				return (
					<Tabbar.Item
						iconSize={23}
						key={index}
						// href={item.pagePath}
						title={item.text}
						icon={<Home size={18} />}
					/>
				);
			})}
		</Tabbar>
	);
};

export default memo(CustomTabBar);
