/*
 *@description:
 * @author wayne
 * @date 2023-04-17 16:52
 */
// import Taro from "@tarojs/taro";
import CustomButton from "@/components/CustomButton";
import { PUBLIC_IMG_URL } from "@/constants";
import useStore from "@/store";
import Route from "@/utils/route";
import { Checkbox } from "@nutui/nutui-react-taro";
import { Navigator, Text, View } from "@tarojs/components";
import cs from "classnames";
import { useState } from "react";
import "./index.scss";

const Logo = `${PUBLIC_IMG_URL}/logo_tianjin.png`;

export default () => {
	const { userInfo, setUserInfo } = useStore(state => state.userInfo);
	const [checked, setChecked] = useState(false);

	//登录
	const handleLogin = e => {
		if (!e.detail?.code) {
			// Toast.info("请先授权手机号！");
			return;
		}

		setUserInfo({
			...userInfo,
			iv: e.detail?.iv,
			encryptedData: e.detail?.encryptedData
		});

		Route.redirectTo({
			url: "/subPages/user/UserNickNameAndAvatar/index",
			query: Route.getCurrentRoute().query
		});
	};

	return (
		<>
			<View className={"login_container"}>
				<View className={"login_logo"} style={{ backgroundImage: `url(${Logo})` }} />
				<View className={"login_title"}>津志惠</View>
				<View className={"login_sub_title"}>从津开始 共享绿色未来</View>
				{/*@ts-ignore*/}
				<CustomButton
					openType={"getPhoneNumber"}
					type={"primary"}
					rootClass={cs({
						["submit_btn"]: true,
						["submit_btn_disabled"]: !checked
					})}
					label={"微信登录"}
					// beforeIconFontName={"wx"}
					onGetPhoneNumber={handleLogin}
					disabled={!checked}
				/>

				<Checkbox
					checked={checked}
					onChange={e => {
						setChecked(e);
					}}
				>
					<View className={"login_others"} onClick={e => e.stopPropagation()}>
						<Text className={"login_msg"}>请查看并同意</Text>

						<Navigator url={"/subPages/user/UserServiceAgreement/index"}>《用户服务协议》</Navigator>
						<Text className={"login_msg"}>和</Text>
						<Navigator url={"/subPages/user/PrivacyPolicy/index"}>《隐私政策》</Navigator>
					</View>
				</Checkbox>
			</View>
		</>
	);
};
