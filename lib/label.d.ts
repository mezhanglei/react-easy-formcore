import React, { CSSProperties } from 'react';
import './label.less';
export interface LabelProps {
    children: any;
    style?: CSSProperties;
    className?: string;
    colon?: boolean;
    required?: boolean;
}
export declare const Label: React.ForwardRefExoticComponent<LabelProps & React.RefAttributes<unknown>>;
