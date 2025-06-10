/*
 *@description:  当日打卡的校验集合
 * @author wayne
 * @date 2023-04-25 10:55
 */

import { getPunchTheClockList } from "@/api/modules/punchTheClock";

export interface punchTheClockTypes {
	list: any[];
	getPunchTheClockListAction: () => Promise<any>;
}

const InitialState = {
	list: []
};

const CreatePunchTheClockSlice = set => {
	return {
		punchTheClock: {
			...InitialState,
			getPunchTheClockListAction: async () => {
				const res = await getPunchTheClockList();
				const list = res?.data?.data ?? [];
				set(state => {
					state.punchTheClock.list = list;
				});
				return res;
			}
		}
	};
};
export default CreatePunchTheClockSlice;
