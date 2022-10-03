import { FormRule } from './validator';
export interface ListCoreProps {
    name?: string;
    rules?: FormRule[];
    parent?: string;
    initialValue?: any[];
    children?: any;
}
export declare const ListCore: {
    (props: ListCoreProps): any;
    displayName: string;
};
