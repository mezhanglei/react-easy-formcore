# react-easy-formcore

[English](./README.md) | 中文说明

[![Version](https://img.shields.io/badge/version-4.0.16-green)](https://www.npmjs.com/package/react-easy-formcore)

# 适用场景

轻量级表单容器双向绑定组件，会自动处理控件的`value`(或其他)和`onChange`，完成表单值的显示和更新。通过注入的`FormStore`实例提供的方法可以实现其他操作。
# 版本更新日志
 - 4.x 版本
   - 4.0.12 优化路径传递，~~`joinPath`~~ 更改为 `joinFormPath`.
   - 4.0.11 `Form`组件增加`tagName`属性，可以替换默认的`form`标签.
   - 优化表单中的路径系统, 修复`useFormValues`的问题.
 - 3.x版本
   重要架构更新，需要删除旧包，再安装新版本的包
   - 分离出`component`属性，可以动态更换`Form.Item`和`Form.List`组件的显示组件, 同时, 显示组件自身的props既可以在`Form`上全局设置，也可以在`Form.Item`或`Form.List`上局部设置
   - `onFieldsChange` and `onValuesChange` 更改回调参数
   - 3.0.3 ~~`data-type="fragment"`~~ 需要改成 `data-type="ignore"`
   - 3.1.2 `Form.Item`增加`trigger`属性用于设置触发收集值的事件, `validateTrigger`设置触发表单校验的事件. 同时`rules`属性中可以给每条校验设置`validateTrigger`校验事件.
   - 3.1.3 增加`tooltip`属性，可以添加提示.
 - 2.x版本
   - ~~`col`和`customInner`废弃~~.
 - 1.3.x版本: 
   - ~~增加`inline`行内布局属性，配合`col`属性使用~~
   - ~~增加`customInner`属性，可以自定义展示容器~~
   - 增加`labelAlign`和`labelWidth`属性
   - 增加`valueSetter`属性,和`valueGetter`属性配合使用，格式化输入项和输出项。
 - 1.2.x版本: 
   - 1.2.9 增加`footer`属性
   - 增加`data-name`设置，用来标记符合`value,onChange`要求的控件
   - ~~增加`col`布局属性，可以进行栅格布局~~
 - 1.0.x版本: 
   - ~~`labelWidth`和`labelAlign`更改为labelStyle, 可以自己自定义label标签相关的样式~~
   - 增加layout, 拥有`'horizontal' | 'vertical'`两种类型。
   - 表单中关于表单变量路径规则的更改：原路径含有数组项时，举例`a.b.0`, 现在更改为`a.b[0]`。
 - 0.3.8 初始版本
    

# Matters
 - 在使用之前需要先引入css样式文件，例：`import 'react-easy-formcore/lib/css/main.css'`;

# Form.Item

表单中的组件最小单元，作为一个对象的节点可以相互嵌套。

- 提供样式，以及`value`(或通过`valueProp`设置)和`onChange`双向绑定。
- 可以控件外部自定义`onChange`，但只能通过`store.setFieldValue`等实例方法设置表单值
- 可以提供表单校验规则属性`rules`，进行自定义表单校验规则。
- 当输入表单控件外面添加了非表单组件或节点，通过添加`data-type="ignore"`过滤非目标节点或设置`data-name`标记目标节点来绑定目标控件。

# Form.List

`Form.Item`组件作为`Form.List`数组类型中的项，组合形成一个数组

- `Form.List`中只识别`Form.Item`项，无需设置`name`字段。
- `Form.List`提供的`rules`校验规则，对数组中的所有输入项都有效，但优先级低于数组中的`Form.Item`的`rules`规则

## 安装

```bash
npm install react-easy-formcore --save
# 或者
yarn add react-easy-formcore
```

## 基本使用

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
      <Form.Item label="Name1" name="name1" rules={[{ required: true, message: 'name1 is Empty' }, { validator: validator, message: 'validator error' }]}>
        <div data-type="ignore">
          <input />
        </div>
      </Form.Item>
      <Form.Item label="Name2" name="name2" rules={[{ required: true, message: 'name2 is empty' }]}>
        <input />
      </Form.Item>
      <Form.Item label="">
        <button>Submit</button>
      </Form.Item>
    </Form>
  );
};
```

## 数组管理

```javascript
import React from "react";
import { Form, useFormStore } from "react-easy-formcore";
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

### 默认的表单域显示组件的属性
- `className` `string` 类名，`可选`。
- `label` `string` 标签，`可选`。
- `labelStyle` `CSSProperties` 自定义`label`样式，`可选`。
- `labelWidth` `CSSProperties['width']`, label标签的宽度。
- `labelAlign` `CSSProperties['textAlign']`, label标签的textAlign属性。
- `inline` `boolean`, 是否设置行内布局。
- `layout` `'horizontal'|'vertical'` 设置布局类型，默认值为`horizontal`。
- `colon` `boolean` 是否添加冒号
- `required` `boolean` 是否显示星号，不包含表单校验，仅用于显示，默认值为`false`。
- `gutter` `number` 自定义`label`标签和表单组件间的距离，`可选`。
- `error` `string` 表单域显示组件的报错信息字段。
- `suffix` `React.ReactNode` 后缀节点，`可选`。
- `footer` `React.ReactNode` 底部节点，`可选`。
- `tooltip` `string` 提示图标，可以提示信息。`可选`。
- `compact` `boolean` 是否紧凑，会去掉组件的`padding`。`可选`。

### Form Props
继承表单域显示组件(`component`)的props

- `className` 表单元素类名，`可选`。
- `store` 表单数据存储，`必须`。
- `tagName` 更换表单的元素标签名, 默认`form`标签
- `initialValues` 表单的初始值，会被表单域的`initialValue`覆盖, 注意此值只能初始化表单赋值`可选`。
- `onSubmit` `form`标签提交事件, 只有提供`htmlType`为`submit`的`button`标签才可以触发，`可选`。
- `onMount` 表单渲染完毕的回调，`可选`。
- `onReset` `form`标签触发重置默认值触发事件, 只有提供`htmlType`为`reset`的`button`标签才可以触发 `可选`。
- `onFieldsChange` 表单域 `onChange` 变化时的事件函数，只会被控件主动`onChange`触发，不会被`store.setFieldValue`和`store.setFieldsValue`触发, 避免循环调用。`可选`。
- `onValuesChange` 监听表单值的变化。`可选`。


### Form.Item Props
继承表单域显示组件(`component`)的props

- `className` 表单域类名，`可选`。
- `component` 表单域显示组件。
- `name` 表单域字段名，`可选`。
- `trigger` 设置表单域收集表单值的事件名，默认`onChange`.
- `validateTrigger` 设置表单域校验的触发事件, 默认`onChange`.
- `valueProp` 回调函数对象中值的字段名，默认值为`'value'`。
- `valueGetter` 格式化输出表单值的函数，配合`valueSetter`使用, `可选`。
- `valueSetter` 格式化输入表单值的函数，配合`valueGetter`使用, `可选`。
- `rules` 表单域的校验规则 `可选`。
- `initialValue` 表单域的初始值，注意此值和`value`不同，只能表单第一次渲染时赋值`可选`。
- `onFieldsChange` 控件的值变化时的事件函数，只会被控件主动`onChange`触发，不会被`store.setFieldValue`和`store.setFieldsValue`触发, 避免循环调用。`可选`。
- `onValuesChange` 监听表单值的变化。`可选`。
- `errorClassName` 控件当有错误信息时，添加一个自定义类名，`可选`。

### Form.List Props
继承表单域显示组件(`component`)的props

- `className` 表单域类名，`可选`。
- `component` 表单域显示组件。
- `name` 表单域字段名，`可选`。
- `initialValue` 表单域的初始值，注意此值和`value`不同，只能初始化表单赋值`可选`。
- `rules` 表单域的校验规则 `可选`。

### 表单的rules中的校验字段
`rules`中的值的字段中的规则会按照顺序执行校验，`rules`中每一项只能设置一种规则。
- `validateTrigger` `string` 校验表单规则的触发事件, 默认`onChange`.
- `message` `string` 校验规则报错时，默认的报错信息 `可选`。
- `required` `boolean` 标记必填符号, 同时`rules`中的`required`属性为`true`也自动添加必填标记 `可选`。
- `validator` `(value) => void | boolean` 自定义校验函数, `value`为当前控件值 `可选`。
- `pattern` `RegExp | string` 表达式校验，不符合则报错 `可选`。
- `whitespace` `boolean` 空格校验 `可选`。
- `max` `number` 表单值为`string`类型时字符串最大长度；`number` 类型时为最大值；`array` 类型时为数组最大长度 `可选`。
- `min` `number` 表单值为`string`类型时字符串最小长度；`number` 类型时为最小值；`array` 类型时为数组最小长度 `可选`。

### FormStore Methods

- `new FormStore(defaultValues)` 创建表单存储。
- `store.getFieldValue(path?: string)` 返回指定`path`的表单域的值，不指定`path`返回整个表单的值。
- `store.setFieldValue(path, value)` 更新表单域的值
- `store.setFieldsValue(obj: Partial<T>)` 设置表单域的值(覆盖)。
- `store.reset(values?: Partial<T>)` 重置表单, 可以传值重置为目标值。
- `store.validate(path?: string)` 校验表单，并返回错误信息和表单值。
- `store.getFieldError(path?: string)` 返回目标的错误信息或所有的错误信息。

### Hooks

- `useFormStore(defaultValues)` 使用 hooks 创建 FormStore。
- `useFormError(store: FormStore, path?: string)` 使用 hooks 获取指定的报错信息。
- 3.0.12 `useFormValues(store: FormStore, path?: string | string[])` 使用 hooks 获取指定的表单值。
- `useValidator()` hook创建 `validator`校验实例