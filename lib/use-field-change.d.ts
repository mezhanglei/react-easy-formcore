import { FieldProps, FormStore } from './form-store';
export interface FieldChangeProps<T> {
    store: FormStore<T> | undefined;
    name: string | undefined;
    onChange: (name: string) => void;
    onError: (name: string) => void;
    field?: FieldProps;
}
export declare function useFieldChange<T>(props: FieldChangeProps<T>): void;
