import React, { CSSProperties } from 'react';
import './label.less';
export interface LabelBaseProps {
    colon?: boolean;
    required?: boolean;
    labelWidth?: number;
    labelAlign?: CSSProperties['textAlign'];
    gutter?: number;
}
export interface LabelProps extends LabelBaseProps {
    children: any;
    style?: CSSProperties;
    className?: string;
}
export declare const Label: React.ForwardRefExoticComponent<LabelProps & React.RefAttributes<unknown>>;
