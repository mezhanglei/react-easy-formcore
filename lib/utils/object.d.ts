export declare function deepClone<T = any>(value: T): T;
export declare function isEqual(a: any, b: any): boolean;
export declare function pathToArr(path?: string | string[]): string[];
export declare function deepGet(obj: object | undefined, keys?: string | string[]): any;
export declare function deepSet(obj: any, path: string | string[], value: any): any;
