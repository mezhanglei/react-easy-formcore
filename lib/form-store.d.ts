export declare type FormListener = {
    path: string;
    onChange: (newValue?: any, oldValue?: any) => void;
};
export declare type FormValidatorCallBack = (message?: string) => void;
export declare type FormValidator = (value: any, callBack?: FormValidatorCallBack) => boolean | undefined | Promise<boolean>;
export declare type FormRule = {
    required?: boolean;
    message?: string;
    validator?: FormValidator;
};
export declare type FormErrors<T = any> = {
    [key in keyof T]?: T[key];
};
export declare type ValidateResult<T> = {
    error?: string;
    values: T;
};
export declare type FieldProps = {
    rules?: FormRule[];
    [other: string]: any;
};
export declare type FormFieldsProps<T = any> = {
    [key in keyof T]: FieldProps;
};
export declare class FormStore<T extends Object = any> {
    private initialValues;
    private formItemListeners;
    private formGlobalListeners;
    private errorListeners;
    private values;
    private lastValues?;
    private formErrors;
    private initialFieldProps;
    constructor(values?: Partial<T>);
    getInitialFieldProps(path?: string): FieldProps | FormFieldsProps<any>;
    setInitialFieldProps(path: string, field?: FieldProps): void;
    getFieldValue(path?: string | string[]): any;
    getLastValue(path?: string | string[]): any;
    setInitialValues(path: string, initialValue: any): void;
    getInitialValues(path?: string | string[]): any;
    setFieldValue(path: string | Partial<T>, value?: any): Promise<void>;
    setFieldsValue(values: Partial<T>): Promise<void>;
    reset(endValues?: Partial<T>): void;
    getFieldError(path?: string): any;
    private setFieldError;
    private setFieldsError;
    validate(): Promise<ValidateResult<T>>;
    validate(path: string): Promise<string>;
    private notifyFormItem;
    private notifyFormGlobal;
    private notifyError;
    subscribeFormItem(path: string, listener: FormListener['onChange']): () => void;
    subscribeFormGlobal(path: string, listener: FormListener['onChange']): () => void;
    unsubscribeFormGlobal(path?: string): void;
    subscribeError(path: string, listener: FormListener['onChange']): () => void;
}
