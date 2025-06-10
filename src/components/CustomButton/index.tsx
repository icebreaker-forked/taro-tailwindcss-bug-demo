/*
 *@description:
 * @author wayne
 * @date 2023-04-14 15:10
 */

import { Button, ButtonProps } from "@nutui/nutui-react-taro";
import { Text, View } from "@tarojs/components";
import cs from "classnames";
import "./index.scss";

interface IProps extends ButtonProps {
	afterIconFontName?: string;
	beforeIconFontName?: string;
	label: string;
	rootClass?: string;
	[key: string]: any;
}

export default (props: IProps) => {
	const { label, afterIconFontName, rootClass, beforeIconFontName, ...otherProps } = props;

	return (
		//@ts-ignore
		<Button className={cs(["component_button", rootClass])} {...otherProps}>
			<View className={"component_button_icon_wrap"}>
				{beforeIconFontName && (
					<Text className={`icon-${beforeIconFontName} iconfont component_button_iconfont_before`} />
				)}
				<Text>{label}</Text>
				{afterIconFontName && <Text className={`icon-${afterIconFontName} iconfont component_button_iconfont`} />}
			</View>
		</Button>
	);
};
