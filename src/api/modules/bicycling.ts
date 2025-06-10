/**
 * 骑行
 */
import api from "../request";

//获取历史骑行记录
export const getRidingCycleRecordApi = () =>
	api.get({
		url: "/green/action/getRidingCycleRecord"
	});

//新增骑行记录
export const addRidingCycleRecordApi = data =>
	api.post({
		url: "/green/action/addRidingCycleRecord",
		data
	});

//更新骑行记录
export const editRidingCycleRecordApi = (data: any) =>
	api.post({
		url: "/green/action/editRidingCycleRecord",
		data
	});
