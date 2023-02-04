import { FormRule } from './validator';
export declare type TriggerType = string;
export interface FieldChangedParams {
    parent: string;
    name?: string;
    value: any;
}
export interface ItemCoreProps {
    name?: string | number;
    parent?: string;
    ignore?: boolean;
    index?: number;
    trigger?: TriggerType | TriggerType[];
    validateTrigger?: TriggerType | TriggerType[];
    valueProp?: string | ((type: any) => string);
    valueGetter?: ((...args: any[]) => any);
    valueSetter?: ((value: any) => any);
    rules?: FormRule[];
    initialValue?: any;
    errorClassName?: string;
    onFieldsChange?: (obj: FieldChangedParams, values?: unknown) => void;
    onValuesChange?: (obj: FieldChangedParams, values?: unknown) => void;
    children?: any;
}
export declare const ItemCore: {
    (props: ItemCoreProps): any;
    displayName: string;
};
