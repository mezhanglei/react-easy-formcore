# react-easy-formcore

[English](./README.md) | 中文说明

[![Version](https://img.shields.io/badge/version-3.0.1-green)](https://www.npmjs.com/package/react-easy-formcore)

# 适用场景

轻量级表单容器双向绑定组件，目标控件只需要提供`props`方法：`value`(或通过`valueProp`设置)和`onChange`，其余的交给组件中的`FormStore`来管理数据的更新与绑定。使用非常简单

# 版本更新日志
 - 3.x版本
   - 重新进行了架构，需要删除旧包，再安装新版本的包
   - 分离出`component`属性，可以动态更换`Form.Item`和`Form.List`组件的显示组件
   - `component`组件的部分属性既可以在`Form`上全局设置，也可以在`Form.Item`或`Form.List`上局部设置
   - `onFieldsChange` and `onValuesChange` 更改回调参数
 - 2.x版本
   - 大版本更新，`col`和`customInner`废弃。
 - 1.3.x版本: 
   - 增加`inline`行内布局属性，配合`col`属性使用
   - 增加`customInner`属性，可以自定义展示容器
   - 增加`labelAlign`和`labelWidth`属性
   - 增加`valueSetter`属性,和`valueGetter`属性配合使用，格式化输入项和输出项。
 - 1.2.x版本: 
   - 1.2.9 增加`footer`底部节点配置api.
   - 增加`data-name`设置，用来识别符合`value,onChange`要求的控件
   - 增加`col`布局属性，可以进行栅格布局
 - 1.0.3版本: 
   - labelWidth和labelAlign更改为labelStyle，可以自己自定义label标签相关的样式
   - 增加layout，拥有`'horizontal' | 'vertical'`两种类型。
   - 表单中关于表单变量路径规则的更改：原路径含有数组项时，举例`a.b.0`, 现在更改为`a.b[0]`。
   - 增强了`Form.Item`和`Form.List`表单域双向绑定的能力，可以递归到内部包裹的控件。
 - 0.3.8 初始版本
    

# Matters
 - 在使用之前需要先引入css样式文件，例：`import 'react-easy-formcore/lib/css/main.css'`;

# Form.Item

表单中的组件最小单元，作为一个对象的节点可以相互嵌套。

- 提供样式，以及`value`(或通过`valueProp`设置)和`onChange`双向绑定。
- 可以控件外部自定义`onChange`，但只能通过`store.setFieldValue`等实例方法设置表单值
- 可以提供表单校验规则属性`rules`，进行自定义表单校验规则。
- 当输入表单控件外面添加了非表单组件或节点，通过添加`data-type="fragment"`过滤非目标节点或设置`data-name`标记目标节点来绑定目标控件。

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
  // validator = async (value) => {
  //   if(!value) {
  //     return true
  //   }
  // }

  // 自定义校验
  validator = async (value) => {
    if (value?.length > 5) {
      return "name1字段长度超过了5";
    }
  };

  render() {
    return (
      <Form store={this.store} onSubmit={this.onSubmit}>
        <Form.Item
          label="Name1"
          name="name1"
          rules={[{ required: true, message: "name1不能为空" }, { validator: this.validator, message: "自定义校验固定提示" }]}
        >
        <div data-type="fragment">
          <Input />
        </div>
        </Form.Item>
        <Form.Item
          label="Name2"
          name="name2"
          rules={[{ required: true, message: "name2不能为空" }]}
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

## 数组管理

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

  // 使用rule里的message字段校验提示
  // validator = async (value) => {
  //   if(!value) {
  //     return true
  //   }
  // }

  // 忽略message
  validator = async (value) => {
    if (value?.length > 5) {
      return "name1字段长度超过了5";
    }
  };

  render() {
    return (
      <Form store={this.store} onSubmit={this.onSubmit}>
        <Form.List label="list" name="list">
          <Form.Item
            rules={[
              { required: true, message: "list's one不能为空" },
              { validator: this.validator, message: "自定义校验固定提示" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "list's two不能为空" }]}
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

### 默认的表单域显示组件的属性
- `className` 类名，`可选`。
- `label` 标签，`可选`。
- `labelStyle` 自定义`label`样式，`可选`。
- `labelWidth` numbr, label标签的宽度。
- `labelAlign` numbr, label标签的textAlign属性。
- `inline` boolean, 是否设置行内布局。
- `layout` `'horizontal'|'vertical'` 设置布局类型，默认值为`horizontal`。
- `colon` boolean 是否添加冒号
- `required` 是否显示星号，不包含表单校验，仅用于显示，默认值为`false`。
- `gutter` 自定义`label`标签和表单组件间的距离，`可选`。
- `compact` 是否隐藏错误信息，默认值为`false`。
- `error` 表单域显示组件的报错信息字段。
- `suffix` 后缀节点，`可选`。
- `footer` 底部节点，`可选`。

### Form Props
继承表单域显示组件(`component`)的props

- `className` 表单元素类名，`可选`。
- `store` 表单数据存储，`必须`。
- `initialValues` 表单的初始值，会被表单域的`initialValue`覆盖, 注意此值只能初始化表单赋值`可选`。
- `onSubmit` 表单提交回调，`可选`。
- `onMount` 表单渲染完毕的回调，`可选`。
- `onReset` 表单重置默认值，`可选`。
- `onFieldsChange` 表单域 onChange 变化时的事件函数，只会被控件主动`onChange`触发，不会被`store.setFieldValue`和`store.setFieldsValue`触发, 避免循环调用。`可选`。
- `onValuesChange` 监听表单值的变化。`可选`。


### Form.Item Props
继承表单域显示组件(`component`)的props

- `className` 表单域类名，`可选`。
- `component` 表单域显示组件。
- `name` 表单域字段名，`可选`。
- `valueProp` 填写到子组件的值属性名，默认值为`'value'`。
- `valueGetter` 格式化输出表单值的函数，配合`valueSetter`使用, `可选`。
- `valueSetter` 格式化输入表单值的函数，配合`valueGetter`使用, `可选`。
- `rules` 表单域的校验规则 `可选`。
- `initialValue` 表单域的初始值，注意此值和`value`不同，只能初始化表单赋值`可选`。
- `onFieldsChange` 表单域 onChange 变化时的事件函数，只会被控件主动`onChange`触发，不会被`store.setFieldValue`和`store.setFieldsValue`触发, 避免循环调用。`可选`。
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
- `message` 校验规则报错时，默认的报错信息 `可选`。
- `required` 表示控件值为必填 `可选`。
- `validator` 类型：`(value) => void | boolean` 自定义校验函数, `value`为当前控件值 `可选`。
- `pattern` 类型：`RegExp | string` 表达式校验，不符合则报错 `可选`。
- `whitespace` 类型：`boolean` 针对`string`类型, 设置true校验空格 `可选`。
- `max` 类型：`number` 表单值为string类型时字符串最大长度；number 类型时为最大值；array 类型时为数组最大长度 `可选`。
- `min` 类型：`number` 表单值为string类型时字符串最小长度；number 类型时为最小值；array 类型时为数组最小长度 `可选`。

### FormStore Methods

- `new FormStore(defaultValues)` 创建表单存储。
- `store.getFieldValue(name?: string)` 返回指定`name`的表单域的值，不指定`name`返回整个表单的值。
- `store.setFieldValue(name, value)` 更新表单域的值
- `store.setFieldsValue(obj: Partial<T>)` 设置表单域的值(覆盖)。
- `store.reset(values?: Partial<T>)` 重置表单, 可以传值重置为目标值。
- `store.validate(name?: string)` 校验表单，并返回错误信息和表单值。
- `store.getFieldError(name?: string)` 返回单个表单域的错误信息或表单所有的错误信息。

### Hooks

- `useFormStore(defaultValues)` 使用 hooks 创建 FormStore。
- `useFormError(store: FormStore, path?: string)` 使用 hooks 获取当前路径的报错信息。
- `useValidator()` hook创建 `validator`校验实例

# Contribute
感谢来自react-hero-form提供的灵感支持。