# react-easy-formcore

English | [中文说明](./README_CN.md)

[![Version](https://img.shields.io/badge/version-1.2.5-green)](https://www.npmjs.com/package/react-easy-formcore)

# Introduction?

Lightweight form container component where the target control only needs to provide the `props`： `value` (or set via `valueProp`) and `onChange`, leaving the rest to the component's `FormStore` to manage the updating and binding of the data. Very simple to use

# Version changelog
 - 1.x: 
   - Add a `data-name` setting to identify controls that match the `value,onChange` requirement
   - Add `col` layout attribute to allow for raster layout
 - Version 1.0.3: 
   - labelWidth and layout have been changed to labelStyle, allowing you to customize your own label label-related styles
   - inline changed to layout, with three layout types.
   - Changes to the form char rule in forms: where the path contained an array of items, for example `a.b.0`, this has now been changed to `a.b[0]`.
   - Enhanced the ability to bind `Form.Item` and `Form.List` form fields in both directions, recursively to internally wrapped controls
 - 0.3.8 Initial release

# Matters
- The css style file needs to be introduced before it can be used, for example: `import 'react-easy-formcore/lib/css/main.css'`;

# Form.Item

The smallest unit of a component in a form, and nodes as an object can be nested within each other.

- Provides styles, as well as `value` (or set via `valueProp`) and `onChange` two-way bindings.
- You can customize `onChange` in outside, but you can only set the form value via an instance method such as `store.setFieldValue`.
- Custom form validation rules can be provided with the form validation rules property `rules`.
- When a non-form component or node is added outside the input form control, bind the target control by adding `data-type="fragment"` to filter the non-target node or by setting `data-name` to mark the target input form.

# Form.List

The `Form.Item` component acts as an item in the `Form.List` array type and is combined to form an array

- Only `Form.Item` items are recognised in `Form.List` and there is no need to set the `name` field.
- The `rules` provided by `Form.List` are valid for all input items in the array, but have a lower priority than the `rules` of the `Form.Item` in the array

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
import 'react-easy-formcore/lib/css/main.css';
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
        <div data-type="fragment">
          <Input />
        </div>
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
import 'react-easy-formcore/lib/css/main.css';
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

### base options

- `layout` `'horizontal'|'vertical'|'inline'` All field components set the layout type, the default value is `horizontal`.
- `compact` Whether to hide error messages for all Form.
- `required` Indicates if all field components display asterisks, not form checks, for display only, default is `false`.
- `labelStyle` Custom `label` style for all field components, `optional`.
- `gutter` The distance between all field component custom labels and form components, `optional`.
- `col` grid layout `{span?: number, xs?: number, sm?: number, md?: number, lg?: number}`
- `colon` boolean is add colon

### Form Props
Inherited base options

- `className` The class name of the form element, `optional`.
- `store` The form data store, `required`.
- `initialValues` The initial value of the form, which is overridden by the `initialValue` of the form field, Note that this value can only initialise the form `optional`.
- `onSubmit` The form submit callback, `optional`.
- `onMount` The form mounted callback `optional`.
- ` onReset` Form reset defaults, `optional`.
- `onFieldsChange` The event function when a form changes onChange will only be triggered by the control's active `onChange`, not by `store.setFieldValue` and `store.setFieldsValue`, avoiding circular calls。`optional`。
- `onValuesChange` Listening for changes in form values.`optional`。
- `errorClassName` All Form.Field components add a custom class name when there is an error message, `optional`.
### Form.Item Props
Inherited base options

- `className` Form field class name, `optional`.
- `label` Form field label, `optional`.
- `name` Form field name, `optional`.
- `suffix` Suffix node, `optional`.
- `initialValue` Form field initial value, Note that this value can only initialise the form `optional`.
- `rules` Checksum rules for form fields `optional`.
- `valueProp` attribute of the form value.`optional`
- `valueGetter` The way to get the form value from the form event, `optional`.
- `onFieldsChange` The event function when a form changes onChange will only be triggered by the control's active `onChange`, not by `store.setFieldValue` and `store.setFieldsValue`, avoiding circular calls。`optional`。
- `onValuesChange` Listening for changes in form values.`optional`。
- `errorClassName` add a custom class name when there is an error message, `optional`.

### Form.List Props
Inherited base options

- `className` Form field class name, `optional`.
- `label` Form field label, `optional`.
- `name` Form field name, `optional`.
- `suffix` Suffix node, `optional`.
- `initialValue` Form field initial value, Note that this value can only initialise the form `optional`.
- `rules` Checksum rules for form fields `optional`.

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

- `new FormStore(defaultValues)` form manager.
- `store.getFieldValue(name?: string)` Returns the value of the form field for which `name` is specified, or the value of the whole form without `name`.
- `store.setFieldValue(name, value)` Update the value of a form field
- `store.setFieldsValue(obj: Partial<T>)` Set the value of the form field (override).
- `store.reset(values?: Partial<T>)` Reset the form.The value can be passed to reset to the target value.
- `store.validate(name?: string)` Checks form and returns error messages and form values.
- `store.getFieldError(name?: string)` Returns error messages for a single form field or for all errors on a form.

### Hooks

- `useFormStore(defaultValues)` create `FormStore`
