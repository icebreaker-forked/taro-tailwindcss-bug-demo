/*
 *@description:
 * @author wayne
 * @date 2023-04-25 10:26
 */
import api from "../request";

//获取所有的打卡类型list
export const getPunchTheClockList = () =>
	api.get({
		url: "/green/action/getPunchEveryDays"
	});

//获取当前的步数
export const getStepNumber = data =>
	api.post({
		url: "/green/action/getStepNumber",
		data
	});

//打卡
export const doPunchTheClockApi = (data: any) =>
	api.post({
		url: "/green/action/doPunch",
		data
	});
