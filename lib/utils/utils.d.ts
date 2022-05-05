import { FormOptions } from "../form-options-context";
export declare function isExitPrefix(prefix: string, path: string | string[]): boolean;
export declare function getValuePropName(valueProp: string | ((type: any) => string), type: any): string;
export declare function getValueFromEvent(...args: any[]): any;
export declare const isListItem: (item: string) => boolean;
export declare const getColProps: (option: FormOptions) => {
    xs: number | false;
    sm: number | false;
    md: number | false;
    lg: number | false;
};
