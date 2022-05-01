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
export interface FormOptions extends FormFunc {
    labelAlign?: LabelAlignEnum;
    labelStyle?: CSSProperties;
    initialValues?: Partial<unknown>;
    compact?: boolean;
    required?: boolean;
    gutter?: number;
}
export declare const FormOptionsContext: React.Context<FormOptions>;
