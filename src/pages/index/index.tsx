import { FC, useEffect, useState } from "react";
import { ScrollView, View, Swiper, SwiperItem, Text, Image, WebView, RichText } from "@tarojs/components";
import "./index.scss";
import { APPID_ENUM, MainColor, PUBLIC_IMG_URL, STORE_PUBLIC_IMG_URL } from "@/constants";
import Route from "@/utils/route";
import useStore from "@/store";
import Toast from "@/utils/Toast";
import { useQuery } from "@tanstack/react-query";
import { getOffiacCountList, getShopProductList, getSwiperList } from "@/api/modules/home";
import Loading from "@/components/Loading";
import TitleCategory from "@/components/TitleCategory";
import useLoginAuth from "@/hooks/useLoginAuth/useLoginAuth";
import styles from "./index.module.scss";
import AuthLoginComponent from "@/components/AuthLoginComponent";
import { useDidShow, request, useLoad } from "@tarojs/taro";
import { map } from "lodash-es";
import { InfiniteLoadingList, useData } from "@/components/infiniteLoadingComponent";
import cs from "classnames";

const DEV_INFO = {
		appid: "wx6baac4702f395dbd",
		appSecret: "bfb427e4a8b3b612382d6273c4baa609"
	},
	PRO_INFO = {
		appid: "wxdbea091004a7bd04",
		appSecret: "ccd15d3b4c6fbf6a52266ac5a9223847"
	};

const Index: FC = () => {
	const launchLoading = useStore(state => state.common.launchLoading);
	const { getPunchTheClockListAction, list: clockListData } = useStore(state => state.punchTheClock);
	const { mineUserInfo, getMineUserInfo } = useStore(state => state.userInfo);
	const { data, getCurrentKeyData, loading, onLoadMore, onRefresh, request } = useData({
		api: getOffiacCountList,
		CONFIG: {
			resDataKey: "items"
		}
	});

	//轮播图集合
	const { data: swiperData, isSwiperLoading } = useQuery({
		queryKey: ["swiper-list"],
		queryFn: getSwiperList
	});
	const swiperList = swiperData?.data?.data ?? [];

	//登录校验
	const { isLogin, onInitialAppDialog, onShowLoginTip } = useLoginAuth(`/${Route.getCurrentRoute().url}`);

	//获取每日打卡的集合
	const handleGetClockList = () => {
		if (clockListData.length == 0) {
			Toast.loading();
			getPunchTheClockListAction().then(() => {
				Toast.hideLoading();
			});
		}
	};

	useEffect(() => {
		if (!launchLoading && isLogin) {
			//是否显示十道题
			// onInitialAppDialog();
			//获取每日打卡的集合
			// handleGetClockList();
			// Toast.loading();
			getMineUserInfo().then(() => {
				// Toast.hideLoading();
			});
		}
	}, [launchLoading]);

	useLoad(() => {
		request({}, { isFirstPage: true });
	});

	useDidShow(() => {
		if (!launchLoading && isLogin) {
			getMineUserInfo().then(() => {
				// Toast.hideLoading();
			});
		}
	});

	//轮播图点击
	const handleSwiperClick = (item: any) => {
		// "type": 2, //类型 1-知识竞答 2-纯图片 3-跳转动态链接 4加载动态详情 5植树节活动

		switch (item?.type) {
			case 1:
				Route.navigateTo({
					url: "/subPages/index/KnowledgeContest/index"
				});
				break;
			case 3:
			case 4:
			case 5:
				Route.navigateTo({
					url: "/subPages/index/SwiperDetailPage/index",
					query: { id: item?.id }
				});
				break;
			default:
				break;
		}
	};

	console.log("=======data:", data);

	const handleGoOfficialAccount = (info: any) => {
		Route.navigateTo({
			url: "/subPages/index/OfficialAccountDetailPage/index",
			query: {
				url: encodeURIComponent(info?.url)
			}
		});
	};

	const products = data?.get("data_defaultKey")?.list ?? [];

	return (
		<InfiniteLoadingList
			onLoadMore={onLoadMore}
			onRefresh={() => {
				onRefresh({}, { isFirstPage: true });
			}}
			showSafeArea={true}
			rootClass={"container"}
			loading={loading}
			data={getCurrentKeyData()}
		>
			<>
				<div className={styles.swiper_wrap}>
					<Swiper autoplay={true} indicatorDots={true} indicatorActiveColor={MainColor} interval={3000} circular={true}>
						{swiperList.map((item, index) => {
							return (
								<SwiperItem key={index} onClick={() => handleSwiperClick(item)}>
									<View
										style={{
											backgroundImage: `url(${STORE_PUBLIC_IMG_URL}/${item?.imgUrls})`
										}}
									/>
								</SwiperItem>
							);
						})}
					</Swiper>
				</div>
				<View className={styles.cycleCardWrap}>
					<View className={styles.cycleCard} style={{ backgroundImage: `url(${PUBLIC_IMG_URL}/cycleCard_bg.webp)` }}>
						<View className={styles.title_wrap}>
							<View
								className={styles.title}
								style={{
									backgroundImage: `url(${PUBLIC_IMG_URL}/cycleCard_title.png)`
								}}
							></View>
							{isLogin && (
								<View className={styles.nameWrap}>
									姓名：
									<Text className={styles.name}>{mineUserInfo?.userVo?.nickName ?? 0}</Text>
								</View>
							)}
						</View>
						<AuthLoginComponent>
							<View className={styles.row}>
								<View className={styles.col}>
									<Text className={styles.col_value}>{mineUserInfo?.userVo?.volunteerTime ?? 0}</Text>
									<Text className={styles.col_name}>志愿时长（h）</Text>
								</View>
								<View className={styles.col}>
									<Text className={styles.col_value}>{mineUserInfo?.userVo?.lowCarbonAch ?? 0}</Text>
									<Text className={styles.col_name}>
										减碳量（kg/CO<sub>2</sub>）
									</Text>
								</View>
								<View className={styles.col}>
									<Text className={styles.col_value}>{mineUserInfo?.userVo?.carbonCoin ?? 0}</Text>
									<Text className={styles.col_name}>碳币（个）</Text>
								</View>
							</View>
						</AuthLoginComponent>
					</View>
				</View>

				<View className={styles.list_title}>最新动态</View>

				{map(products, (item, index) => {
					const info = item?.content?.newsItem?.[0];
					return (
						<View className={styles.item_wrap} key={index}>
							<View className={styles.item} onClick={() => handleGoOfficialAccount(info)}>
								<View
									className={cs({
										[styles.item_title]: true,
										[styles.item_title_no_image]: !Boolean(info?.thumbUrl)
									})}
									key={index}
								>
									{info?.title}
								</View>
								{Boolean(info?.thumbUrl) && (
									// <Image
									//     className={styles.item_image}
									//     mode="heightFix"
									//     src={info?.thumbUrl}
									// />
									<View className={styles.item_image} style={{ backgroundImage: `url(${info?.thumbUrl})` }} />
								)}
							</View>
						</View>
					);
				})}
			</>
		</InfiniteLoadingList>
	);
};
export default Index;
