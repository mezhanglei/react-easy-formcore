declare function required(ruleValue: any, value: any): true | undefined;
declare function pattern(ruleValue: RegExp | string, value: any): boolean | undefined;
declare function whitespace(ruleValue: boolean, value: any): boolean | undefined;
declare function max(ruleValue: number, value: any): boolean | undefined;
declare function min(ruleValue: number, value: any): boolean | undefined;
export declare const validatorsMap: {
    required: typeof required;
    pattern: typeof pattern;
    whitespace: typeof whitespace;
    max: typeof max;
    min: typeof min;
};
export {};
