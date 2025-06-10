/*
 *@description:
 * @author wayne
 * @date 2023-04-10 17:09
 */
import DialogCommonTemplate from "@/components/Dialog/CommonTemplate";
import { Close } from "@nutui/icons-react-taro";
import { Button, ButtonProps, DialogProps, Dialog as NutuiDialog } from "@nutui/nutui-react-taro";
import { View } from "@tarojs/components";
import { TaroRootElement, document } from "@tarojs/runtime";
import Taro from "@tarojs/taro";
import cs from "classnames";
import React from "react";
import "./index.scss";

import ReactDOM, { unmountComponentAtNode } from "react-dom";

interface BtnItem extends ButtonProps {
	label: string;
}

interface IProps extends DialogProps {
	content: React.ReactElement | ((props: { onRemove: () => void }) => React.ReactElement);
	btns: BtnItem[];
	showClose: boolean;
}

const Dialog: any = {};

Dialog.show = (props: IProps) => {
	const { showClose = true } = props;

	//todo 如何添加到根节点，如何移除view标签
	const view = document.createElement("view");
	view.setAttribute("style", "position: fixed;z-index: 100000");
	const currentPages = Taro.getCurrentPages();
	const currentPage = currentPages[currentPages.length - 1]; // 获取当前页面对象
	const path = currentPage.$taroPath;
	//@ts-ignore
	const pageElement = document.getElementById<TaroRootElement>(path);
	pageElement?.appendChild(view);

	const handleRemove = () => {
		unmountComponentAtNode(view);
		// document.remove(view);
	};

	const _props = {
		visible: true,
		footer: null,
		closeOnOverlayClick: false,
		...props,
		onCancel: handleRemove,
		content: null
	};

	ReactDOM.render(
		<NutuiDialog {..._props} className={cs(["component_dialog", props.className])}>
			{showClose && (
				<Close
					onClick={handleRemove}
					className={"dialog_close_icon"}
					color={"#fff"}
					style={{ color: "#fff", backgroundColor: "#fff" }}
				/>
			)}
			{typeof props.content === "function" ? props.content({ onRemove: handleRemove }) : props.content}
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
								item?.onClick?.(e, handleRemove);
							}}
						>
							{item.label}
						</Button>
					))}
				</View>
			)}
		</NutuiDialog>,
		view
	);
};

export { DialogCommonTemplate };
export default Dialog;
