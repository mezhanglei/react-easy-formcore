import React, { CSSProperties } from 'react';
import './list-item.less';
import { FormOptions } from './form-options-context';
export interface ListItemProps extends FormOptions {
    label?: any;
    suffix?: React.ReactNode | any;
    footer?: React.ReactNode | any;
    className?: string;
    children?: React.ReactNode;
    style?: CSSProperties;
    customInner?: any;
    index?: number;
}
export declare const classes_item: {
    field: string;
    inner: string;
    inline: string;
    compact: string;
    required: string;
    header: string;
    container: string;
    control: string;
    suffix: string;
    footer: string;
};
export declare const ListItem: React.ForwardRefExoticComponent<ListItemProps & React.RefAttributes<unknown>>;
