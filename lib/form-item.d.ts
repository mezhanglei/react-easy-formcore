import React, { CSSProperties } from 'react';
import { FormOptions } from './form-options-context';
import { FormRule } from './form-store';
export interface FormItemProps extends FormOptions {
    label?: string;
    name?: string;
    suffix?: React.ReactNode | any;
    footer?: React.ReactNode | any;
    valueProp?: string | ((type: any) => string);
    valueGetter?: (...args: any[]) => any;
    rules?: FormRule[];
    path?: string;
    initialValue?: any;
    className?: string;
    children?: React.ReactNode;
    style?: CSSProperties;
    errorClassName?: string;
}
export declare const classes: {
    field: string;
    compact: string;
    required: string;
    error: string;
    header: string;
    container: string;
    control: string;
    message: string;
    suffix: string;
    footer: string;
};
export declare const FormItem: React.ForwardRefExoticComponent<FormItemProps & React.RefAttributes<unknown>>;
