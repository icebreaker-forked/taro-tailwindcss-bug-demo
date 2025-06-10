/**
 * 头部拦截器 处理请求头的配置
 */
import { TOKEN_KEY } from "@/api/constant";
import useStore from "@/store";

export default function (chain) {
	const token = useStore.getState()?.common?.token;
	const requestParams = chain.requestParams;

	const { header } = requestParams;

	//判断sessionkey是否过期

	requestParams.header = { ...header, [TOKEN_KEY]: token };

	return chain.proceed(requestParams);
}
