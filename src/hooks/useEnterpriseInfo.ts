import { isShopProductGiftTabShow } from "@/api/modules/mine";
import Toast from "@/utils/Toast";
import { useLoad } from "@tarojs/taro";
import { useState } from "react";

export default () => {
	const [isBindOrganization, setIsBindOrganization] = useState(false);
	useLoad(async () => {
		Toast.loading();
		const res = await isShopProductGiftTabShow();
		setIsBindOrganization(res?.data?.data?.isShow);
		Toast.hideLoading();
	});

	return {
		isBindOrganization //是否绑定了组织
	};
};
