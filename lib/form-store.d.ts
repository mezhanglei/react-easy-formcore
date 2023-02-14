import { FormRule } from './validator';
import { TriggerType } from './item-core';
export declare type FormListener = {
    path: string;
    onChange: (newValue?: any, oldValue?: any) => void;
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
    private initialValues?;
    private formItemListeners;
    private formGlobalListeners;
    private errorListeners;
    private values?;
    private lastValues?;
    private formErrors;
    private fieldProps;
    private validator;
    constructor(values?: Partial<T>);
    getFieldProps(path?: string): FieldProps | FormFieldsProps<any>;
    setFieldProps(path: string, field?: FieldProps): void;
    getFieldValue(path?: string | string[]): any;
    getLastValue(path?: string | string[]): any;
    setInitialValues(path: string, initialValue: any): void;
    getInitialValues(path?: string | string[]): any;
    setFieldValue(path: string | Partial<T>, value?: any, eventName?: TriggerType | boolean): void;
    setFieldsValue(values?: Partial<T>): void;
    reset(endValues?: Partial<T>): void;
    getFieldError(path?: string): any;
    private setFieldError;
    private setFieldsError;
    validate(): Promise<ValidateResult<T>>;
    validate(path: string, eventName?: TriggerType | boolean): Promise<string>;
    private notifyFormItem;
    private notifyFormGlobal;
    private notifyError;
    subscribeFormItem(path: string, listener: FormListener['onChange']): () => void;
    subscribeFormGlobal(path: string, listener: FormListener['onChange']): () => void;
    unsubscribeFormGlobal(path?: string): void;
    subscribeError(path: string, listener: FormListener['onChange']): () => void;
}
