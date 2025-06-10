/*
 *@description:
 * @author wayne
 * @date 2023-04-03 16:33
 */

import { PUBLIC_IMG_BASE_URL } from "@/api/constant";

/**
 * 主题色
 */
export const MainColor = "#01BB61";

//静态图片
export const PUBLIC_IMG_URL = `${PUBLIC_IMG_BASE_URL}images`;

//从小程序访问web端上传的图片
export const STORE_PUBLIC_IMG_URL =
	process.env.NODE_ENV === "development"
		? // ? "http://121.36.46.110:16923/operation"
			"https://tjcarbon.greendev.org.cn/operation"
		: "https://tjcarbon.greendev.org.cn/operation";

//低碳成绩四个模块的枚举
export const LowCarbonAchievementEnum = {
	//低碳出行
	LowCarbonTravel: 1,
	//低碳饮食
	LowCarbonDiet: 2,
	//低碳居家
	LowCarbonHome: 3,
	//低碳办公
	LowCarbonOffice: 4
};

//分类
//1-邀请 2-签到 3-步行 4-素食 5-利用 6-光盘 7-肉质 8-带饭 9-飞行 10-骑行 11-公共交通 12-新能源 13-纸张 14缩短开会
// 15-邮件 16-关灯。电器 17-楼梯 18-分类 19-采购 20-环保 21-回收 22-节水 23-完成培训 24-捡捨 25-种树 26-其他
export const Type = {
	invite: 1,
	signIn: 2,
	walk: 3,
	vegetarianDie: 4,
	utilize: 5,
	lightDisk: 6,
	meat: 7,
	bringMeal: 8,
	fly: 9,
	cycling: 10,
	publicTransport: 11,
	newEnergy: 12,
	paper: 13,
	shortenTheMeeting: 14,
	email: 15,
	douseTheGlim: 16,
	stairs: 17,
	classification: 18,
	purchase: 19,
	environmentalProtection: 20,
	recycle: 21,
	waterSaving: 22,
	finishTraining: 23,
	pickUpHouse: 24,
	plantTrees: 25,
	others: 26
};

//默认头像
export const Default_avatar =
	"https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132";

//小程序appid
export const APPID_ENUM = {
	//绿活馆appid
	greenLivingHallAppid: "wx506a54d521adb870",
	//住宿
	accommodation: "wxce093265318bdb44"
};
