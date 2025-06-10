/**
 * 骑行
 */
import api from "../request";

//获取植树节证书
export const getCertificates = (year: any) =>
	api.get({
		url: "/common/getCertificates",
		data: {
			year
		}
	});

//获取公益森林详情
export const getForestDetail = (params: any) =>
	api.get({
		url: "/common/getForest"
	});
