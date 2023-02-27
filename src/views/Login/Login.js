import React, {useState} from 'react';
import {Form, Input, Button, Checkbox, Col, Row, Typography, message} from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/actions/auth";
import {useNavigate} from "react-router-dom";

const {Title} = Typography;

const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const onFinish = (values) => {
        setIsLoading(true);
        dispatch(login({email: values.email, password: values.password}))
            .then(() => {
                navigate('/profile/settings');
                message.success('successfully logged in');

            })
            .catch((errorText) => {
                setIsLoading(false);
                message.error(errorText);
            })
    };

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
            <Col span={6}>
                <Form
                    name="login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password',
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
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            style={{width: '100%', marginBottom: '16px'}}
                            loading={isLoading}
                        >
                            Log in
                        </Button>
                        <span style={{color: '#fff'}}>Or </span>
                        <a href={'/registration'}>register now!</a>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}

export default Login;