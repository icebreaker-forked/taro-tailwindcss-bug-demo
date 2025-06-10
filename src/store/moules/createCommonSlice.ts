/*
 *@description:
 * @author wayne
 * @date 2023-04-23 15:49
 */

export interface CommonSliceTypes {
	launchLoading: true;
	token: string;
	sessionKey: any;
	setStoreCommonInfo: (obj) => Promise<any>;
	inviteUserId: any;
	isFromADWApp: boolean;
	language: string;
	versionNum?: number;
}

const initialState = {
	token: "",
	launchLoading: true,
	sessionKey: "",
	inviteUserId: undefined,
	isFromADWApp: false,
	language: "zh_CN",
	versionNum: undefined
	// Taro.getStorageSync("ty_locale") ?? Taro.getSystemInfoSync().language !== "zh_CN"
	//     ? "en_US"
	//     : "zh_CN",
};

const CreateCommonSlice = (set, get) => {
	return {
		common: {
			...initialState,
			setStoreCommonInfo: async obj => {
				set(state => {
					state.common = {
						...get()?.common,
						...obj
					};
				});
			}
		}
	};
};

export default CreateCommonSlice;
