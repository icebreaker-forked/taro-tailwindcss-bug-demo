import { useDidHide, useDidShow } from "@tarojs/taro";
import { useEffect } from "react";
// 全局样式
import "./app.scss";
import { PUBLIC_IMG_URL } from "./constants";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const SharePosterImg = `${PUBLIC_IMG_URL}/invite_poster.png`;

const App = (props: { children: React.ReactNode }) => {
	const queryClient = new QueryClient();
	// 可以使用所有的 React Hooks
	useEffect(() => {});

	// 对应 onShow
	useDidShow(() => {});

	// 对应 onHide
	useDidHide(() => {});

	return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>;
};

export default App;
