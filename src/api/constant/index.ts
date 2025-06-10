/*
 *@description:
 * @author wayne
 * @date 2023-04-03 13:44
 */

/**
 * 网络请求 base url配置
 */
export const BaseUrl = {
	TEST: "",
	LOCAL: "",
	ONLINE: ""
};

export const HostBaseUrl = process.env.NODE_ENV === "development" ? BaseUrl.LOCAL : BaseUrl.ONLINE;

export const PUBLIC_IMG_BASE_URL = process.env.NODE_ENV === "development" ? "" : "";

/**
 * 接口请求成功后返回code
 */
export const ResultInfoCode = {
	SUCCESS: 0,
	//美团扫码已经领取过
	MTScanCode: 3431,
	//扫描不是我们的二维码
	MTScanIllegalCode: 3433,
	//兑换错误码
	EXCHANGE_COUPON_NOT_EXIST: 3423,
	EXCHANGE_GIFT_NOT_EXIST: 3424,
	EXCHANGE_NOT_EXIST: 3401,
	EXCHANGE_COUPON_SOLD_OUT: 3425,
	EXCHANGE_GIFT_SOLD_OUT: 3426,
	EXCHANGE_COUPON_INVENTORY_DEFICIENCY: 3427,
	EXCHANGE_GIFT_INVENTORY_DEFICIENCY: 3428,
	EXCHANGE_CAOBON_COIN_DEFICIENCY: 3429,
	EXCHANGE_COUPON_CODE_NOT_EXIST: 3430,
	EXCHANGE_GIFT_INVENTORY_DEFICIENCY2: 3436,
	EXCHANGE_GIFT_INVENTORY_DEFICIENCY3: 3437,
	EXCHANGE_GIFT_INVENTORY_DEFICIENCY4: 3438
};

/**
 * 一些常量
 */
export const Constants = {
	/**
	 * 最后一次登录失效的时间戳
	 */
	LOGIN_FAILURE_TIMESTAMP: "loginFailureTimeStamp",
	/**
	 * 拦截器自定义头部key
	 */
	INTERCEPTOR_HEADER: "interceptor-custom-header"
};

export const TOKEN_KEY = "X-APPLET-USER-ACCESS-TOKEN";
