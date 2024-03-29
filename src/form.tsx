import React, { CSSProperties } from 'react';
import { FormItem } from './form-item';
import { FormStore } from './form-store';
import { FormStoreContext, FormOptionsContext, FormInitialValuesContext } from './form-context';
import { FormList } from './form-list';
import { ItemCoreProps } from './item-core';
import { ItemProps } from './components/item';

interface CreateFormProps extends React.HTMLAttributes<HTMLElement> {
  tagName?: keyof React.ReactHTML
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onReset?: (e: React.FormEvent<HTMLFormElement>) => void;
}
const CreateForm = React.forwardRef<any, CreateFormProps>((props, ref) => {
  const { tagName = "form", ...rest } = props;
  return React.createElement(tagName, { ...rest, ref });
});

export type FormProps<S = FormStore, T = ItemProps> = T & ItemCoreProps & {
  className?: string;
  form?: S;
  style?: CSSProperties;
  children?: any;
  initialValues?: any;
  component?: any;
} & CreateFormProps;

export function Form(props: FormProps) {
  const { className = '', style, children, form, initialValues, tagName, onSubmit, onReset, ...options } = props;

  const classNames = 'easy-form ' + className;

  return (
    <CreateForm
      tagName={tagName}
      className={classNames}
      style={style}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(e);
      }}
      onReset={onReset}
    >
      <FormStoreContext.Provider value={form}>
        <FormOptionsContext.Provider value={options}>
          <FormInitialValuesContext.Provider value={initialValues}>
            {children}
          </FormInitialValuesContext.Provider>
        </FormOptionsContext.Provider>
      </FormStoreContext.Provider>
    </CreateForm>
  );
}

Form.Item = FormItem;
Form.List = FormList;
