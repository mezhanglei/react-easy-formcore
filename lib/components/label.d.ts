import React, { CSSProperties } from 'react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import './label.less';
export interface LabelBaseProps {
    colon?: boolean;
    required?: boolean;
    labelWidth?: number;
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
export declare const Label: React.ForwardRefExoticComponent<LabelProps & React.RefAttributes<unknown>>;
