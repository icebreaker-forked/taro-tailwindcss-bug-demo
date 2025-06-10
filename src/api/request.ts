/*
 *@description:
 * @author wayne
 * @date 2023-04-03 10:47
 */

/**
 * 请求基类
 */

import { Constants, HostBaseUrl, ResultInfoCode, TOKEN_KEY } from "@/api/constant";
import useStore from "@/store";
import Toast from "@/utils/Toast";
import Taro from "@tarojs/taro";
import dataInterceptor from "./interceptors/data.interceptor";
import delInterceptor from "./interceptors/del.interceptor";
import headerInterceptor from "./interceptors/header.interceptor";
import paramInterceptor from "./interceptors/param.interceptor";
import urlInterceptor from "./interceptors/url.interceptor";

// 添加拦截器
const getInterceptors = () => {
	return [
		urlInterceptor,
		headerInterceptor,
		paramInterceptor,
		dataInterceptor,
		delInterceptor,
		Taro.interceptors.logInterceptor,
		Taro.interceptors.timeoutInterceptor
	];
};
getInterceptors().forEach(interceptorItem => Taro.addInterceptor(interceptorItem));

interface IOptions {
	hostBaseUrl: string;
	[key: string]: any;
}

interface IRequestConfig {
	url: string;
	data?: any;
	method: "GET" | "POST" | "PUT" | "DELETE" | "UPLOAD";
	[key: string]: any;
}

interface Response {
	code: string;
	data: any;
}

class BaseRequest {
	public options: IOptions;

	constructor(options) {
		this.options = options;
	}

	public async request({
		url,
		data,
		method,
		header = {
			"Content-Type": "application/json"
		},
		dataType = "json", //返回的数据格式
		responseType = "text", //相应的数据类型
		uploadModuleName = "", //文件上传的模块name
		showToast = true,
		crossHeaderInterceptor = false
	}: IRequestConfig): Promise<any> {
		const hostUrl = this.options ? this.options.hostBaseUrl : "";
		// 添加自定义请求头，用于host和header处理
		header[Constants.INTERCEPTOR_HEADER] = {
			hostUrl,
			showToast,
			crossHeaderInterceptor
		};

		// UPLOAD方法特殊处理
		if (method === "UPLOAD") {
			return new Promise((resolve, reject) => {
				return Taro.uploadFile({
					url: `${hostUrl}${url}`,
					filePath: data,
					name: "file",
					formData: { moduleName: uploadModuleName },
					header: {
						[TOKEN_KEY]: useStore.getState()?.common?.token
					},
					success(res) {
						const resultData = res.data;
						console.log("=====uploadRes:", res);
						console.log("=====uploadFile success", JSON.parse(resultData));
						const result = JSON.parse(resultData);
						if (result.code === ResultInfoCode.SUCCESS) {
							resolve(result);
						} else {
							Toast.info(result.msg);
							reject(result);
						}
					},
					fail(err) {
						console.log("=====uploadFile err", err);
						reject(err);
					}
				});
			});
		} else {
			return Taro.request({
				url,
				data,
				method,
				header,
				dataType,
				responseType
			});
		}
	}

	public get(payload: {
		url: string;
		data?: any;
		showToast?: boolean;
		header?: any;
		crossHeaderInterceptor?: boolean;
	}): Promise<Response> {
		return this.request({
			method: "GET",
			...payload
		});
	}

	public post(payload: {
		url: string;
		data?: any;
		showToast?: boolean;
		header?: any;
		crossHeaderInterceptor?: boolean;
	}): Promise<Response> {
		return this.request({
			method: "POST",
			...payload
		});
	}

	public put(payload: {
		url: string;
		data: any;
		showToast?: boolean;
		header?: any;
		crossHeaderInterceptor?: boolean;
	}): Promise<Response> {
		return this.request({
			method: "PUT",
			...payload
		});
	}

	public delete(payload: {
		url: string;
		data: any;
		showToast?: boolean;
		header?: any;
		crossHeaderInterceptor?: boolean;
	}): Promise<Response> {
		return this.request({
			method: "DELETE",
			...payload
		});
	}

	/**
	 * 上传文件
	 */
	public upload(payload: {
		url: string;
		data: any;
		uploadModuleName?: string;
		showToast?: boolean;
		header?: any;
		crossHeaderInterceptor?: boolean;
	}): Promise<Response> {
		return this.request({
			...payload,
			method: "UPLOAD",
			header: {
				"Content-Type": "multipart/form-data"
			}
		});
	}
}

export default new BaseRequest({ hostBaseUrl: HostBaseUrl });
