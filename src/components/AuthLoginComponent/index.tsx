import Route from "@/utils/route";
import useLoginAuth from "@/hooks/useLoginAuth/useLoginAuth";
import { View, Text } from "@tarojs/components";
import { Button } from "@nutui/nutui-react-taro";
import styles from "./index.module.scss";
import cs from "classnames";

export default (props: any) => {
	const { children, className } = props;
	const { isLogin, onShowLoginTip } = useLoginAuth(`/${Route.getCurrentRoute().url}`);

	if (!isLogin) {
		return (
			<View className={cs(styles.container, className)}>
				<Text>请登录后查看</Text>
				<Button onClick={onShowLoginTip} fill="none" type="primary">
					去登录
				</Button>
			</View>
		);
	}

	return children;
};
