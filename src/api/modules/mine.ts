/*
 *@description:
 * @author wayne
 * @date 2023-05-05 16:06
 */
import api from "../request";

//获取我的信息
export const getUserInfo = () =>
	api.get({
		url: "/user/getMine"
	});

//获取我的碳排放详情
export const getCarbonDischargeDetail = () =>
	api.get({
		url: "/carbon/report/getReport"
	});

//获取低碳行为明细
export const getLowCarbonBehaviorDetails = (data: any) =>
	api.post({
		url: "/carbon/report/getLowCarbonDetails",
		data
	});

//绑定工号
export const bindJobNumApi = (data: any) =>
	api.post({
		url: "/user/group/bindingNum",
		data
	});

//判断是否显示我的组织
export const showOrganizationItemApi = () =>
	api.get({
		url: "/user/group/judgeShowOrNot"
	});

//判断我的组织中是否显示分组
export const showGroupItemApi = () =>
	api.get({
		url: "/user/group/getGroups"
	});

//获取组织信息
export const getOrganizationDetailApi = () =>
	api.get({
		url: "/user/group/getMyGroup"
	});

//问题反馈
export const saveProblemFeedbackApi = (data: any) =>
	api.post({
		url: "/feed/back/submitFeedBack",
		data
	});

//更新用户信息
export const updateMineApi = data =>
	api.post({
		url: "/user/update",
		data
	});

//获取企业集合
export const getEnterpriseList = (data: any) =>
	api.post({
		url: "/user/group/getEnterprises",
		data
	});

//总工会认证
export const tradeAuthApi = (data: any) =>
	api.post({
		url: "/user/group/authentication",
		data
	});

//判断低碳普惠中是否显示美团骑行
export const getIsShowMtCycleApi = () =>
	api.get({
		url: "/meituan/sweep/judgeShoeOrNot"
	});

//获取美团骑行数据
export const getMtCycleDataApi = () =>
	api.get({
		url: "/meituan/sweep/getRecord"
	});

//获取碳币商城列表
export const getCarbonStoreList = (data: any) =>
	api.post({
		url: "/carbon/store/list",
		data
	});
//判断礼品是否显示
export const isShopProductGiftTabShow = () =>
	api.get({
		url: "/carbon/store/judgeShoeOrNot"
	});
//获取商品详情
export const getStoreProductDetail = (id: number) =>
	api.get({
		url: `/carbon/store/detail/${id}`
	});

//商品兑换
export const exchangeProductApi = (data: any) =>
	api.post({
		url: "/carbon/store/exchange",
		data
	});

//获取碳币明细
export const getCarbonDetail = data =>
	api.post({
		url: "/coin/getCarbonCoinDetails",
		data
	});

//获取低碳普惠list
export const getPrattList = (data: any) =>
	api.post({
		url: "/carbon/store/prattList",
		data
	});

//省市区接口
export const getAddressInfoList = (id?: number = 0) =>
	api.get({
		url: `/region/getchildren/${id}`
	});

//获取消息通知未读数量
export const getMessageNotificationNotReadNum = () =>
	api.get({
		url: `/system/msg/notReadCount`
	});

//消息通知列表
export const getMessageNotification = (data: any) =>
	api.post({
		url: "/system/msg/list",
		data
	});

//获取打卡详情

export const getPunchDetail = (id: any) =>
	api.get({
		url: `/system/msg/getPunchDetail/${id}`
	});
