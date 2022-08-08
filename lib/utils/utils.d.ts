import { formatName, pathToArr, deepGet, deepSet } from "./object";
export { formatName, pathToArr, deepGet, deepSet };
export declare function isExitPrefix(prefix: string, path: string | string[]): boolean;
export declare function getValuePropName(valueProp: string | ((type: any) => string), type: any): string;
export declare function getValueFromEvent(...args: any[]): any;
export declare const isListItem: (item: string) => boolean;
export declare const getCurrentPath: (name?: string, parent?: string) => string | undefined;
