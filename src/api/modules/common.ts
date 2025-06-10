/*
 *@description:
 * @author wayne
 * @date 2023-04-23 16:00
 */
import api from "../request";

//授权登录
export const authorizationLogin = (data: any) =>
	api.post({
		url: "/applet/authorizationLogin",
		data
	});

//直接登录
export const login = (code: string) =>
	api.post({
		url: "/applet/login",
		data: {
			code
		}
	});

// 基础测算（9道题）
export const getNineQuestionsData = () =>
	api.get({
		url: "/basic/calculate/getProblemSet"
	});

// 基础测算保存（9道题）
export const saveNineQuestions = (data: any) =>
	api.post({
		url: "/basic/calculate/submitCalculate",
		data: {
			userCalculates: data
		}
	});

//基础测算报告（9道题）
export const getNineQuestionsReport = () =>
	api.get({
		url: "/basic/calculate/getCalculateConclusion"
	});

//获取版本号
export const getVersion = () =>
	api.get({
		url: "/applet/getVersion"
	});

//获取测试账号
export const getTestAccount = () =>
	api.get({
		url: "/applet/parameterFreeLogin"
	});
