
import { isExitPrefix } from './utils/utils';
import { deepClone, deepGet, deepSet } from './utils/object';
import Validator, { FormRule } from './validator';

export type FormListener = { path: string, onChange: (newValue?: any, oldValue?: any) => void }

export type FormErrors<T = any> = { [key in keyof T]?: T[key] }

export type ValidateResult<T> = { error?: string, values: T }

export type FieldProps = { rules?: FormRule[], [other: string]: any };

export type FormFieldsProps<T = any> = { [key in keyof T]: FieldProps }

export class FormStore<T extends Object = any> {
  private initialValues?: Partial<T>

  private formItemListeners: FormListener[] = []

  private formGlobalListeners: FormListener[] = []

  private errorListeners: FormListener[] = []

  private values?: Partial<T>
  private lastValues?: Partial<T>

  private formErrors: FormErrors = {}

  private fieldProps: FormFieldsProps = {};
  private validator: Validator;

  public constructor(values?: Partial<T>) {
    this.initialValues = values
    this.fieldProps = {}
    this.formErrors = {}
    this.validator = new Validator();
    this.values = deepClone(values)
    this.getFieldValue = this.getFieldValue.bind(this)
    this.setFieldValue = this.setFieldValue.bind(this)
    this.setFieldsValue = this.setFieldsValue.bind(this)
    this.getFieldError = this.getFieldError.bind(this)
    this.setFieldError = this.setFieldError.bind(this)
    this.setFieldsError = this.setFieldsError.bind(this)

    this.getFieldProps = this.getFieldProps.bind(this)
    this.setFieldProps = this.setFieldProps.bind(this)

    this.reset = this.reset.bind(this)
    this.validate = this.validate.bind(this)
    this.subscribeFormItem = this.subscribeFormItem.bind(this)
    this.subscribeFormGlobal = this.subscribeFormGlobal.bind(this)
    this.unsubscribeFormGlobal = this.unsubscribeFormGlobal.bind(this)
    this.subscribeError = this.subscribeError.bind(this)
  }

  // 获取
  public getFieldProps(path?: string) {
    if (path) {
      return this.fieldProps?.[path]
    } else {
      return this.fieldProps
    }
  }

  // 设置表单域
  public setFieldProps(path: string, field?: FieldProps) {
    if (!path) return;
    if (field === undefined) {
      delete this.fieldProps[path]
    } else {
      const lastField = this.fieldProps[path];
      const newField = { ...lastField, ...field };
      this.fieldProps[path] = newField;
    }
    this.validator.add(path, field?.['rules']);
  }

  // 获取所有表单值，或者单个表单值,或者多个表单值
  public getFieldValue(path?: string | string[]) {
    return path === undefined ? this.values : deepGet(this.values, path)
  }

  // 获取旧表单值
  public getLastValue(path?: string | string[]) {
    return path === undefined ? this.lastValues : deepGet(this.lastValues, path)
  }

  // 设置初始值(只有初始化时才进行赋值)
  public setInitialValues(path: string, initialValue: any) {
    this.initialValues = deepSet(this.initialValues, path, initialValue);
    // 旧表单值存储
    this.lastValues = deepClone(this.values);
    // 设置值
    this.values = deepSet(this.values, path, initialValue);
    // 异步更新, 只有组件渲染成功了，才会去同步ui操作
    setTimeout(() => {
      const fieldProps = this.getFieldProps(path);
      if (fieldProps) {
        // 同步ui
        this.notifyFormItem(path);
        // 同时触发另一个值的监听
        this.notifyFormGlobal(path);
      }
    }, 0);
  }

  // 获取初始值
  public getInitialValues(path?: string | string[]) {
    return path === undefined ? this.initialValues : deepGet(this.initialValues, path)
  }

  // 更新表单值，单个表单值或多个表单值
  public async setFieldValue(path: string | Partial<T>, value?: any, noError?: boolean) {
    if (typeof path === 'string') {
      // 旧表单值存储
      this.lastValues = deepClone(this.values);
      // 设置值
      this.values = deepSet(this.values, path, value);
      // 同步ui
      this.notifyFormItem(path);
      // 同时触发另一个值的监听
      this.notifyFormGlobal(path);
      // 规则
      const fieldProps = this.getFieldProps();
      const rules = fieldProps?.[path]?.['rules'];
      if (rules?.length && !noError) {
        // 校验规则
        await this.validate(path);
      }
    } else if (typeof path === 'object') {
      await Promise.all(Object.keys(path).map((n) => this.setFieldValue(n, path?.[n])))
    }
  }

  // 设置表单值(覆盖更新)
  public async setFieldsValue(values?: Partial<T>) {
    this.lastValues = deepClone(this.values);
    this.values = values;
    this.notifyFormItem();
    this.notifyFormGlobal();
  }

  // 重置表单
  public reset(endValues?: Partial<T>) {
    const end = endValues || this.initialValues;
    this.setFieldsError({});
    this.setFieldsValue(end);
  }

  // 获取error信息
  public getFieldError(path?: string) {
    if (path) {
      return this.formErrors[path]
    } else {
      return this.formErrors
    }
  }

  // 更新error信息
  private setFieldError(path: string, value: any) {
    if (!path) return;
    if (value === undefined) {
      delete this.formErrors[path]
    } else {
      this.formErrors[path] = value
    }
    this.notifyError(path)
  }

  // 设置error信息(覆盖更新)
  private async setFieldsError(erros: FormErrors<T>) {
    this.formErrors = deepClone(erros);
    this.notifyError();
  }

  // 校验整个表单或校验表单中的某个控件
  public async validate(): Promise<ValidateResult<T>>
  public async validate(path: string): Promise<string>
  public async validate(path?: string) {
    const fieldProps = this.getFieldProps(path);
    if (path === undefined) {
      const result = await Promise.all(Object.keys(fieldProps)?.map((n) => {
        const rules = fieldProps?.[n]?.['rules'];
        if (rules) {
          return this.validate(n)
        }
      }))
      const currentError = result?.filter((message) => message !== undefined)?.[0]
      return {
        error: currentError,
        values: this.getFieldValue()
      }
    } else {
      // 清空错误信息
      this.setFieldError(path, undefined);
      const value = this.getFieldValue(path);
      const message = await this.validator.start(path, value);
      if (message) {
        this.setFieldError(path, message);
      }
      return message;
    }
  }

  // 同步当前表单域值的变化
  private notifyFormItem(path?: string) {
    if (path) {
      this.formItemListeners.forEach((listener) => {
        if (listener?.path === path) {
          listener?.onChange && listener?.onChange(this.getFieldValue(listener.path), this.getLastValue(listener.path))
        }
      })
    } else {
      this.formItemListeners.forEach((listener) => listener.onChange(this.getFieldValue(listener.path), this.getLastValue(listener.path)))
    }
  }

  // 同步整个表单值的变化
  private notifyFormGlobal(path?: string) {
    if (path) {
      this.formGlobalListeners.forEach((listener) => {
        if (isExitPrefix(listener?.path, path)) {
          listener?.onChange && listener?.onChange(this.getFieldValue(listener.path), this.getLastValue(listener.path))
        }
      })
    } else {
      this.formGlobalListeners.forEach((listener) => listener.onChange(this.getFieldValue(listener.path), this.getLastValue(listener.path)))
    }
  }

  // 同步错误的变化
  private notifyError(path?: string) {
    if (path) {
      this.errorListeners.forEach((listener) => {
        if (listener?.path === path) {
          listener?.onChange && listener?.onChange()
        }
      })
    } else {
      this.errorListeners.forEach((listener) => listener.onChange())
    }
  }

  // 订阅当前表单域值的变动(当表单域消失时会卸载)
  public subscribeFormItem(path: string, listener: FormListener['onChange']) {
    this.formItemListeners.push({
      onChange: listener,
      path: path
    });
    return () => {
      this.formItemListeners = this.formItemListeners.filter((sub) => sub.path !== path)
    }
  }

  // 主动订阅整个表单值的变动(表单控件消失不会卸载)
  public subscribeFormGlobal(path: string, listener: FormListener['onChange']) {
    this.formGlobalListeners.push({
      onChange: listener,
      path: path
    });
    return () => {
      this.formGlobalListeners = this.formGlobalListeners.filter((sub) => sub.path !== path)
    }
  }

  // 卸载
  public unsubscribeFormGlobal(path?: string) {
    if (typeof path === 'string') {
      this.formGlobalListeners = this.formGlobalListeners.filter((sub) => sub.path !== path)
    } else {
      this.formGlobalListeners = []
    }
  }

  // 订阅表单错误的变动
  public subscribeError(path: string, listener: FormListener['onChange']) {
    this.errorListeners.push({
      onChange: listener,
      path: path
    });
    return () => {
      this.errorListeners = this.errorListeners.filter((sub) => sub.path !== path)
    }
  }
}
