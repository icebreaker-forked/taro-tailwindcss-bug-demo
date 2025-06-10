/*
 *@description:
 * @author wayne
 * @date 2023-03-31 09:37
 */

import { createJSONStorage, persist } from "zustand/middleware";

import { getStorageSync, removeStorageSync, setStorageSync } from "@tarojs/taro";
import { produce } from "immer";
import { has } from "lodash";

/**
 * 添加log
 * @param config
 */
export const addLog = config => (set, get, api) =>
	config(
		(...args) => {
			console.log("  [old state========]", get());
			set(...args);
			console.log("  [new state=========]", get());
		},
		get,
		api
	);

// 定义storage操作
const asyncLocalStorage = {
	getItem: getStorageSync,
	setItem: setStorageSync,
	removeItem: removeStorageSync
};

/**
 * 添加localStorage持久化
 * @param config
 * @param name
 */
export const StoreStorageKey = "storeStorage";
export const addLocalStoragePersist = (config, callback: (state) => object) =>
	persist(config, {
		name: StoreStorageKey,
		// 指定要存的数据
		partialize: callback,
		storage: createJSONStorage(() => asyncLocalStorage), // 自定义存储事件
		//todo why? 不加merge 事件就会丢失
		merge: (persistedState: any = {}, currentState) => {
			for (const key in persistedState) {
				if (has(currentState, key)) {
					currentState[key] = {
						...currentState[key],
						...persistedState[key]
					};
				}
			}
			return currentState;
		}
	});

/**
 * 结合immer更新对象
 * @param config
 */
export const immer = config => (set, get, api) =>
	config(
		(partial, replace) => {
			const nextState = typeof partial === "function" ? produce(partial) : partial;
			return set(nextState, replace);
		},
		get,
		api
	);
