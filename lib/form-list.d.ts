import React, { CSSProperties } from 'react';
import { FormOptions } from './form-options-context';
import { FormRule } from './validator';
export interface FormListProps extends FormOptions {
    label?: string;
    name?: string;
    suffix?: React.ReactNode | any;
    footer?: React.ReactNode | any;
    rules?: FormRule[];
    path?: string;
    index?: number;
    initialValue?: any[];
    className?: string;
    style?: CSSProperties;
    children?: React.ReactNode;
    customInner?: any;
}
export declare const classes_list: {
    list: string;
    inner: string;
    inline: string;
    compact: string;
    required: string;
    error: string;
};
export declare const FormList: React.ForwardRefExoticComponent<FormListProps & React.RefAttributes<unknown>>;
