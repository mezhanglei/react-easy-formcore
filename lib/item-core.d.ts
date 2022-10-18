/// <reference types="react" />
import { FormRule } from './validator';
export interface ItemCoreProps {
    name?: string;
    parent?: string;
    index?: number;
    valueProp?: string | ((type: any) => string);
    valueGetter?: ((...args: any[]) => any);
    valueSetter?: ((value: any) => any);
    rules?: FormRule[];
    initialValue?: any;
    errorClassName?: string;
    onFieldsChange?: (obj: {
        parent: string;
        name?: string;
        value: any;
    }, values?: unknown) => void;
    onValuesChange?: (obj: {
        parent?: string;
        name?: string;
        value: any;
    }, values?: unknown) => void;
    children?: any;
}
export declare const ItemCore: {
    (props: ItemCoreProps): JSX.Element;
    displayName: string;
};
