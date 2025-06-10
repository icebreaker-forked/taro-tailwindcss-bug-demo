/*
 *@description:
 * @author wayne
 * @date 2023-04-03 11:18
 */

import { parseParams, transParams } from "@/utils";
import Taro, { getCurrentPages } from "@tarojs/taro";

/**
 * 路由配置对象
 */
interface IRoute {
	/**
	 * 页面路径
	 */
	url: string;
	/**
	 * query参数
	 */
	query?: {
		[key: string]: any;
	};
	/**
	 * 传递到下个页面的function
	 */
	events?: {
		[key: string]: (data?: any) => void;
	};
}

class Route {
	/**
	 * page 路由枚举
	 */
	public pageRouteEnum: {
		home: "/index/index";
		login: "/login/index";
	};

	/**
	 * 返回上一页面
	 */
	navigateBack() {
		const curPages = getCurrentPages();
		if (curPages.length <= 1) {
			console.error("已无上层页面，无法返回");
			return;
		}
		Taro.navigateBack();
	}

	/**
	 * 页面push
	 */
	navigateTo(params: IRoute) {
		this.jump({
			type: "navigateTo",
			config: params
		});
	}

	/**
	 * 重定向
	 */
	redirectTo(params: IRoute) {
		this.jump({
			type: "redirectTo",
			config: params
		});
	}

	/**
	 * 重定向
	 */
	relaunch(params: IRoute) {
		this.jump({
			type: "relaunch",
			config: params
		});
	}

	/**
	 * 切换tabbar
	 * @param params
	 */
	switchTab(params: IRoute) {
		this.jump({
			type: "switchTab",
			config: params
		});
	}

	/**
	 * 跳转页面
	 */
	jump(params: { type: "navigateTo" | "redirectTo" | "relaunch" | "switchTab"; config: IRoute }) {
		const {
			type,
			config: { url, query, events }
		} = params;

		// url校验
		if (!url) {
			throw new Error("jump方法参数校验失败：缺少url");
		}
		if (!url.startsWith("/")) {
			throw new Error("jump方法参数校验失败：url必须以“/”开头");
		}

		let suffix = "";
		if (query && Object.keys(query).length > 0) {
			suffix = transParams(JSON.stringify(query));
		}
		const finalUrl = `${url}${suffix}`;
		switch (type) {
			case "redirectTo":
				Taro.redirectTo({
					url: finalUrl
				});
				break;
			case "relaunch":
				Taro.reLaunch({
					url: finalUrl
				});
				break;
			case "switchTab":
				Taro.switchTab({
					url: finalUrl
				});
			default:
				Taro.navigateTo({
					url: finalUrl,
					events
				});
				break;
		}
	}

	/**
	 * 获取当前路由
	 */
	getCurrentRoute() {
		const currentPages = getCurrentPages();
		console.log("当前页面", currentPages);

		return {
			url: currentPages.length ? currentPages[currentPages.length - 1].route : "",
			query: currentPages.length ? parseParams(currentPages[currentPages.length - 1].$taroPath) : {}
		};
	}

	/**
	 * 返回首页
	 */
	backToHome() {
		this.switchTab({
			url: this.pageRouteEnum.home
		});
	}

	/**
	 * 跳转小程序
	 */
	navigateToMiniApp(config: { appId: string; path?: string }, success?: any) {
		Taro.navigateToMiniProgram({
			...config,
			success: () => {
				success?.();
			}
		});
	}
	/**
	 * 自定义事件触发器
	 */
	getEventChannel() {
		const pages = getCurrentPages();
		const current = pages[pages.length - 1];
		return current.getOpenerEventChannel();
	}
}

export default new Route();
