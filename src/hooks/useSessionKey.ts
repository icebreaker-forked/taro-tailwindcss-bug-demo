/*
 *@description: 校验sessionKey是否过期
 * @author wayne
 * @date 2023-04-27 13:52
 */
import { login } from "@/api/modules/common";
import useStore from "@/store";
import Taro from "@tarojs/taro";

interface checkResTypes {
	sessionKey: string;
}

export default () => {
	const sessionKey = useStore(state => state.common.sessionKey);
	const setStoreCommonInfo = useStore(state => state.common.setStoreCommonInfo);

	const handleCheckoutSessionKey = (): Promise<checkResTypes> => {
		return new Promise(resolve => {
			Taro.checkSession({
				success: () => {
					resolve({ sessionKey });
				},
				fail: async () => {
					const wxRes = await Taro.login();
					const res = await login(wxRes?.code);
					const firstResData = res?.data?.data;
					const token = firstResData?.token;
					setStoreCommonInfo({ token, sessionKey: firstResData?.sessionKey });
					resolve({ sessionKey: firstResData?.sessionKey });
				}
			});
		});
	};

	return {
		onCheckoutSessionKey: handleCheckoutSessionKey
	};
};
