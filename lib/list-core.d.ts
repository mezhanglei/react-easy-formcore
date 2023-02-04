import { FormRule } from './validator';
export interface ListCoreProps {
    name?: string | number;
    parent?: string;
    rules?: FormRule[];
    initialValue?: any[];
    ignore?: boolean;
    children?: any;
}
export declare const ListCore: {
    (props: ListCoreProps): any;
    displayName: string;
};
