import React, { CSSProperties } from 'react';
import { ControlBaseProps } from './control';
import { LabelBaseProps } from './label';
import './item.less';
export declare type Layout = 'horizontal' | 'vertical' | string;
export interface ItemProps extends LabelBaseProps, ControlBaseProps {
    label?: string | React.ReactNode;
    inline?: boolean;
    layout?: Layout;
    compact?: boolean;
    readOnly?: boolean;
    className?: string;
    children?: React.ReactNode;
    style?: CSSProperties;
}
export declare const Item: React.ForwardRefExoticComponent<ItemProps & React.RefAttributes<any>>;
