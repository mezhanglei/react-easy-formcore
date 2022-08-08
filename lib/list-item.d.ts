import React, { CSSProperties } from 'react';
import './list-item.less';
import { FormOptions } from './form-options-context';
export interface ListItemProps extends FormOptions {
    label?: any;
    name?: string;
    path?: string;
    suffix?: React.ReactNode | any;
    footer?: React.ReactNode | any;
    className?: string;
    children?: React.ReactNode;
    style?: CSSProperties;
    index?: number;
}
export declare const ListItem: React.ForwardRefExoticComponent<ListItemProps & React.RefAttributes<unknown>>;
