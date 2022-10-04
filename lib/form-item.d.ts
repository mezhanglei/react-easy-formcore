import React, { CSSProperties } from 'react';
import { ItemProps } from './components/item';
import { ItemCoreProps } from './item-core';
export declare type FormItemProps<T = ItemProps> = T & ItemCoreProps & {
    className?: string;
    children?: React.ReactNode;
    style?: CSSProperties;
    component?: any;
    isContainer?: boolean;
};
export declare const FormItem: React.ForwardRefExoticComponent<ItemProps & ItemCoreProps & {
    className?: string | undefined;
    children?: React.ReactNode;
    style?: React.CSSProperties | undefined;
    component?: any;
    isContainer?: boolean | undefined;
} & React.RefAttributes<unknown>>;
