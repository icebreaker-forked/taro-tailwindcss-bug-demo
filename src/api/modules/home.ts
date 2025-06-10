/*
 *@description:
 * @author wayne
 * @date 2023-04-26 14:23
 */
import api from "@/api/request";

//低碳成绩
export const getLowCarbonAchievementDetail = () =>
	api.post({
		url: "/low/carbon/ach/getUserLowScore"
	});
export const getRealLowCarbonAchievementDetail = () =>
	api.post({
		url: "/low/carbon/ach/getUserLowScoreRt"
	});

//签到数据
export const getSignInDataApi = (data: string) =>
	api.get({
		url: `/sign/getSignInfo/${data}`
	});

//打卡签到
export const daySignInApi = () =>
	api.post({
		url: "/sign/doSign"
	});

//获取排行榜的tabs
export const getRankingTabs = () =>
	api.get({
		url: "/rank/getTabList"
	});

//获取排行榜
export const getRankingListByType = (type: string, data) => {
	const url = {
		"2": "/rank/getPersonalRank",
		"3": "/rank/getEnterpriseMonthCersRank",
		"4": "/rank/getEnterpriseLunarActivityRank",
		"5": "/rank/getEnterpriseGroupRank"
	};
	return api.post({
		url: url[type],
		data
	});
};

//排行榜
export const getRankingList = data =>
	api.post({
		url: "/rank/getGrandCarbonCoinRanks",
		data
	});

//邀请好友list
export const getInviteFriends = () =>
	api.get({
		url: "/user/getInvters"
	});

//获取知识竞答的配置 ====未登录调用的
export const getKnowledgeConfigByNotLogin = () =>
	api.get({
		url: "/knowledge/contest/getActivitysOnly"
	});

//获取知识竞答的配置
export const getKnowledgeConfig = () =>
	api.get({
		url: "/knowledge/contest/getActivitys"
	});
//获取知识竞答题库集合
export const getKnowledgeList = (id: number) =>
	api.get({
		url: `/knowledge/contest/getRandomQuestions/${id}`
	});

//提交知识竞答
export const saveKnowledgeApi = (data: any) =>
	api.post({
		url: "/knowledge/contest/submitAnswerResult",
		data
	});

//获取商品列表
export const getShopProductList = () =>
	api.get({
		url: "/peanut/shop/productList"
	});

//美团扫一扫
export const scanQrCodeApi = (exchanteTypeName: string) =>
	api.post({
		url: "/meituan/sweep/submit",
		data: { exchanteTypeName }
	});

//获取用户志愿时长
export const getUserVolunteerTime = () =>
	api.get({
		url: "/volunteer/getUserVolunteers"
	});

//志愿时长兑换
export const exchangeVolunteerTime = (data: any) =>
	api.post({
		url: "/volunteer/exchange",
		data
	});

//获取轮播图集合
export const getSwiperList = () =>
	api.get({
		url: "/common/getSlideShows"
	});

// 获取轮播图详情
export const getSwiperDetail = (id: any) =>
	api.get({
		url: `/common/getSlideShowsDetail/${id}`
	});

//获取登录编号
export const getUserNameNum = () =>
	api.get({
		url: `/applet/getUserNameNum`
	});

//获取公众号列表
export const getOffiacCountList = (data: any) =>
	api.get({
		url: "/common/getWechatArtical",
		data
	});
