export const TABS_COMMON_VALUES = {
    //综合
    all: "default",
    //销量
    sales: "salesNum",
    //价格
    price: "lowerPrice",
    //价格
    highPrice: "highPrice",
    //上新
    new: "new",
};

export const TABS_COMMON = [
    {
        title: "综合",
        value: TABS_COMMON_VALUES.all,
    },
    {
        title: "销量",
        value: TABS_COMMON_VALUES.sales,
    },
    {
        title: "价格",
        value: TABS_COMMON_VALUES.price,
    },
    {
        title: "上新",
        value: TABS_COMMON_VALUES.new,
    },
];

export const ORDERBY_VALUES = {
    //不排序
    none: 0,
    //正序
    asc: 1,
    //倒序
    desc: 2,
};

export const TAB_SORT_VALUES = {
    none: '',
    asc: 'ASC',
    desc: 'DESC'
}
