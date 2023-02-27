import React from 'react';
import {Button, Checkbox, Col, Form, Input, Row} from "antd";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const Registration = () => {
    const [form] = Form.useForm();

    return (
        <Row
            style={{
                backgroundImage: 'url(https://lh3.google.com/u/0/d/1Pj5yl-jWsQL_QiggpL5rJbA1l6BF7xka=w1400-h800-iv1)',
                height: 'calc(100vh - 64px)',
                textAlign: 'center',
                backgroundSize: 'cover',
                backgroundPositionX: 'center',
                backgroundPositionY: 'center',
                backgroundRepeat: 'no-repeat',
            }}
            align={'middle'}
            justify={'center'}
        >
            <Col span={10}>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    scrollToFirstError
                >
                    <Form.Item
                        name="email"
                        label={<label style={{color: '#fff'}}>E-mail</label>}
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="phoneNumber"
                        label={<label style={{color: '#fff'}}>Phone number</label>}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="firstName"
                        label={<label style={{color: '#fff'}}>First name</label>}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your first name',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="lastName"
                        label={<label style={{color: '#fff'}}>Last name</label>}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your last name',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label={<label style={{color: '#fff'}}>Password</label>}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label={<label style={{color: '#fff'}}>Confirm Password</label>}
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password',
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Passwords that you entered do not match'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                            },
                        ]}
                        {...tailFormItemLayout}
                    >
                        <Checkbox style={{color: '#fff'}}>
                            I have read the <a href="">agreement</a>
                        </Checkbox>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}

export default Registration;