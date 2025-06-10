/**
 * data拦截器 处理数据格式 接口错误等
 */

import Toast from "@/utils/Toast";
import route from "@/utils/route";
import Taro from "@tarojs/taro";
import { Constants, ResultInfoCode } from "../constant";

export default function (chain) {
	const requestParams = chain.requestParams;
	const { header } = requestParams;
	const { showToast } = header[Constants.INTERCEPTOR_HEADER];
	return chain
		.proceed(requestParams)
		.then(res => {
			// 先判断状态码
			if (res.statusCode !== 200) {
				// 错误处理
				console.error(`====接口异常: ${res.data.path}`, res.code);
				if (showToast) {
					Toast.info("很抱歉，数据临时丢失，请耐心等待修复");
				}
				return Promise.resolve("很抱歉，数据临时丢失，请耐心等待修复");
			}
			// 状态码为200时的错误处理
			// 2. 接口返回错误code时前端错误抛出
			// 3. 登录失效前端逻辑处理
			if ("登录失效处理" && false) {
				// Taro.removeStorageSync(Constants.TOKEN);
				Taro.showToast({
					title: res.data?.msg,
					icon: "none",
					duration: 800
				});
				setTimeout(() => {
					Taro.navigateTo({
						url: route.pageRouteEnum.login
					});
				}, 800);
			} else if (
				[
					ResultInfoCode.SUCCESS,
					ResultInfoCode.MTScanCode,
					ResultInfoCode.MTScanIllegalCode,
					ResultInfoCode.EXCHANGE_COUPON_NOT_EXIST,
					ResultInfoCode.EXCHANGE_GIFT_NOT_EXIST,
					ResultInfoCode.EXCHANGE_NOT_EXIST,
					ResultInfoCode.EXCHANGE_COUPON_SOLD_OUT,
					ResultInfoCode.EXCHANGE_GIFT_SOLD_OUT,
					ResultInfoCode.EXCHANGE_COUPON_INVENTORY_DEFICIENCY,
					ResultInfoCode.EXCHANGE_GIFT_INVENTORY_DEFICIENCY,
					ResultInfoCode.EXCHANGE_CAOBON_COIN_DEFICIENCY,
					ResultInfoCode.EXCHANGE_COUPON_CODE_NOT_EXIST
				].indexOf(res.data?.code) === -1 &&
				showToast
			) {
				if (res.data?.code === "50000") {
					Toast.info("系统开小差了");
				} else {
					Toast.info(res.data?.msg);
				}
			}
			return Promise.resolve(res);
		})
		.catch(err => {
			Taro.hideLoading();
			Toast.info("网络开小差了");
			return Promise.reject(err);
		});
}
