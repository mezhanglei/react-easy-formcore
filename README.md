# react-easy-formcore

English | [中文说明](./README_CN.md)

[![Version](https://img.shields.io/badge/version-0.1.4-green)](https://www.npmjs.com/package/react-easy-formcore)

# Introduction?

Lightweight form container component where the target control only needs to provide the `value` (or set via `valueProp`) and `onChange` methods, leaving the rest to the component's `FormStore` to manage the updating and binding of the data. Very simple to use

# Form.Item

The smallest unit of a component in a form, and nodes as an object can be nested within each other.

- [x] Provides styles, as well as `value` (or set via `valueProp`) and `onChange` two-way bindings.
- [x] You can customize `onChange`, but you can only set the form value via an instance method such as `store.setFieldValue`.
- [x] Custom form validation rules can be provided with the form validation rules property `rules`.

# Form.List

The `Form.Item` component is combined into an array as the values in `Form.

- [x]  Each item in `Form.List` is an element of an array, no need to set the `name` field
- [x] The `rules` checksum rules provided by `Form.List` are valid for all input items in the array, but have a lower priority than the items in the array's own `rules` rules

## install

```bash
npm install react-easy-formcore --save
# 或者
yarn add react-easy-formcore
```

## base

```javascript
import React from "react";
import { Form, FormStore } from "react-easy-formcore";
import { Input, Select } from "antd";

class demo extends React.Component {
  constructor(props) {
    super(props);
    this.store = new FormStore({ name1: "初始值设置" });
    this.state = {};
  }

  onSubmit = async (e) => {
    const { error, values } = await this.store.validate();
    console.log(error, values, "error ang values");
  };

  // 自定义校验
  // validator = (value) => {
  //   if(!value) {
  //     return false
  //   }
  //   return true;
  // }

  // 自定义校验
  validator = (value, callError) => {
    if (value?.length > 5) {
      callError("name1 is more than 5");
    }
    callError();
  };

  render() {
    return (
      <Form store={this.store} onSubmit={this.onSubmit}>
        <Form.Item
          label="Name1"
          name="name1"
          rules={[{ required: true, message: "name1 is empty" }, { validator: this.validator, message: "custome tips" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Name2"
          name="name2"
          rules={[{ required: true, message: "name2 is empty" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="">
          <button>Submit</button>
        </Form.Item>
      </Form>
    );
  }
}
```
## Form.List

```javascript
import React from "react";
import { Form, FormStore } from "react-easy-formcore";
import { Input, Select } from "antd";

class demo extends React.Component {
  constructor(props) {
    super(props);
    this.store = new FormStore({ name1: "initialvalue" });
    this.state = {};
  }

  onSubmit = async (e) => {
    const { error, values } = await this.store.validate();
    console.log(error, values, "error ang values");
  };

  // validator
  // validator = (value) => {
  //   if(!value) {
  //     return false
  //   }
  //   return true;
  // }

  // validator
  validator = (value, callError) => {
    if (value?.length > 5) {
      callError("Name1 is more than 5");
    }
    callError();
  };



  render() {
    return (
      <Form store={this.store} onSubmit={this.onSubmit}>
        <Form.List name="list">
          <Form.Item
            rules={[
              { required: true, message: "list's one is Empty" },
              { validator: this.validator, message: "custome tips" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "list's two is Empty" }]}
          >
            <Input />
          </Form.Item>
        </Form.List>
        <Form.Item label="">
          <button>Submit</button>
        </Form.Item>
      </Form>
    );
  }
}
```

## APIs

### Form Props

- `className` The class name of the form element, `optional`.
- `store` The form data store, `required`.
- `onSubmit` The form submit callback, `optional`.
- `onMount` The form mounted callback `optional`.
- ` onReset` Form reset defaults, `optional`.
- `onFormChange` The event function when a form changes onChange will only be triggered by the control's active `onChange`, not by `store.setFieldValue` and `store.setFieldsValue`, avoiding circular calls。`optional`。
- `inline` All Form.Field components set the inline layout, default is `false`.
- `compact` Whether to hide error messages for all Form.
- `required` Indicates if all Form.Field components display asterisks, not form checks, for display only, default is `false`.
- `labelWidth` The custom label width for all Form.
- `labelAlign` The align of label for all Form.
- `gutter` The distance between all Form.Field component custom labels and form components, `optional`.
- `errorClassName` All Form.Field components add a custom class name when there is an error message, `optional`.
### Form.Item Props

- `className` Form field class name, `optional`.
- `label` Form field label, `Optional`.
- `name` Form field name, `optional`.
- `initialValue` Form field initial value `Optional`
- `rules` Checksum rules for form fields `Optional`.
- `valueProp` attribute of the form value.`Optional`
- `valueGetter` The way to get the form value from the form event, `Optional`.
- `suffix` Suffix node, `optional`.
- `inline` All Form.Field components set the inline layout, default is `false`.`optional`.
- `compact` Whether to hide error messages `optional`.
- `required` Indicates if all Form.Field components display asterisks, not form checks, for display only, default is `false`. `optional`.
- `labelWidth` The custom label width `optional`.
- `labelAlign` The align of label `optional`.
- `gutter` The distance custom labels `optional`.
- `errorClassName` add a custom class name when there is an error message, `optional`.

### Form.List Props

- `className` Form field class name, `optional`.
- `label` Form field label, `Optional`.
- `name` Form field name, `optional`.
- `initialValue` Form field initial value `Optional`
- `rules` Checksum rules for form fields `Optional`.
- `inline` All Form.Field components set the inline layout, default is `false`.`optional`.
- `compact` Whether to hide error messages `optional`.
- `required` Indicates if all Form.Field components display asterisks, not form checks, for display only, default is `false`. `optional`.
- `labelWidth` The custom label width `optional`.
- `labelAlign` The align of label `optional`.
- `gutter` The distance between all Form.Field component custom labels `optional`.

### rules
The rules in the fields of the values in `rules` perform the checks in order, and only one rule can be set for each item in `rules`.
- `message` Default error message when a check rule reports an error `optional`。
- `required` Indicates that the value of the field is required `optional`。
- `validator` Type: `(value, callback: (err: string) => void) => void | boolean` Custom check function, `value` is the current control value, `callback` can actively call the error reporting method `optional`.
- `pattern` Type: `RegExp | string` Expression check, error if does not match `optional`.
- `whitespace` Type: `boolean` For type `string`, set true check space `optional`.
- `max` Type: `number` Maximum length for string type; maximum length for number type; maximum length for array type `optional`.
- `min` Type: `number` minimum length for string type; minimum value for number type; minimum length for array type `optional`.

### FormStore Methods

- `new FormStore(defaultValues?, rules?: FormRule[])` form manager。
- `store.getFieldValue()` Returns the value of the entire form.
- `store.getFieldValue(name: string | string[])` Returns the value of a form field based on the field name. When `name` is an array, returns the value of multiple form fields
- `store.setFieldValue(name, value)` Update the value of a form field
- `store.setFieldsValue(obj: Partial<T>)` Set the value of the form field (override).
- `store.reset()` Reset the form.
- `store.validate()` Checks the entire form and returns error messages and form values.
- `store.validate(name)` Checks the value of a form field against the field `name` and returns an error message and the form value.
- `store.getFieldError(name?: string)` Returns error messages for a single form field or for all errors on a form.
- `store.setFieldRules(name: string, rules?: FormRule[])` Update the check rules for form fields.
- `store.setFieldsRules(values: FormRules<T>)` Set the check rule (override) for the form field.

### Hooks

- `useFormStore(defaultValues?, rules?: FormRule[])` create `FormStore`
