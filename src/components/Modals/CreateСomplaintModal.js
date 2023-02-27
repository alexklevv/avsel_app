import React from 'react';
import { Modal, Form, Input } from 'antd';
const { TextArea } = Input;

const ucFirst = (str) => {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
}

const CreateComplaintModal = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title={`Please describe your claim in detail`}
            okText="SEND"
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
                    name={'description'}
                    rules={[
                        {
                            required: true,
                            message: 'Please describe your claim',
                        },
                    ]}
                >
                    <TextArea rows={4} placeholder={'Your complaint'}/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateComplaintModal;
