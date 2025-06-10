/*
 *@description:
 * @author wayne
 * @date 2023-04-26 09:31
 */

import { ResultInfoCode } from "@/api/constant";
import api from "@/api/request";
import Toast from "@/utils/Toast";
import Taro from "@tarojs/taro";

interface UploadSingleImageTypes {
	success: (fileInfo) => void;
	showLoading: boolean;
	moduleName: string;
}

export const UploadUrl = "/file/upload";

export const uploadSingleImage = (_props: UploadSingleImageTypes) => {
	const { success, showLoading, moduleName } = _props;
	Taro.chooseMedia({
		count: 1,
		mediaType: ["image"],
		success: async res => {
			const filePath = res?.tempFiles?.[0]?.tempFilePath;
			showLoading && Toast.loading();
			api.upload({
				url: UploadUrl,
				data: filePath,
				uploadModuleName: moduleName
			}).then(resData => {
				// @ts-ignore
				if (resData?.code === ResultInfoCode.SUCCESS) {
					success(resData?.data);
				}
			});
		}
	});
};

//通过button按钮上传头像
export const uploadAcatarByButton = path =>
	api.upload({
		url: UploadUrl,
		data: path,
		uploadModuleName: "avatar"
	});
