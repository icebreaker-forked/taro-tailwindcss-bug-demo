/*
 *@description:
 * @author wayne
 * @date 2023-06-12 15:19
 */

import useStore from "@/store";

export default () => {
	const { userInfo, mineUserInfo } = useStore(state => state.userInfo);

	const employeeNum = mineUserInfo?.userVo?.employeeNum || userInfo?.employeeNum;

	return {
		isADWFlag: Boolean(employeeNum?.indexOf("ADV") === 0)
	};
};
