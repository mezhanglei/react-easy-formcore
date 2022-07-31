import { FormStore } from './form-store';
import Validator from './validator';
export declare function useFormStore<T extends Object = any>(values?: Partial<T>): FormStore<T>;
export declare function useValidator(): Validator;
