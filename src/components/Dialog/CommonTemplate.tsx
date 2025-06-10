/*
 *@description:
 * @author wayne
 * @date 2023-04-11 10:54
 */
import Title from "@/components/Title";
import { View } from "@tarojs/components";
import React from "react";
import "./commonTemplate.scss";

interface IProps {
	imgUrl?: string;
	imgMaskNode?: React.ReactElement;
	title: string;
	desc: string;
	subDesc?: string;
}

export default (props: IProps) => {
	const { imgUrl, imgMaskNode, title, desc, subDesc } = props;
	return (
		<>
			{imgUrl && (
				<View className={"dialog_template_img"} style={{ backgroundImage: `url(${imgUrl})` }}>
					{/*<Image src={imgUrl} mode={"widthFix"} />*/}
					{imgMaskNode && <View className={"dialog_template_img_mask"}>{imgMaskNode}</View>}
				</View>
			)}
			{title && <Title title={title} rootClass={"dialog_template_title"} />}
			{desc && <View className={"dialog_template_desc"}>{desc}</View>}
			{subDesc && <View className={"dialog_template_sebDesc"}>{subDesc}</View>}
		</>
	);
};
