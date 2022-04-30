import React, { CSSProperties } from 'react';
export interface FormFunc {
    onFieldsChange?: (obj: {
        path: string;
        value: any;
    }) => void;
    onValuesChange?: (obj: {
        path?: string;
        value: any;
    }) => void;
}
export declare enum LayoutEnum {
    Horizontal = "horizontal",
    Vertical = "vertical",
    Inline = "inline"
}
export interface FormOptions extends FormFunc {
    layout?: LayoutEnum;
    labelStyle?: CSSProperties;
    initialValues?: Partial<unknown>;
    compact?: boolean;
    required?: boolean;
    gutter?: number;
}
export declare const FormOptionsContext: React.Context<FormOptions>;
