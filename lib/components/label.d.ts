import React, { CSSProperties } from 'react';
import "./label.less";
export interface LabelBaseProps {
    colon?: boolean;
    required?: boolean;
    showLabel?: boolean;
    labelWidth?: CSSProperties['width'];
    labelAlign?: CSSProperties['textAlign'];
    labelStyle?: CSSProperties;
    gutter?: number;
    tooltip?: string;
}
export interface LabelProps extends LabelBaseProps {
    children: any;
    style?: CSSProperties;
    className?: string;
}
export declare const Label: React.ForwardRefExoticComponent<LabelProps & React.RefAttributes<any>>;
