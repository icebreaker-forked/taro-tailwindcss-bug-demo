/*
 *@description:
 * @author wayne
 * @date 2023-03-31 09:29
 */
import { create } from "zustand";
// import shallow from "zustand/shallow";
import CreateCommonSlice, { CommonSliceTypes } from "@/store/moules/createCommonSlice";
import CreateHomeSlice, { HomeSliceTypes } from "@/store/moules/createHomeSlice";
import CreatePunchTheClockSlice, { punchTheClockTypes } from "@/store/moules/createPunchTheClockListSlice";
import CreateUserInfoSlice, { UserInfoSliceTypes } from "@/store/moules/createUserInfoSlice";
import { addLocalStoragePersist, addLog, immer } from "@/store/utils";
import CreateTestSlice, { TestSlicesTypes } from "./moules/createTestSlice";

const isDevelopment = process.env.NODE_ENV === "development";

interface Store {
	test: TestSlicesTypes;
	common: CommonSliceTypes;
	userInfo: UserInfoSliceTypes;
	punchTheClock: punchTheClockTypes;
	home: HomeSliceTypes;
}

// 使用 immer 处理嵌套问题
const storeState = immer(
	addLocalStoragePersist(
		(set, get) => ({
			...CreateTestSlice(set, get),
			...CreateCommonSlice(set, get),
			...CreateUserInfoSlice(set),
			...CreatePunchTheClockSlice(set),
			...CreateHomeSlice(set, get)
		}),
		//持久化的数据从callback中返回设置
		state => ({
			common: { token: state.common.token }
		})
	)
);

const useStore = create<Store>()(isDevelopment ? addLog(storeState) : storeState);

// const useStore2 = selector:  => create<Store>()(isDevelopment ? addLog(storeState) : storeState)(selector, shallow);

export default useStore;
