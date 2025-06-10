import { Tabs } from "@nutui/nutui-react-taro";
import { useState } from "react";
import { ORDERBY_VALUES, TABS_COMMON_VALUES, TAB_SORT_VALUES } from "./constant";
import { MainColor } from "@/constants";
import cs from "classnames";
import styles from "./index.module.scss";
import InfiniteLoadingList from "../InfiniteLoadingList";
import { DataItem } from "../useData";
import { View, Image } from "@tarojs/components";
import { PUBLIC_IMG_BASE_URL } from "@/api/constant";

interface Props {
    tabs: { title: string; value: string }[];
    onTabChange: (info: { value: string; sort: string }) => void;
    className?: string;
    children: any;
    data: DataItem;
    onLoadMore: () => void;
    onRefresh: () => void;
    loading: boolean;
    tabPaneClass?: any;
    emptyImgUrl?: string;
    emptyClass?: any;
    emptyTextClass?: any;
    emptyText?: string;
}

export default (props: Props) => {
    const {
        tabs,
        onTabChange,
        data,
        onLoadMore,
        onRefresh,
        loading,
        className,
        tabPaneClass,
        emptyImgUrl,
        emptyClass,
        emptyTextClass,
        emptyText,
    } = props;
    const [tabValue, setTabValue] = useState(tabs?.[0]?.value);
    const [sortValue, setSortValue] = useState(TAB_SORT_VALUES.none);

    const handleTabChange = value => {
        setTabValue(value);
        onTabChange({ value, sort: sortValue });
    };

    const handleSetTabValue = value => {
        setTabValue(value);
        let result = TAB_SORT_VALUES.none;
        if (value === tabValue && value !== TABS_COMMON_VALUES.price) return;
        if (value === TABS_COMMON_VALUES.price && value === tabValue) {
            switch (sortValue) {
                case TAB_SORT_VALUES.none:
                    result = TAB_SORT_VALUES.desc;
                    break;
                case TAB_SORT_VALUES.desc:
                    result = TAB_SORT_VALUES.asc;
                    break;
                case TAB_SORT_VALUES.asc:
                    result = TAB_SORT_VALUES.none;
                    break;
            }
        } else {
            result = TAB_SORT_VALUES.none;
        }
        setSortValue(result);
        onTabChange({ value: tabValue, sort: result });
    };

    console.log("========tabValue:", props);

    const CurrentSortIcon = value => {
        switch (value) {
            case TAB_SORT_VALUES.asc:
                return <Image src={`${PUBLIC_IMG_BASE_URL}/icons/category-up.png`} />;
            case TAB_SORT_VALUES.desc:
                return <Image src={`${PUBLIC_IMG_BASE_URL}/icons/category-down.png`} />;
            case TAB_SORT_VALUES.none:
                return <Image src={`${PUBLIC_IMG_BASE_URL}/icons/category-default.png`} />;
        }
    };

    return (
        <Tabs
            className={cs([styles.container, className])}
            value={tabValue}
            onChange={handleTabChange}
            activeType="simple"
            tabStyle={{ backgroundColor: "transparent" }}
            title={() => {
                return tabs.map(item => {
                    return (
                        <View
                            className={cs(
                                styles.tab_title_container,
                                item.value === tabValue ? styles.active : "",
                            )}
                            onClick={() => handleSetTabValue(item.value)}>
                            <View className={styles.tab_title}>{item.title}</View>
                            {item.value === TABS_COMMON_VALUES.price && (
                                <View className={styles.sort_icon}>
                                    {CurrentSortIcon(sortValue)}
                                </View>
                            )}
                        </View>
                    );
                });
            }}
            activeColor={MainColor}>
            {tabs?.map(item => {
                // console.log("=============item:", item, tabValue == item.value);
                return (
                    <Tabs.TabPane
                        key={item.value}
                        className={tabPaneClass}
                        // title={`${item.title}${
                        //     item.value === TABS_COMMON_VALUES.price
                        //         ? sortValue === ORDERBY_VALUES.asc
                        //             ? "TOP"
                        //             : "BOTTOM"
                        //         : ""
                        // }`}
                        value={item?.value}>
                        <InfiniteLoadingList
                            key={item.value}
                            data={data}
                            onLoadMore={onLoadMore}
                            onRefresh={onRefresh}
                            loading={loading}
                            rootClass={styles.list}
                            emptyImgUrl={emptyImgUrl}
                            emptyClass={emptyClass}
                            emptyTextClass={emptyTextClass}
                            emptyText={emptyText}>
                            {item.value == tabValue ? props.children : null}
                        </InfiniteLoadingList>
                    </Tabs.TabPane>
                );
            })}
        </Tabs>
    );
};
