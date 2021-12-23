import { FormStore } from './form-store';
export interface FieldChangeProps<T> {
    store: FormStore<T> | undefined;
    name: string | undefined;
    onChange: (name: string) => void;
    onError: (name: string) => void;
}
export declare function useFieldChange<T>(props: FieldChangeProps<T>): void;
