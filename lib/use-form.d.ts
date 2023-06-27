/// <reference types="react" />
import { FormStore } from './form-store';
import Validator from './validator';
export declare function useFormStore<T extends Object = any>(values?: Partial<T>): FormStore<T>;
export declare function useValidator(): Validator;
export declare function useFormError(form: FormStore, path?: string, immediate?: boolean): (import("react").Dispatch<import("react").SetStateAction<undefined>> | undefined)[];
export declare function useFormValues<T = unknown>(form: FormStore, path?: string | string[], immediate?: boolean): T | undefined;
