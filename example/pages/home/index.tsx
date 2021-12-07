import React from 'react';
import "./index.less";
import { Form, FormStore } from '../../../src/index';


class demo extends React.Component {
    constructor(props) {
        super(props);
        this.store = new FormStore();
        this.state = {
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const { error, values } = await this.store.validate();
        console.log(error, values, 'error ang values');
    };

    validator = (value, callError) => {
        if (value?.length < 2) {
            callError('length is < 2');
        }
        callError();
    }

    render() {
        return (
            <Form store={this.store} onSubmit={this.onSubmit}>
                <Form.Item label="Name1" name="name1" rules={[{ required: true, message: 'name1 is Empty' }, { validator: this.validator, message: '自定义校验' }]}>
                    <input />
                </Form.Item>
                <Form.Item label="Name2" name="name2" rules={[{ required: true, message: 'name2 is empty' }]}>
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