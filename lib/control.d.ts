import React, { CSSProperties } from 'react';
import './control.less';
export interface ControlProps {
    children: any;
    style?: CSSProperties;
    className?: string;
    compact?: boolean;
    error?: string;
    suffix?: React.ReactNode | any;
    footer?: React.ReactNode | any;
}
export declare const Control: React.ForwardRefExoticComponent<ControlProps & React.RefAttributes<unknown>>;
