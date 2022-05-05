import React, { CSSProperties } from 'react';
import './list-item.less';
import { LabelAlignEnum } from './form-options-context';
import { ColProps } from './form-options-context';
export interface ListItemProps {
    label?: any;
    labelAlign?: LabelAlignEnum;
    col?: ColProps;
    labelStyle?: CSSProperties;
    suffix?: React.ReactNode;
    required?: boolean;
    gutter?: number;
    className?: string;
    children?: React.ReactNode;
    style?: CSSProperties;
}
export declare const classes_item: {
    field: string;
    required: string;
    header: string;
    container: string;
    footer: string;
};
export declare const ListItem: React.ForwardRefExoticComponent<ListItemProps & React.RefAttributes<unknown>>;
