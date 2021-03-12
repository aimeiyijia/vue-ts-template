import { Message } from "element-ui";
import {
  personNameReg,
  phoneReg,
  creditCodeReg,
  idCardReg,
  numberTypeReg,
  numberOrFloatReg,
  capitalConReg,
  capitalProportionReg,
  spaceReg,
  passwordReg,
  userNameReg,
  notNegativeReg,
  chineseReg
} from "./regular";
// 验证机构名称
export function validateInsName(rule: [], value: string, callback: any) {
  if (!value) {
    callback(new Error("请输入机构名称"));
  } else if (value.length > 50) {
    callback(new Error("请输入50个及以内的字符"));
  } else {
    callback();
  }
}
// 验证人员姓名
export function validatePersonName(rule: [], value: string, callback: any) {
  if (!personNameReg.test(value)) {
    callback(new Error("请输入汉字，允许有特殊符号·(例：艾买提·麦提)"));
  } else if (value.length > 16) {
    callback(new Error("请输入16个及以内的汉字"));
  } else {
    callback();
  }
}
// 验证手机号码
export function validatePhone(rule: [], value: string, callback: any) {
  if (!phoneReg.test(value)) {
    callback(new Error("手机号码格式不正确"));
  } else {
    callback();
  }
}
// 验证统一社会信用码
export function validateZzjgcode(rule: [], value: string, callback: any) {
  if (value == "") {
    callback(new Error("请输入统一社会信用代码"));
  } else if (!creditCodeReg.test(value)) {
    callback(new Error("请输入18位及以下的数字或字母"));
  } else {
    callback();
  }
}
// 验证身份证号码
export function validateIdCard(rule: [], value: string, callback: any) {
  if (!idCardReg.test(value)) {
    callback(new Error("15或18位数字和大写字母X"));
  } else {
    callback();
  }
}
// 银行账户账号
export function validateBankName(rule: [], value: string, callback: any) {
  if (value.length > 50) {
    callback(new Error("请输入50个及以内的字符"));
  } else {
    callback();
  }
}
// 银行账户账号
export function validateAccount(rule: [], value: string, callback: any) {
  if (!numberTypeReg.test(value)) {
    callback(new Error("请输入数字"));
  } else if (value.length > 30) {
    callback(new Error("请输入30个及以内的数字"));
  } else {
    callback();
  }
}
// 邮政编码
export function validatePostCode(rule: [], value: string, callback: any) {
  if (!numberTypeReg.test(value)) {
    callback(new Error("只能输入数字"));
  } else if (value.length > 0 && value.length !== 6) {
    callback(new Error("请输入6位数字"));
  } else {
    callback();
  }
}
// 校验金额，带有文字提示
export function validateMoneyWithMessage(
  rule: [],
  value: string,
  callback: any
) {
  //12位整数，2位小数
  if (value !== "" && !numberOrFloatReg.test(value)) {
    callback(new Error(" "));
    Message({
      message: "金额输入有误，示例10.99",
      type: "warning"
    });
  } else if (parseInt(value) > 999999999999) {
    callback(new Error(" "));
    Message({
      message: "金额不能超过仟亿",
      type: "warning"
    });
  } else {
    callback();
  }
}
// 校验金额，没有文字提示
export function validateMoney(rule: [], value: string, callback: any) {
  //12位整数，2位小数
  if (value !== "" && !numberOrFloatReg.test(value)) {
    callback(new Error("金额输入有误，示例10.99"));
  } else if (parseInt(value) > 999999999999) {
    callback(new Error("金额不能超过仟亿"));
  } else {
    callback();
  }
}
// 银行账户户名
export function validateBankAccountName(
  rule: [],
  value: string,
  callback: any
) {
  if (value && value.length > 50) {
    callback(new Error("户名长度不能超过50位"));
  } else {
    callback();
  }
}
// 出资额校验
export function validateCapitalCon(rule: [], value: string, callback: any) {
  if (value && !capitalConReg.test(value)) {
    callback(
      new Error("出资额最多为11位数,保留两位小数且不能包含空格等特殊字符")
    );
  } else {
    callback();
  }
}
// 出资占比
export function validateCapitalProportion(
  rule: [],
  value: string,
  callback: any
) {
  if (value && !capitalProportionReg.test(value)) {
    callback(
      new Error("出资占比最多为2位数,保留2位小数且不能包含空格等特殊字符")
    );
  } else {
    callback();
  }
}
// 密码验证
export function validatePassword(rule: [], value: string, callback: any) {
  if (!value) callback(new Error("请输入密码"));
  else if (spaceReg.test(value)) callback(new Error("密码不能填写空格"));
  else if (!value.match(passwordReg)) {
    callback(new Error("密码必须为8~16位，且包含数字、大写字母、小写字母"));
  } else {
    callback();
  }
}
// 验证用户名
export function validateUserName(rule: [], value: string, callback: any) {
  if (!value || value.trim() == "") {
    callback(new Error("请输入用户名"));
  } else if (!userNameReg.test(value)) {
    callback(new Error("请输入中文、字母或者数字"));
  } else if (value.length < 2 || value.length > 20) {
    callback(new Error("请输入2~20位中文、字母或者数字"));
  } else {
    callback();
  }
}
// 验证案件名称
export function validateAjmcName(rule: [], value: string, callback: any) {
  if (value.length > 100) {
    callback(new Error("请输入100个及以内的字符"));
  } else {
    callback();
  }
}
// 验证人数
export function validatePeopleNumber(rule: [], value: string, callback: any) {
  if (String(value).indexOf(".") !== -1) {
    callback(new Error("大于等于0的整数"));
  } else if (value.length > 9) {
    callback(new Error("输入数字过大"));
  } else {
    callback();
  }
}
// 验证标题
export function validateTitle(rule: [], value: string, callback: any) {
  if (!value || value.trim() == "") callback(new Error("请输入标题"));
  else callback();
}
// 验证工作内容
export function validateTasks(rule: [], value: string, callback: any) {
  if (!value || value.trim() == "") callback(new Error("请输入工作内容"));
  else callback();
}
// 验证办理周期
export function validateProcessingCycle(
  rule: [],
  value: string,
  callback: any
) {
  if (!value[0] || value[0].trim() == "") callback(new Error("请选择办理周期"));
  else callback();
}
// 验证正整数
export function validateNumber(rule: [], value: string, callback: any) {
  if (value && !notNegativeReg.test(value)) {
    callback(new Error("请输入大于等于0的整数"));
  } else {
    callback();
  }
}
// 长度50效验
export function validateLength50(rule: [], value: string, callback: any) {
  if (value && value.length > 50) {
    callback(new Error("请输入50个及以内的字符"));
  } else {
    callback();
  }
}
export function validTimeTaskStatus(rule: [], value: string, callback: any) {
  if (!value || !value.trim()) {
    callback(new Error("请选择定时发送时间"));
  } else {
    callback();
  }
}
export function validSendObject(rule: [], value: string, callback: any) {
  if (!value || !value.trim()) {
    callback(new Error("请至少添加一个发送对象"));
  } else {
    callback();
  }
}
export function validateClpp(rule: [], value: string, callback: any) {
  if (!value || !value.trim()) {
    callback(new Error("请选择车辆品牌"));
  } else {
    callback();
  }
}
export function validateCx(rule: [], value: string, callback: any) {
  if (!value || !value.trim()) {
    callback(new Error("请选择车系"));
  } else {
    callback();
  }
}
// 验证百分比
export function validatePercentage(rule: [], value: string, callback: any) {
  if (Number(value) > 100) {
    callback(new Error("请输入100及以内的数"));
  } else {
    callback();
  }
}
// 验证中文
export function validateChinese(rule: [], value: string, callback: any) {
  if (value && !chineseReg.test(value)) {
    callback(new Error("请输入汉字"));
  } else {
    callback();
  }
}
