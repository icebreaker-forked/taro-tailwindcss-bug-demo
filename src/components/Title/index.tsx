/*
 *@description:
 * @author wayne
 * @date 2023-04-11 17:16
 */
import { Text, View } from "@tarojs/components";
import cs from "classnames";
import "./index.scss";

interface IProps {
	title: string;
	rootClass?: string;
}

export default (props: IProps) => {
	const { title, rootClass } = props;

	return (
		<View className={cs(["component_title", rootClass])}>
			<Text className={"component_title_text"}>{title}</Text>
		</View>
	);
};
