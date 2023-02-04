# react-easy-formcore

English | [中文说明](./README_CN.md)

[![Version](https://img.shields.io/badge/version-4.0.0-green)](https://www.npmjs.com/package/react-easy-formcore)

# Introduction?

Lightweight form container two-way binding component that automatically handles the `value` (or other) and `onChange` of the control to complete the display and update of the form values. Other operations can be implemented through the methods provided by the injected `FormStore` instance.

# Version changelog
- 4.x
   - optimize the routing system in forms, fix the `useFormValues` error.
- 3.x
   Important architecture update, you need to delete the old package and install the new version again
   - add `component` property to dynamically replace the display components of the `Form.Item` and `Form.List` components, and the display component's own props can be set either globally on `Form` or locally on `Form.Item` or `Form.
   - `onFieldsChange` and `onValuesChange` changed
   - 3.0.3 ~~`data-type="fragment"`~~ changed to `data-type="ignore"`
   - 3.1.2 Add `trigger` property to `Form.Item` to set the event that triggers the collection of values, and `validateTrigger` to set the event that triggers the form validation. Also `rules` property can set `validateTrigger` event for each rule.
   - 3.1.3 Add `tooltip` property to add tip.
 - 2.x
   - ~~`col` and `customInner` deprecated~~.
 - 1.3.x: 
   - ~~Added `inline` inline layout attribute, used with `col` attribute~~
   - ~~Add `customInner` property, you can customize the display container~~
   - Added `labelAlign` and `labelWidth` properties
   - Added `valueSetter` property, used in conjunction with `valueGetter` property to format input and output items.
 - 1.2.x: 
   - 1.2.9 add `footer` props
   - add `data-name` setting to mark controls that match the `value,onChange` requirement
   - ~~Add `col` layout attribute to allow for raster layout~~
 - Version 1.0.x: 
   - ~~`labelWidth` and `layout` have been changed to labelStyle, allowing you to customize your own label label-related styles~~
   - inline changed to layout, with `'horizontal' | 'vertical'`.
   - Changes to the form char rule in forms: where the path contained an array of items, for example `a.b.0`, this has now been changed to `a.b[0]`.
 - 0.3.8 Initial release

# Matters
- The css style file needs to be introduced before it can be used, for example: `import 'react-easy-formcore/lib/css/main.css'`;

# Form.Item

The smallest unit of a component in a form, and nodes as an object can be nested within each other.

- Provides styles, as well as `value` (or set via `valueProp`) and `onChange` two-way bindings.
- You can customize `onChange` in outside, but you can only set the form value via an instance method such as `store.setFieldValue`.
- Custom form validation rules can be provided with the form validation rules property `rules`.
- When a non-form component or node is added outside the input form control, bind the target control by adding `data-type="ignore"` to filter the non-target node or by setting `data-name` to mark the target input form.

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
import { Form, useFormStore, useFormValues } from "react-easy-formcore";
import 'react-easy-formcore/lib/css/main.css';
import { Input, Select } from "antd";

export default function Demo() {

  const form = useFormStore();

  const onSubmit = async (e) => {
    e.preventDefault();
    const { error, values } = await form.validate();
    console.log(error, values, 'error ang values');
  };

  const validator = async (value) => {
    if (value?.length < 2) {
      return 'length is < 2';
    }
  }

  const formvalues = useFormValues(form, ['name1', 'name2'])
  console.log(formvalues, 'formvalues')
  return (
    <Form initialValues={{ name1: 1111 }} store={form} onSubmit={onSubmit}>
      <Form.Item label="Name1" name="name1" required rules={[{ required: true, message: 'name1 is Empty' }, { validator: validator, message: 'validator error' }]}>
        <div data-type="ignore">
          <input />
        </div>
      </Form.Item>
      <Form.Item label="Name2" name="name2" required rules={[{ required: true, message: 'name2 is empty' }]}>
        <input />
      </Form.Item>
      <Form.Item label="">
        <button>Submit</button>
      </Form.Item>
    </Form>
  );
};
```
## Form.List

```javascript
import React from "react";
import { Form, FormStore } from "react-easy-formcore";
import 'react-easy-formcore/lib/css/main.css';
import { Input, Select } from "antd";

export default function Demo() {

  const form = useFormStore();

  const onSubmit = async (e) => {
    e.preventDefault();
    const { error, values } = await form.validate();
    console.log(error, values, 'error ang values');
  };

  const validator = async (value) => {
    if (value?.length < 2) {
      return 'length is < 2';
    }
  }

  return (
    <Form store={form} onSubmit={onSubmit}>
      <Form.List name="list">
        <Form.Item
          rules={[
            { required: true, message: "list's one is Empty" },
            { validator: validator, message: "custome tips" },
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
};

```

## APIs

### Default field display component

- `className` `string` class name, `optional`.
- `label` `string` label, `optional`.
- `labelStyle` `CSSProperties` custom label's style, `optional`.
- `labelWidth` `CSSProperties['width']`, the width of the label label.
- `labelAlign` `CSSProperties['textAlign']`, the label label's textAlign property.
- `inline` `boolea`, Whether or not field display components have inline layout.
- `layout` `'horizontal'|'vertical'` field’s display components set the layout type, the default value is `horizontal`.
- `colon` `boolean` whether add colon
- `required` `boolean` Indicates that the value of the field is required `optional`。
- `gutter` `number` The distance between field's display component custom labels and form components, `optional`.
- `error` `string` form field displays the component's error message field.
- `suffix` `React.ReactNode` Suffix node, `optional`.
- `footer` `React.ReactNode` bootom node, `optional`.
- `tooltip` `string` Tip icon to prompt for information. `optional`.

### Form Props
Inherited field display component

- `className` The class name of the form element, `optional`.
- `store` The form data store, `required`.
- `initialValues` The initial value of the form, which is overridden by the `initialValue` of the form field, Note that this value can only initialise the form `optional`.
- `onSubmit` The form submit callback, `optional`.
- `onMount` The form mounted callback `optional`.
- `onReset` Form reset defaults, `optional`.
- `onFieldsChange` The event function when a form changes onChange will only be triggered by the control's active `onChange`, not by `store.setFieldValue` and `store.setFieldsValue`, avoiding circular calls。`optional`.
- `onValuesChange` Listening for changes in form values.`optional`.

### Form.Item Props
Inherited field display component

- `className` Form field class name, `optional`.
- `component` field display component. 
- `name` Form field name, `optional`.
- `trigger` Sets the event name of the form field to collect form values, default `onChange`.
- `validateTrigger` Sets the event for form field validation, default `onChange`.
- `valueProp` attribute of the form value.`optional`.
- `valueGetter` A function to format the output form value, used with `valueSetter`, `optional`.
- `valueSetter` function to format input form value, used with `valueGetter`, `optional`.
- `rules` Checksum rules for form fields `optional`.
- `initialValue` Form field initial value, Note that this value can only initialise the form `optional`.
- `onFieldsChange` The event function when a form changes onChange will only be triggered by the control's active `onChange`, not by `store.setFieldValue` and `store.setFieldsValue`, avoiding circular calls。`optional`.
- `onValuesChange` Listening for changes in form values.`optional`。
- `errorClassName` add a custom class name when there is an error message, `optional`.

### Form.List Props
Inherited field display component

- `className` Form field class name, `optional`.
- `component` field display component. 
- `name` Form field name, `optional`.
- `initialValue` Form field initial value, Note that this value can only initialise the form `optional`.
- `rules` Checksum rules for form fields `optional`.

### rules
The rules in the fields of the values in `rules` perform the checks in order, and only one rule can be set for each item in `rules`.
- `validateTrigger` Event to validate form rules, default `onChange`.
- `message` Default error message when a check rule reports an error `optional`。
- `required` Indicates that the value of the field is required `optional`。
- `validator` Type: `(value) => void | boolean` Custom check function, `value` is the current control value `optional`.
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
- `useFormError(store: FormStore, path?: string)` Use hooks to get the specified form error.
- 3.0.12 `useFormValues(store: FormStore, path?: string | string[])` Use hooks to get the specified form values.
- `useValidator()` create `validator`
