/*
 *@description:
 * @author wayne
 * @date 2023-04-03 10:09
 */

import { PUBLIC_IMG_BASE_URL } from "@/api/constant";
import { Default_avatar, PUBLIC_IMG_URL, Type } from "@/constants";
import Taro from "@tarojs/taro";

/**
 * 转换JSON格式字符串为url拼接字符串
 * @param param
 */
export const transParams = function (param) {
	const paramObj = JSON.parse(param);
	let paramStr = "";
	for (const key in paramObj) {
		if (paramObj.hasOwnProperty(key)) {
			const element = paramObj[key];
			paramStr = "" + paramStr + (paramStr.length > 0 ? "&" : "?") + key + "=" + element;
		}
	}
	return paramStr;
};

export const parseParams = href => {
	let name, value;
	let json = {};
	let str = href;
	let num = str.indexOf("?");
	if (num < 0) {
		return json;
	}
	str = str.substr(num + 1);
	let arr = str.split("&");
	for (let i = 0; i < arr.length; i++) {
		num = arr[i].indexOf("=");
		if (num > 0) {
			name = arr[i].substring(0, num);
			value = arr[i].substr(num + 1);
			// json[name] = /^\d+$/.test(value) ? parseFloat(value) : value;
			json[name] = value;
		}
	}
	return json;
};

//获取打卡当list中的某一项的具体详情
export const getDayDetailByType = (list: any[], type: number) => {
	return list?.find(i => i.type === type);
};

//获取绿行动中的图片url
export const getGreenActionImgUrlByType = (type: number) => {
	let imgName = "";
	switch (type) {
		//每日步行
		case Type.walk:
			imgName = "dialog_daily_walk";
			break;

		//低碳饮食
		case Type.vegetarianDie:
			imgName = "low_carbon_img_diet0";
			break;
		case Type.utilize:
			imgName = "low_carbon_img_diet1";
			break;
		case Type.lightDisk:
			imgName = "low_carbon_img_diet2";
			break;
		case Type.meat:
			imgName = "low_carbon_img_diet3";
			break;
		case Type.bringMeal:
			imgName = "low_carbon_img_diet4";
			break;

		//低碳出行
		case Type.fly:
			imgName = "low_carbon_img_walking1";
			break;
		case Type.cycling:
			imgName = "low_carbon_img_walking2";
			break;
		case Type.publicTransport:
			imgName = "low_carbon_img_walking3";
			break;
		case Type.newEnergy:
			imgName = "low_carbon_img_walking4";
			break;

		//低碳工作
		case Type.paper:
			imgName = "low_carbon_img_office0";
			break;
		case Type.shortenTheMeeting:
			imgName = "low_carbon_img_office2";
			break;
		case Type.email:
			imgName = "low_carbon_img_office1";
			break;
		case Type.douseTheGlim:
			imgName = "low_carbon_img_office3";
			break;
		case Type.stairs:
			imgName = "low_carbon_img_office4";
			break;

		//低碳居家
		case Type.classification:
			imgName = "low_carbon_img_home0";
			break;
		case Type.purchase:
			imgName = "low_carbon_img_home1";
			break;
		case Type.environmentalProtection:
			imgName = "low_carbon_img_home2";
			break;
		case Type.recycle:
			imgName = "low_carbon_img_home3";
			break;
		case Type.waterSaving:
			imgName = "low_carbon_img_home4";
			break;

		//志愿服务
		case Type.finishTraining:
			imgName = "low_carbon_img_trip0";
			break;
		case Type.pickUpHouse:
			imgName = "low_carbon_img_trip1";
			break;
		case Type.plantTrees:
			imgName = "low_carbon_img_trip2";
			break;
		case Type.others:
			imgName = "low_carbon_img_trip3";
	}

	return `${PUBLIC_IMG_URL}/${imgName}.png`;
};

export const getModuleImgUrl = path => (path ? `${PUBLIC_IMG_BASE_URL}${path}` : Default_avatar);

//获取导航栏高度详情
export const getNavigationBarHeight = () => {
	const systemInfo = Taro.getSystemInfoSync();
	const statusBarHeight = systemInfo.statusBarHeight as number;
	const menuInfo = Taro.getMenuButtonBoundingClientRect();
	const menuHeight = (menuInfo.top - statusBarHeight) * 2 + menuInfo.height;

	return {
		statusBarHeight,
		menuHeight,
		barHeight: statusBarHeight + menuHeight
	};
};

/**
 * 转换手机号
 */

export const transformPhone = (phone: string) => {
	if (!phone) return "-";
	const newPhone = `${phone}`;
	return `${newPhone.slice(0, 3)}****${newPhone.slice(7, 12)}`;
};
