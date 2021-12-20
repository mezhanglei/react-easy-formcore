import React, { CSSProperties } from 'react';
import { FormRule } from './form-store';
import { FormOptions } from './form-options-context';
export interface FormListProps extends FormOptions {
    label?: string;
    suffix?: React.ReactNode;
    name?: string;
    rules?: FormRule[];
    path?: string;
    initialValue?: any[];
    className?: string;
    style?: CSSProperties;
    children?: React.ReactNode;
}
export declare const classes_list: {
    list: string;
    inline: string;
    compact: string;
    required: string;
    error: string;
    header: string;
    container: string;
    control: string;
    message: string;
    footer: string;
};
export declare const FormList: React.ForwardRefExoticComponent<FormListProps & React.RefAttributes<unknown>>;
