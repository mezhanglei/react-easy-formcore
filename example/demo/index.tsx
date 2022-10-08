import React from 'react';
import "./index.less";
import { Form, FormStore } from '../../src/index';


class demo extends React.Component {
  constructor(props) {
    super(props);
    this.store = new FormStore();
    this.state = {
    };
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const { error, values } = await this.store.validate();
    console.log(error, values, 'error ang values');
  };

  validator = (value) => {
    if (value?.length < 2) {
      return 'length is < 2';
    }
  }

  render() {
    return (
      <Form initialValues={{ name1: 1111 }} store={this.store} onSubmit={this.onSubmit}>
        <Form.Item label="Name1" name="name1" required rules={[{ required: true, message: 'name1 is Empty' }, { validator: this.validator, message: '自定义校验' }]}>
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
  }
}

export default demo;