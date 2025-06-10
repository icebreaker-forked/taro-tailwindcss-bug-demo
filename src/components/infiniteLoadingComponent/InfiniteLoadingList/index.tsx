/**
 * 上拉加载，下拉刷新列表
 */
import { memo, forwardRef } from "react";
import { InfiniteLoading } from "@nutui/nutui-react-taro";
import Loading from "../../Loading";
import cs from "classnames";
import styles from "./index.module.scss";
import { DataItem } from "../useData";

interface Props {
    showSafeArea?: boolean;
    children?: any;
    rootClass?: any;
    //空数据的文字描述
    emptyText?: string;
    emptyImgUrl?: string;
    data: DataItem;
    onRefresh: () => any;
    onLoadMore: () => any;
    loading: boolean;
    emptyClass?: any;
    emptyTextClass?: any;
    emptyContainerClass?: any;
}

export default memo(
    forwardRef((props: Props, ref) => {
        const {
            showSafeArea,
            rootClass,
            emptyText,
            emptyImgUrl,
            onRefresh,
            onLoadMore,
            data,
            loading,
            emptyClass,
            emptyTextClass,
            emptyContainerClass,
        } = props;

        // const isMountRef = useRef(false);

        /**
         * 监听params
         */
        // useEffect(() => {
        //     if (isMountRef.current) {
        //         Toast.loading();
        //         handleRequest(true).then(() => {
        //             Toast.hideLoading();
        //         });
        //     } else {
        //         isMountRef.current = true;
        //     }
        // }, [params]);

        return (
            <InfiniteLoading
                className={cs({
                    [styles.SafeArea_class]: showSafeArea,
                    [rootClass]: true,
                })}
                loadMoreText={data?.list?.length == 0 ? " " : "没有更多了"}
                pullingText={<Loading isLoading={true} style={{ padding: 0 }} />}
                loadingText={<Loading isLoading={true} style={{ padding: 0 }} />}
                hasMore={data?.isHasMore}
                pullRefresh={false}
                onRefresh={onRefresh}
                onLoadMore={onLoadMore}>
                {props.children}
                {!loading && data?.list?.length == 0 && (
                    <Loading
                        showEmpty={true}
                        emptyText={emptyText}
                        emptyImgUrl={emptyImgUrl}
                        isLoading={false}
                        isEmpty={true}
                    />
                )}
            </InfiniteLoading>
        );
    }),
);
