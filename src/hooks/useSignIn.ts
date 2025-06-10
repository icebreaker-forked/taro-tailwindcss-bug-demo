/*
 *@description: 签到相关
 * @author wayne
 * @date 2023-04-27 11:26
 */
import useStore from "@/store";
import Toast from "@/utils/Toast";
import dayjs from "dayjs";
import { useMemo } from "react";

export default () => {
	const { getSignInData, signInDataMap } = useStore(state => state.home);

	const handleGetSignInData = async (data: string, showLoading?: boolean = true) => {
		if (showLoading) {
			Toast.loading();
		}
		await getSignInData(data);
		if (showLoading) Toast.hideLoading();
	};

	const todayIsSignIn = useMemo(() => {
		const currentMonthStr = dayjs().format("YYYY-MM");
		const currentMonthData = signInDataMap.get(currentMonthStr);

		const list = currentMonthData?.signs;
		return list?.some(i => i == dayjs().get("date"));
	}, [signInDataMap]);

	return {
		onGetSignInData: handleGetSignInData,
		signInDataMap,
		todayIsSignIn
	};
};
