import { TriggerType } from "../item-core";
import { pathToArr, deepGet, deepSet } from "./object";
import { isEmpty, isNumberStr } from "./type";
export { pathToArr, deepGet, deepSet };

/**
 * 已废弃，不允许再使用
 * 格式化name, 返回正确类型的键(对象的键或者索引序号)
 * @deprecated A legacy feature for browser compatibility
 * @param str 
 * @param isList 
 * @returns 
 */
export function formatName(str?: string | number, isList?: boolean) {
  if (typeof str !== 'string' && typeof str !== 'number') return
  // 如果为数字就是数组索引，直接返回
  if (typeof str === 'number') return str;
  // 如果是带中括号的数字字符串则去掉中括号
  const end = str?.replace(/\[/g, '')?.replace(/\]/g, '')
  return isList ? +end : end;
}

/** 旧方法, 请用joinFormPath代替
 * @deprecated A legacy feature for browser compatibility
 * @param args 
 * @returns 
 */
export function joinPath(...args: Array<any>) {
  const result = args?.reduce((pre, cur) => {
    const curName = isEmpty(cur) ? '' : cur;
    const parent = isEmpty(pre) ? '' : pre;
    if (isValidNumber(curName) || isWithBracket(curName)) {
      const end = isValidNumber(curName) ? `[${curName}]` : curName
      return parent ? (end ? `${parent}${end}` : parent) : end;
    } else {
      return parent ? (curName ? `${parent}.${curName}` : parent) : `${curName}`;
    }
  });
  return result;
};

// 是否存在前缀
export function isExitPrefix(prefix: string, path: string | string[]) {
  const prefixParts = pathToArr(prefix);
  const parts = pathToArr(path);
  if (prefixParts?.length > parts?.length || !prefixParts?.length || !parts?.length) {
    return false;
  }
  return prefixParts?.every((item, index) => {
    return item == parts[index];
  });
}

// 表单值的键名
export function getValuePropName(valueProp: string | ((type: any) => string), type: any) {
  return typeof valueProp === 'function' ? valueProp(type) : valueProp
}

// 表单的值
export function getValueFromEvent(...args: any[]) {
  const e = args[0] as React.ChangeEvent<any>
  return e && e.target ? (e.target.type === 'checkbox' ? e.target.checked : e.target.value) : e
}

// 是否携带中括号
export const isWithBracket = (part?: any) => {
  return typeof part === 'string' && (/\[(\d+)\]/gi.test(part))
}

// 是否为数组索引项
export const isValidNumber = (item?: any) => isNumberStr(item);

// 由前到后拼接当前项的表单的path
export function joinFormPath(...args: Array<any>) {
  const result = args?.reduce((pre, cur) => {
    const curName = isEmpty(cur) ? '' : cur;
    const parent = isEmpty(pre) ? '' : pre;
    if (isValidNumber(curName) || isWithBracket(curName)) {
      const end = isValidNumber(curName) ? `[${curName}]` : curName
      return parent ? (end ? `${parent}${end}` : parent) : end;
    } else {
      return parent ? (curName ? `${parent}.${curName}` : parent) : `${curName}`;
    }
  });
  return result;
};

// 是否为表单节点
export const isFormNode = (child: any) => {
  const displayName = child?.type?.displayName;
  const formFields = ['Form.Item', 'Form.List', 'ListCore', 'ItemCore'];
  const dataType = child?.props?.['data-type']; // 标记的需要穿透的外层容器
  return formFields?.includes(displayName) && dataType !== 'ignore'
};

// 是否触发校验规则
export const validateTriggerCondition = (eventName?: TriggerType | boolean, validateTrigger?: TriggerType | TriggerType[],) => {
  // 不设置validateTrigger允许触发
  if (validateTrigger === undefined || eventName === undefined) return true;
  // 如果为布尔值则返回该值
  if(typeof eventName === 'boolean') return eventName;
  if (typeof validateTrigger === 'string') {
    return validateTrigger === eventName;
  }
  if (validateTrigger instanceof Array) {
    return validateTrigger?.includes(eventName)
  }
}

export function toArray<T>(list: T | T[]): T[] {
  if (!list) {
    return [];
  }
  return Array.isArray(list) ? list : [list];
}
