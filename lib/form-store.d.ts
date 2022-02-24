export declare type FormListener = {
    name: string;
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
    private valueListeners;
    private storeValueListeners;
    private errorListeners;
    private propsListeners;
    private values;
    private lastValues?;
    private formErrors;
    private fieldsProps;
    constructor(values?: Partial<T>, fieldsProps?: FormFieldsProps<T>);
    getFieldProps(name?: string): FieldProps | FormFieldsProps<any>;
    setFieldProps(name: string, field?: FieldProps): void;
    getFieldValue(name?: string | string[]): any;
    getLastValue(name?: string | string[]): any;
    setFieldValue(name: string | {
        [key: string]: any;
    }, value?: any, isMount?: boolean): Promise<void>;
    setFieldsValue(values: Partial<T>): Promise<void>;
    reset(): void;
    getFieldError(name?: string): any;
    private setFieldError;
    private setFieldsError;
    validate(): Promise<ValidateResult<T>>;
    validate(name: string, isMount?: boolean): Promise<string>;
    private notifyValue;
    private notifyStoreValue;
    private notifyError;
    private notifyProps;
    subscribeValue(name: string, listener: FormListener['onChange']): () => void;
    listenStoreValue(name: string, listener: FormListener['onChange']): () => void;
    removeListenStoreValue(name?: string): void;
    subscribeError(name: string, listener: FormListener['onChange']): () => void;
    subscribeProps(name: string, listener: FormListener['onChange']): () => void;
}
