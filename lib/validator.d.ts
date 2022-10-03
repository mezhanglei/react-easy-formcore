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
export declare type FormValidator = (value: any, callBack?: FormValidatorCallBack) => any | Promise<any>;
export default class Validator {
    rulesMap: {
        [path: string]: FormRule[];
    };
    errorsMap: {
        [path: string]: string | undefined;
    };
    constructor();
    add(path: string, rules?: FormRule[]): void;
    getRulesMap(): {
        [path: string]: FormRule[];
    };
    getError(path?: string): string | undefined;
    setError(path: string, msg?: string): void;
    resetError(): void;
    start(path: string, value: any, removed?: boolean): Promise<any>;
}
