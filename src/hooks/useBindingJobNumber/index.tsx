/*
 *@description:
 * @author wayne
 * @date 2023-06-12 14:19
 */
import { ResultInfoCode } from "@/api/constant";
import { bindJobNumApi } from "@/api/modules/mine";
import Dialog from "@/components/Dialog";
import Title from "@/components/Title";
import useStore from "@/store";
import Toast from "@/utils/Toast";
import { Input } from "@nutui/nutui-react-taro";
import { View } from "@tarojs/components";
import { useRef, useState } from "react";
import "./index.scss";

export default () => {
	const setStoreCommonInfo = useStore(state => state.common.setStoreCommonInfo);
	const jobNumberRef = useRef(undefined);
	const [value, setValue] = useState(undefined);

	const handleJobNumberChange = val => {
		setValue(val);
		jobNumberRef.current = val;
	};

	const handleBindingJobNumber = (callback?: () => void) => {
		Dialog.show({
			// showClose: false,
			content: (
				<View className={"binding_jobNum"}>
					<Title title={"绑定组织"} rootClass={"binding_jobNum_title"} />
					<View className={"binding_jobNum_subTitle"}>输入企业专有工号</View>
					<Input
						autoFocus={true}
						align={"center"}
						value={value}
						placeholder={"输入工号"}
						className={"input"}
						// onConfirm={handleJobNumberChange}
						onBlur={handleJobNumberChange}
						// onInput={handleJobNumberChange}
						onChange={handleJobNumberChange}
					/>
				</View>
			),
			btns: [
				{
					type: "primary",
					fill: "outline",
					label: "提交",
					onClick: (_, c) => {
						if (!jobNumberRef.current) {
							Toast.info("请输入工号！");
							return;
						}
						Toast.loading();

						bindJobNumApi({ employeeNum: jobNumberRef.current }).then(res => {
							Toast.hideLoading();
							if (res.data?.code === ResultInfoCode.SUCCESS) {
								setStoreCommonInfo({
									token: res?.data?.data
								}).then(() => {
									callback?.();
									c?.();
								});
							}
						});
					}
				}
			]
		});
	};

	return {
		onShowBindingJobNumberDialog: handleBindingJobNumber
	};
};
