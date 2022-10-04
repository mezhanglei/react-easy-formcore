import React, { CSSProperties } from 'react';
import { ControlBaseProps } from './control';
import { LabelBaseProps } from './label';
import './item.less';
export declare type Layout = 'horizontal' | 'vertical' | string;
export interface ItemProps extends LabelBaseProps, ControlBaseProps {
    label?: string;
    inline?: boolean;
    layout?: Layout;
    className?: string;
    children?: React.ReactNode;
    style?: CSSProperties;
}
export declare const Item: React.ForwardRefExoticComponent<ItemProps & React.RefAttributes<unknown>>;
