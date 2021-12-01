# react-easy-formcore

English | [中文说明](./README_CN.md)

[![Version](https://img.shields.io/badge/version-0.0.4-green)](https://www.npmjs.com/package/react-easy-formcore)

# Introduction?

Lightweight form container component where the target control only needs to provide the `value` (or set via `valueProp`) and `onChange` methods, leaving the rest to the component's `FormStore` to manage the updating and binding of the data. Very simple to use

# features

- [x] Form.Item component does not provide styles, only `value` (or other fields) and `onChange` bi-directional binding.
- [x] Form.Field component provides styles for the outer container of the form control such as checksum, as well as `value` (or other field) and `onChange` two-way binding.
- [x] `onChange` can be customized, but the form value can only be set via methods such as `setFieldValue` of the `FormStore` instance
- [x] Provide form validation rules `rules`, you can customize form validation rules.

## install

```bash
npm install react-easy-formcore --save
# 或者
yarn add react-easy-formcore
```

## base

```javascript
import React from 'react';
import { Form, FormStore } from "react-easy-formcore";
import { Input, Select } from 'antd'

class demo extends React.Component {
    constructor(props) {
        super(props);
        this.store = new FormStore({Name1: 'initialvalue'});
        this.state = {
        }
    }

    onSubmit = async (e) => {
        const { error, values } = await this.store.validate()
        console.log(error, values, 'error ang values')
    };

    render() {
        return (
            <Form store={this.store} onSubmit={this.onSubmit}>
                <Form.Field label="Name1" name="name1" rules={[{ required: true, message: 'Name1 is Empty' }]}>
                  <Input />
                </Form.Field>
                <Form.Field label="Name2" name="name2" rules={[{ required: true, message: 'Name2 is empty' }]}>
                   <Input />
                </Form.Field>
                <Form.Field label="">
                    <button>Submit</button>
                </Form.Field>
            </Form>
        );
    }
}

```
## validator

```javascript
import React from 'react';
import { Form, FormStore } from "react-easy-formcore";
import { Input, Select } from 'antd'

class demo extends React.Component {
    constructor(props) {
        super(props);
        this.store = new FormStore({Name1: 'initialvalue'});
        this.state = {
        }
    }

    onSubmit = async (e) => {
        const { error, values } = await this.store.validate()
        console.log(error, values, 'error ang values')
    };

    // 使用rule里的message字段校验提示
    // validator = (value) => {
    //   if(!value) {
    //     return false
    //   }
    //   return true;
    // }

    // 忽略message，通过callError方法自定义校验提示
    validator = (value, callError) => {
      if(value?.length > 5) {
        callError('Name1 length more than 5')
      }
      callError()
    }

    render() {
        return (
            <Form store={this.store} onSubmit={this.onSubmit}>
                <Form.Field label="Name1" name="name1" rules={[{ required: true, message: 'Name1 is Empty' }, { validator: this.validator, message: 'Custom lints' }]}>
                  <Input />
                </Form.Field>
                <Form.Field label="Name2" name="name2" rules={[{ required: true, message: 'Name2 is Empty' }]}>
                   <Input />
                </Form.Field>
                <Form.Field label="">
                    <button>Submit</button>
                </Form.Field>
            </Form>
        );
    }
}

```

## APIs

### Form Props

- `className` The class name of the form element, `optional`.
- `store` The form data store, `required`.
- `inline` All Form.Field components set the inline layout, default is `false`.
- `compact` Whether to hide error messages for all Form.
- `required` Indicates if all Form.Field components display asterisks, not form checks, for display only, default is `false`.
- `labelWidth` The custom label width for all Form.
- `gutter` The distance between all Form.Field component custom labels and form components, `optional`.
- `errorClassName` All Form.Field components add a custom class name when there is an error message, `optional`.
- `onSubmit` The form submit callback, `optional`.
- ` onReset` Form reset defaults, `optional`.
- `onFormChange` The event function when a form changes onChange will only be triggered by the control's active `onChange`, not by `store.setFieldValue` and `store.setFieldsValue`, avoiding circular calls。`optional`。
### Form Field Props

- `className` The class name of the form field, `optional`.
- `label` The form field label, `optional`.
- `name` The form field field name, `optional`.
- `valueProp` The name of the value attribute to fill in to the child component, the default value is `'value'`.
- `valueGetter` The way to get the form value from the form event, `optional`.
- `suffix` The suffix node, `optional`.
- `rules` Checksum rules for the form field `Optional`.

### Form Item Props
- `name` The form field field name, `optional`.
- `valueProp` The name of the value attribute to fill in to the child component, the default value is `'value'`.
- `valueGetter` The way to get the form value from the form event, `optional`.
- `suffix` The suffix node, `optional`.
- `rules` Checksum rules for the form field `Optional`.

### FormStore Methods

- ` new FormStore(defaultValues?, rules?: FormRule[])` Creates a form store.
- `store.getFieldValue()` Returns the value of the entire form.
- ` store.getFieldValue(name: string | string[]` Returns the value of the form field based on the field name. When name is an array, returns the value of multiple form fields
- `store.setFieldValue(name, value)` Update the value of a form field
- `store.setFieldsValue(obj: Partial<T>)` Set the value of a form field
- `store.reset()` Reset the form.
- `store.validate()` Validates the entire form and returns an error message and the form value.
- `store.validate(name)` Validates the value of the form field against the field name and returns an error message and the form value.
- `store.getFieldError(name?: string)` Returns an error message for a single form field or for all of the form's errors.
- `store.setFieldError(name: string, message: string | undefined)` Update the error message for a form field
- `store.setFieldsError(erros: FormErrors<T>)` Set the error message for the form field.
- ` store.setFieldRules(name: string, rules?: FormRule[])` Update the form field's checksum rules.
- ` store.setFieldsRules(values: FormRules<T>)` Set the validation rules for a form field.
- ` store.subscribeValue(name: string, onChange: () => void)` Subscribe to the form value changes and return a function for unsubscribing.
- `store.subscribeError(name: string, onChange: () => void)` Subscribe to the form error changes and return a function for unsubscribing.

### Hooks

- `useFormStore(defaultValues?, rules?: FormRule[])` Use hooks to create a FormStore.
- `useFieldChange(props: FieldChangeProps)` Creates a form field listener using hooks.
