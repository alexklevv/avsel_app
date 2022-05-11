import React from 'react';
import {Form, Input, Button, Checkbox, Col, Row, Typography} from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const {Title} = Typography;

const Login = () => (
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
        <Col span={6}>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox style={{color: '#fff'}}>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%', marginBottom: '16px'}}>
                        Log in
                    </Button>
                    <span style={{color: '#fff'}}>Or </span>
                    <a href={'/registration'}>register now!</a>
                </Form.Item>
            </Form>
        </Col>
    </Row>
);

export default Login;