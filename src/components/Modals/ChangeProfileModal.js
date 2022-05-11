import React from 'react';
import { Modal, Form, Input } from 'antd';

const ucFirst = (str) => {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
}

const ChangeProfileModal = ({ visible, onCreate, onCancel, field }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title={`Change ${field}`}
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
                    name={field}
                    label={ucFirst(field)}
                    rules={[
                        {
                            required: true,
                            message: `Please input ${field}`,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ChangeProfileModal;
