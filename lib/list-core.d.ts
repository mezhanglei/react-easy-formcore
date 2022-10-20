import { FormRule } from './validator';
export interface ListCoreProps {
    name?: string;
    parent?: string;
    rules?: FormRule[];
    initialValue?: any[];
    children?: any;
}
export declare const ListCore: {
    (props: ListCoreProps): any;
    displayName: string;
};
