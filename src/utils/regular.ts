/**
 * @description: 正则表达式
 * @author: yoke
 * @date:2022/6/30 17:22
 */

/**
 * 11位数的手机号码
 */
export const phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
// /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;

//电子邮箱正则
export function regEmail() {
	return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
}

//邮政编码
export function regZipCode() {
	return /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/;
}

//手机号码
export function regPhone() {
	return /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[\d])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/;
}

//座机电话
export function regTelePhone() {
	return /^\d{3}-\d{8}$|^\d{4}-\d{7,8}$/;
}

//传真号码
export function regFaxes() {
	return /^(?:\d{3,4}-)?\d{7,8}(?:-\d{1,6})?$/;
}

//效验整数小数点位数
export function regInteger({ inteager = 9, pa = 6 }) {
	return new RegExp(`^\\d{0,${inteager}}([.]\\d{0,${pa}})?$`, "g");
}

//设置密码
export function regPassword() {
	return /^.*(?=.{12,32})(?=.*\d)(?=.*[A-Z|a-z])(?=.*[!@#$%^&*? ]).*$/;
}

/**
 * 判断密码是否正确
 * @param {*} rule
 * @param {*} values
 */
export function regPasswordS(rule, values) {
	let count = 0;
	if (/\d/.test(values)) count++;
	if (/[a-z|A-Z]/.test(values)) count++;
	if (/[!@#%\-\_\=\+\[\]\{\}\:\,\.\?]/.test(values)) count++;

	if (values?.length) {
		if (count < 3) {
			return Promise.reject(new Error("长度为12-32个字符数字、大小写字母及特殊字符(!@#%-_=+[{}]:,./?)至少包含3种"));
		} else {
			if (values?.length < 12 || values?.length > 23) {
				return Promise.reject(new Error("长度为12-32个字符"));
			} else {
				return Promise.resolve();
			}
		}
	} else {
		return Promise.resolve();
	}
}

// 纯数字
export const REG_EXP_BY_NUMBER = /^\d{1,}$/;

// 正整数 1-365
export const REG_EXP_BY_POSITIVE_INTEGER = /^(?:36[0-5]|3[0-5]\d|[12]\d{2}|[1-9]\d?)$/;

// 正整数 1-24
export const REG_EXP_BY_DAY_INTEGER = /^(1?[0-9]|2[0-4])$/;

// 校验密码的正则
export const REG_EXP_BY_PASS = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S*.{8,}$/;

// 校验邮箱
export const REG_EXP_BY_EMAIL =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// 效验车牌号
export const REG_EXP_BY_PLATE =
	/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领a-zA-Z]{1}[a-zA-Z]{1}[a-zA-Z0-9]{4}[a-zA-Z0-9挂学警港澳]{1}$/;

// 纯数字小数
export const REG_EXP_BY_INTEGER = /^\d{0,}([.]\d{0,})?$/;

// 固定电话
export const REG_EXP_BY_TELE_PHONE = /^\d{3}-\d{8}$|^\d{4}-\d{7,8}$/;

// 网址
export const REG_EXP_BY_URL = /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;

// 传真
export const REG_EXP_BY_FAXES = /^(?:\d{3,4}-)?\d{7,8}(?:-\d{1,6})?$/;

// 统一社会信用代码
export const REG_EXP_BY_UNIFORM_CREDIT_CODE = /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/;

// 用户名
export const REG_EXP_BY_USER_NAME = /^[a-zA-Z]([_a-zA-Z0-9]{5,18})$/;

//数字英文
export const REG_EXP_NUMBER_LETTER = /^[A-Za-z0-9]+$/;
