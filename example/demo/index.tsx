import React from 'react';
import "./index.less";
import { Form, FormStore, useFormStore, useFormValues } from '../../src/index';

export default function Demo() {

  const store = useFormStore();

  const onSubmit = async (e) => {
    e.preventDefault();
    const { error, values } = await store.validate();
    console.log(error, values, 'error ang values');
  };

  const validator = async (value) => {
    if (value?.length < 2) {
      return 'length is < 2';
    }
  }

  const formvalues = useFormValues(store, ['name1', 'name2'])
  console.log(formvalues, '监听表单值变化')
  return (
    <Form initialValues={{ name1: 1111 }} store={store} onSubmit={onSubmit}>
      <Form.Item label="Name1" name="name1" required rules={[{ required: true, message: 'name1 is Empty' }, { validator: validator, message: '自定义校验' }]}>
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