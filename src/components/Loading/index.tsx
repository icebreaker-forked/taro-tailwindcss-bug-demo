/*
 *@description:
 * @author wayne
 * @date 2023-04-12 09:21
 */
import React from "react";
import { View, Text } from "@tarojs/components";
import { Empty } from "@nutui/nutui-react-taro";
import "./index.scss";
import { PUBLIC_IMG_URL } from "@/constants";
import { Loading as LoadingIcon } from "@nutui/icons-react-taro";

interface IProps {
    //loading
    isLoading: boolean;
    //当前是否是空数据
    isEmpty?: boolean;
    //是否展示空数据
    showEmpty?: boolean;
    //自定义空数据
    emptyNode?: React.ReactNode;
    //空数据的文字描述
    emptyText?: string;
    //content
    children?: any;
    emptyImgUrl?: string;
    style?: any;
}

const Loading: React.FC<IProps> = props => {
    const { isLoading, showEmpty, emptyNode, emptyText, isEmpty, emptyImgUrl, style = {} } = props;

    if (isLoading) {
        return (
            <View className={"component_loading flex_center"} style={style}>
                <LoadingIcon />
                <Text className={"component_loading_text"}>加载中</Text>
            </View>
        );
    }

    if (showEmpty && isEmpty) {
        return (
            emptyNode ?? (
                <Empty
                    description={emptyText ?? "暂无数据"}
                    imageSize={150}
                    image={emptyImgUrl || `${PUBLIC_IMG_URL}/empty.png`}
                />
            )
        );
    }

    return props.children;
};

export default Loading;
