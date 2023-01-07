import { FormStore } from './form-store';
import Validator from './validator';
export declare function useFormStore<T extends Object = any>(values?: Partial<T>): FormStore<T>;
export declare function useValidator(): Validator;
export declare function useFormError(store: FormStore, path?: string): any[];
export declare function useFormValues<T = unknown>(store: FormStore, path?: string | string[]): T;
