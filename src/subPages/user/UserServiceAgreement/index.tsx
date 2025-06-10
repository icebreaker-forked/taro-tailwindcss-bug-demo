/*
 *@description:
 * @author wayne
 * @date 2023-04-20 15:29
 */

import { View } from "@tarojs/components";
import { List } from "./constant";
import "./index.scss";

export default () => {
	const titleClass = "mt10 fontWeightBold fontSize16";
	const textClass = "mt10 fontSize12 textIndent";
	const lastTextClass = "mt15 fontSize12 textIndent";
	const subTitleClass = "mt10 fontSize14 pt5 fontWeightBold";

	return (
		<View className={"service_container"}>
			<View className={"fontSize18 mt20 fontWeightBold"}>123123123</View>
			<View className={"mt25"}>发布时间：2024年12月01日</View>
			{List.map((item, index) => {
				if (item.title) {
					return (
						<View key={index} className={titleClass}>
							{item.title}
						</View>
					);
				}
				if (item.subTitle) {
					return (
						<View key={index} className={subTitleClass}>
							{item.subTitle}
						</View>
					);
				}
				if (item.text) {
					return (
						<View key={index} className={textClass}>
							{item.text}
						</View>
					);
				}
				if (item.lastText) {
					return (
						<View key={index} className={lastTextClass}>
							{item.lastText}
						</View>
					);
				}
			})}
		</View>
	);
};
