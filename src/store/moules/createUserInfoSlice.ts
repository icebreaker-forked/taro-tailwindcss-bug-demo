/*
 *@description: 用户信息
 * @author wayne
 * @date 2023-04-23 17:19
 */

import { getUserInfo } from "@/api/modules/mine";

export interface UserInfoSliceTypes {
	setUserInfo: (info: any) => void;
	userInfo: any; //登录返回的用户信息
	mineUserInfo: any; //我的模块接口获取的用户信息
	getMineUserInfo: () => Promise<any>;
}

const initialState = {
	userInfo: {},
	mineUserInfo: {}
};

const CreateUserInfoSlice = set => {
	return {
		userInfo: {
			...initialState,
			setUserInfo: (data: any) => {
				set(state => {
					state.userInfo.userInfo = data;
				});
			},
			getMineUserInfo: async () => {
				const resData = await getUserInfo();
				const data = resData?.data?.data ?? {};
				set(state => {
					state.userInfo.mineUserInfo = data;
				});
				return data;
			}
		}
	};
};

export default CreateUserInfoSlice;
