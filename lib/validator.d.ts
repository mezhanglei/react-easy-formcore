export declare type FormRule = {
    required?: boolean;
    pattern?: string;
    whitespace?: boolean;
    max?: number;
    min?: number;
    message?: string;
    validator?: FormValidator;
};
export declare type FormValidatorCallBack = (message?: string) => void;
export declare type FormValidator = (value: any, callBack?: FormValidatorCallBack) => boolean | undefined | Promise<boolean>;
export default class Validator {
    rulesMap: {
        [key: string]: FormRule[];
    };
    constructor();
    add(path: string, rules?: FormRule[]): void;
    start(path: string, value: any): Promise<any>;
}
