import React, { CSSProperties } from 'react';
import './list-item.less';
export interface ListItemProps {
    label?: any;
    suffix?: React.ReactNode;
    inline?: boolean;
    required?: boolean;
    labelWidth?: number;
    labelAlign?: 'left' | 'right';
    gutter?: number;
    className?: string;
    children?: React.ReactNode;
    style?: CSSProperties;
}
export declare const classes_item: {
    field: string;
    inline: string;
    required: string;
    header: string;
    container: string;
    footer: string;
};
export declare const ListItem: React.ForwardRefExoticComponent<ListItemProps & React.RefAttributes<unknown>>;