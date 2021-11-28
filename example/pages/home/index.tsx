import React, { Component, useState, useEffect, useRef } from 'react';
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
            callError('主动报错');
        }
        callError();
    }

    render() {
        return (
            <Form store={this.store} onSubmit={this.onSubmit}>
                <Form.Field label="Name1" name="name1" rules={[{ required: true, message: 'Name1 is Empty' }, { validator: this.validator, message: '自定义校验' }]}>
                    <input />
                </Form.Field>
                <Form.Field label="Name2" name="name2" rules={[{ required: true, message: 'Name2 is empty' }]}>
                    <input />
                </Form.Field>
                <Form.Field label="">
                    <button>Submit</button>
                </Form.Field>
            </Form>
        );
    }
}

export default demo;