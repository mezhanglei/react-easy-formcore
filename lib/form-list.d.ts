import React, { CSSProperties } from 'react';
import { ItemProps } from './components/item';
import { ListCoreProps } from './list-core';
export declare type FormListProps<T = ItemProps> = T & ListCoreProps & {
    className?: string;
    children?: React.ReactNode;
    style?: CSSProperties;
    component?: any;
    ignore?: boolean;
};
export declare const FormList: React.ForwardRefExoticComponent<ItemProps & ListCoreProps & {
    className?: string | undefined;
    children?: React.ReactNode;
    style?: React.CSSProperties | undefined;
    component?: any;
    ignore?: boolean | undefined;
} & React.RefAttributes<any>>;
