/*
 *@description:
 * @author wayne
 * @date 2023-05-17 10:21
 */
import { Close } from "@nutui/icons-react-taro";
import { Button, Dialog as NutuiDialog } from "@nutui/nutui-react-taro";
import { View } from "@tarojs/components";
import cs from "classnames";
import React from "react";
import "../index.scss";

interface IProps {
	visible: boolean;
	onCancel: () => void;
	showClose?: boolean;
	className?: string;
	children: React.ReactElement;
	btns: any[];
}

export default (props: IProps) => {
	const { visible, onCancel, showClose = false, className = "" } = props;
	return (
		<NutuiDialog visible={visible} className={cs(["component_dialog", className])} footer={null}>
			{showClose && <Close onClick={onCancel} className={"dialog_close_icon"} />}
			{props.children}
			{Boolean(props.btns?.length) && (
				<View
					className={cs({
						["dialog_btns"]: true,
						["dialog_btns_2"]: props.btns?.length > 1
					})}
				>
					{props.btns?.map((item, index) => (
						<Button
							key={index}
							{...item}
							onClick={e => {
								//@ts-ignore
								item?.onClick?.(e, onCancel);
							}}
						>
							{item.label}
						</Button>
					))}
				</View>
			)}
		</NutuiDialog>
	);
};
