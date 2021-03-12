export const personNameReg: RegExp = /^[\u4e00-\u9fa5]+\·[\u4e00-\u9fa5]+$|^[\u4e00-\u9fa5]{0,}$/; // 中文，允许有特殊符号·
export const phoneReg = /^1\d{10}$/; // 手机号码
export const creditCodeReg = /^[a-zA-Z0-9]{1,18}$/; // 统一社会信用码
export const idCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X)$)/; // 身份证号码
export const numberTypeReg = /^\d*$/; //数字类型
export const numberOrFloatReg = /^\d+(\.\d{1,2})?$/;
export const capitalConReg = /^0(\.0{1,2}){0,1}$|^\d\.([1-9]{1,2}|[0-9][1-9])$|^[1-9]\d{0,11}(\.\d{1,2}){0,1}$/; // 出资人管理  出资额
export const capitalProportionReg = /^0(\.0{1,2}){0,1}$|^\d\.([1-9]{1,2}|[0-9][1-9])$|^[1-9]\d{0,1}(\.\d{1,2}){0,1}$|^100(\.0{1,2}){0,1}$/; // 出资人管理  出资占比
export const spaceReg = /\s/g; // 空格
export const passwordReg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$/; // 8-16位且包含数字、大写字母、小写字母
export const userNameReg = /^[\u4e00-\u9fa5|a-zA-Z0-9]+$/; //中文、字母、数字
export const spaceAroundReg = /^\s*|\s*$/g; // 左右空格
export const notNegativeReg = /^0$|^[1-9]\d*$/; //大于等于0的整数
export const chineseReg = /^[\u4e00-\u9fa5]{0,}$/; //中文，不允许有特殊符号
