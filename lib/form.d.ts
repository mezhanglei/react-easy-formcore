import React, { CSSProperties } from 'react';
import { FormStore } from './form-store';
import { ItemCoreProps } from './item-core';
import { ItemProps } from './components/item';
export declare type FormProps<S = FormStore, T = ItemProps> = T & ItemCoreProps & {
    className?: string;
    store?: S;
    style?: CSSProperties;
    children?: any;
    initialValues?: Partial<unknown>;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    onReset?: (e: React.FormEvent<HTMLFormElement>) => void;
    onMount?: () => void;
};
export declare function Form(props: FormProps): JSX.Element;
export declare namespace Form {
    var Item: React.ForwardRefExoticComponent<ItemProps & ItemCoreProps & {
        className?: string | undefined;
        children?: React.ReactNode;
        style?: React.CSSProperties | undefined;
        component?: any;
        ignore?: boolean | undefined;
    } & React.RefAttributes<unknown>>;
    var List: React.ForwardRefExoticComponent<ItemProps & import("./list-core").ListCoreProps & {
        className?: string | undefined;
        children?: React.ReactNode;
        style?: React.CSSProperties | undefined;
        component?: any;
        ignore?: boolean | undefined;
    } & React.RefAttributes<unknown>>;
}
