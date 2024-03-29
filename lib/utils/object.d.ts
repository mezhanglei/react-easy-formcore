export declare function deepClone<T = any>(value: T): T;
export declare function isEqual(a: any, b: any): boolean;
export declare function pathToArr(path?: string | string[]): string[];
export declare const pickObject: <T = any>(obj: T | undefined, keys: string[] | ((key?: string, value?: any) => boolean)) => T | undefined;
export declare function deepGet(obj: object | undefined, keys?: string | string[]): any;
export declare function deepSet<T = any>(obj: T, path: string | string[], value: any): any;
