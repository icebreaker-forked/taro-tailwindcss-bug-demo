import api from "../request";

//获取所有话题
export const getTopicList = () =>
	api.get({
		url: "/dynamic/getTopics"
	});

//发布动态
export const createDynamicApi = (data: any) =>
	api.post({
		url: "/dynamic/release",
		data: data
	});

//动态列表
export const getDynamicList = (data: any) =>
	api.post({
		url: "/dynamic/getDynamicList",
		data: data
	});

//关注切换
export const onAttentionChangeApi = (data: any) =>
	api.post({
		url: "/dynamic/attention",
		data: data
	});

//点赞切换
export const onUpvoteChangeApi = (data: any) =>
	api.post({
		url: "/dynamic/upvote",
		data: data
	});

//获取铃铛数量
export const getBellMshCount = () =>
	api.get({
		url: "/dynamic/getBellMshCount"
	});

//获取话题详情页
export const getTopicDetail = (data: any) =>
	api.post({
		url: "/dynamic/getTopicDynamicList",
		data: data
	});

//动态列表
export const getDynamicDetail = (id: any) =>
	api.get({
		url: `/dynamic/getDynamicDetail/${id}`
	});

//获取一级评论
export const getFirstComments = (data: any) =>
	api.post({
		url: "/dynamic/getCommentList",
		data: data
	});

//获取二级评论
export const getSecondComments = (data: any) =>
	api.post({
		url: "/dynamic/getSecondCommentList",
		data: data
	});
//添加评论
export const addCommentsApi = (data: any) =>
	api.post({
		url: "/dynamic/addComment",
		data: data
	});

//删除评论
export const deleteDynamicComment = (id: any) =>
	api.get({
		url: `/dynamic/delComment/${id}`
	});

//获取用户动态列表
export const getDynamicListByUser = (data: any) =>
	api.post({
		url: "/dynamic/getUserDynamicList",
		data: data
	});

//获取用户绿动圈详情
export const getUserDynamicDetail = (userId: any) =>
	api.get({
		url: `/dynamic/getUserDynamic/${userId}`
	});

//获取用户关注列表
export const getUserAttentionList = (data: any) =>
	api.post({
		url: `/bell/msg/getAttentionList`,
		data: data
	});

//获取用户粉丝列表
export const getUserFansList = (data: any) =>
	api.post({
		url: `/bell/msg/getFansList`,
		data: data
	});

//获取消息通知列表
export const getBellMsgList = (data: any) =>
	api.post({
		url: `/bell/msg/getBellMsgList`,
		data: data
	});
