/*
 *@description:
 * @author wayne
 * @date 2023-04-26 14:42
 */

import { getLowCarbonAchievementDetail, getRealLowCarbonAchievementDetail, getSignInDataApi } from "@/api/modules/home";

export interface HomeSliceTypes {
	lowCarbonAchievementDetail: any;
	getLowCarbonAchievementDetail: () => Promise<any>;
	getRealLowCarbonAchievementDetail: () => Promise<any>;
	updateLowCarbonAchievementDetailByPunchTheClock: () => Promise<any>;
	signInDataMap: any;
	getSignInData: (d: string) => Promise<any>;
}

const InitialState = {
	//低碳成绩数据
	lowCarbonAchievementDetail: {},
	//签到数据
	signInDataMap: new Map()
};

const CreateHomeSlice = (set, get) => {
	return {
		home: {
			...InitialState,
			getLowCarbonAchievementDetail: async () => {
				const res = await getLowCarbonAchievementDetail();
				const detailData = res?.data?.data ?? {};
				set(state => {
					state.home.lowCarbonAchievementDetail = detailData;
				});
				return res;
			},
			//todo 后端因为缓存原因拿不到最新数据，掉后端另一个接口
			getRealLowCarbonAchievementDetail: async () => {
				const res = await getRealLowCarbonAchievementDetail();
				const detailData = res?.data?.data ?? {};
				set(state => {
					state.home.lowCarbonAchievementDetail = detailData;
				});
				return res;
			},
			//获取签到数据
			getSignInData: async data => {
				const res = await getSignInDataApi(data);
				const resData = res?.data?.data ?? {};
				set(state => {
					const oldData = new Map(get().home.signInDataMap);
					oldData.set(data, resData);
					state.home.signInDataMap = oldData;
				});
				return resData;
			}
		}
	};
};

export default CreateHomeSlice;
