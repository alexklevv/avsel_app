import React from 'react';
import { Modal, Form, Input } from 'antd';

const ChangePasswordModal = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();

    return (
        <Modal
            visible={visible}
            title={`Change password`}
            okText="CHANGE"
            cancelText="CANCEL"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form.Item
                    name={'current_password'}
                    label={'Enter your current password'}
                    rules={[
                        {
                            required: true,
                            message: `Please enter your current password`,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={'new_password'}
                    label={'Enter your new password'}
                    rules={[
                        {
                            required: true,
                            message: `Please enter your new password`,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={'new_password_repeat'}
                    label={'Repeat your new password'}
                    rules={[
                        {
                            required: true,
                            message: `Please repeat your new password`,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ChangePasswordModal;
