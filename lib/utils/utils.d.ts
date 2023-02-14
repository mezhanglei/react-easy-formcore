import { TriggerType } from "../item-core";
import { pathToArr, deepGet, deepSet } from "./object";
export { pathToArr, deepGet, deepSet };
/**
 * 已废弃，不允许再使用
 * 格式化name, 返回正确类型的键(对象的键或者索引序号)
 * @deprecated A legacy feature for browser compatibility
 * @param str
 * @param isList
 * @returns
 */
export declare function formatName(str?: string | number, isList?: boolean): string | number | undefined;
/** 旧方法, 请用joinFormPath代替
 * @deprecated A legacy feature for browser compatibility
 * @param args
 * @returns
 */
export declare function joinPath(...args: Array<any>): any;
export declare function isExitPrefix(prefix: string, path: string | string[]): boolean;
export declare function getValuePropName(valueProp: string | ((type: any) => string), type: any): string;
export declare function getValueFromEvent(...args: any[]): any;
export declare const isWithBracket: (part?: any) => boolean;
export declare const isValidNumber: (item?: any) => true | undefined;
export declare function joinFormPath(...args: Array<any>): any;
export declare const isFormNode: (child: any) => boolean;
export declare const validateTriggerCondition: (eventName?: TriggerType, validateTrigger?: TriggerType | TriggerType[]) => boolean | undefined;
export declare function toArray<T>(list: T | T[]): T[];
