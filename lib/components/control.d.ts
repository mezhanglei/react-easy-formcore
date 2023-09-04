import React, { CSSProperties } from 'react';
import './control.less';
export interface ControlBaseProps {
    error?: string | React.ReactNode;
    suffix?: React.ReactNode | any;
    footer?: React.ReactNode | any;
}
export interface ControlProps extends ControlBaseProps {
    children: any;
    style?: CSSProperties;
    className?: string;
}
export declare const Control: React.ForwardRefExoticComponent<ControlProps & React.RefAttributes<any>>;
