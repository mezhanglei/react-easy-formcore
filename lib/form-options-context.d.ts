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
export declare enum LabelAlignEnum {
    Horizontal = "horizontal",
    Vertical = "vertical",
    Inline = "inline"
}
export interface ColProps {
    span?: number;
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
}
export interface FormOptions extends FormFunc {
    col?: ColProps;
    colon?: boolean;
    labelAlign?: LabelAlignEnum;
    labelStyle?: CSSProperties;
    initialValues?: Partial<unknown>;
    compact?: boolean;
    required?: boolean;
    gutter?: number;
}
export declare const FormOptionsContext: React.Context<FormOptions>;
