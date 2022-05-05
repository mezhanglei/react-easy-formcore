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
    private valueListeners;
    private storeValueListeners;
    private errorListeners;
    private propsListeners;
    private values;
    private lastValues?;
    private formErrors;
    private fieldsProps;
    constructor(values?: Partial<T>);
    getFieldProps(path?: string): FieldProps | FormFieldsProps<any>;
    setFieldProps(path: string, field?: FieldProps): void;
    getFieldValue(path?: string | string[]): any;
    getLastValue(path?: string | string[]): any;
    setInitialValues(path: string, initialValue: any): void;
    setFieldValue(path: string | Partial<T>, value?: any, isMount?: boolean): Promise<void>;
    setFieldsValue(values: Partial<T>): Promise<void>;
    reset(): void;
    getFieldError(path?: string): any;
    private setFieldError;
    private setFieldsError;
    validate(): Promise<ValidateResult<T>>;
    validate(path: string, isMount?: boolean): Promise<string>;
    private notifyValue;
    private notifyStoreValue;
    private notifyError;
    private notifyProps;
    subscribeValue(path: string, listener: FormListener['onChange']): () => void;
    listenStoreValue(path: string, listener: FormListener['onChange']): () => void;
    removeListenStoreValue(path?: string): void;
    subscribeError(path: string, listener: FormListener['onChange']): () => void;
    subscribeProps(path: string, listener: FormListener['onChange']): () => void;
}
