import { ResultInfoCode } from "../../api/constant";
import { useState } from "react";

interface Props {
    api: (params: any) => Promise<any>;
}

export interface DataItem {
    current: number;
    pageSize: number;
    isHasMore: boolean;
    list: any[];
}

interface Config {
    isFirstPage?: boolean;
    initialDataItem?: DataItem;
    selectKey?: string;
    resDataKey?: string;
}

const DefaultKey = "data_defaultKey";

const InitialDataItem = {
    current: 0,
    pageSize: 20,
    isHasMore: true,
    list: [],
};

export default (props: Props) => {
    const { api, CONFIG = {} } = props;
    const [data, setData] = useState(new Map());
    const [loading, setLoading] = useState(false);

    const handleRequest = async (params?: any, config?: Config) => {
        const { isFirstPage, initialDataItem, selectKey = DefaultKey } = config ?? {};
        const { resDataKey } = CONFIG;
        const newInitialDataItem = Object.assign({}, InitialDataItem, initialDataItem);

        setLoading(true);
        const dataCopy = new Map(data);
        const currentData = dataCopy.get(selectKey) ?? newInitialDataItem;

        const res = await api?.({
            current: isFirstPage ? newInitialDataItem.current : currentData.current,
            pageSize: newInitialDataItem.pageSize,
            ...params,
        });
        const resData = res?.data;
        if (resData?.code === ResultInfoCode.SUCCESS) {
            let resDatas = resDataKey ? resData?.data?.[resDataKey] : resData?.data ?? [];

            currentData.list = isFirstPage ? resDatas : currentData?.list?.concat(resDatas);

            currentData.current = isFirstPage ? 0 : currentData.current + 1;

            if (resDatas?.length < newInitialDataItem.pageSize) {
                currentData.isHasMore = false;
            }
            dataCopy.set(selectKey, currentData);
            setData(dataCopy);
        }
        setLoading(false);
        return Promise.resolve();
    };

    /**
     * 下拉刷新回调
     */
    const handleRefresh = async (params, config: Config) => {
        console.log("=================下拉刷新");
        await handleRequest(params, config);
        return Promise.resolve();
    };

    /**
     * 继续加载更多
     */
    const handleLoadMore = async (params, config: Config) => {
        console.log("===============加载更多");
        await handleRequest(params, config);
        return Promise.resolve();
    };

    /**
     * 获取当前展示的数据
     */
    const getCurrentKeyData = (selectKey: string = DefaultKey) => {
        return data?.get(selectKey) ?? InitialDataItem;
    };

    return {
        loading,
        onRefresh: handleRefresh,
        onLoadMore: handleLoadMore,
        data,
        getCurrentKeyData,
        request: handleRequest,
    };
};
