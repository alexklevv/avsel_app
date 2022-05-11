import React, {useState} from 'react';
import {Button, Col, Divider, Row} from "antd";
import ChangeProfileModal from "../../../components/Modals/ChangeProfileModal";
import ChangePasswordModal from "../../../components/Modals/ChangePasswordModal";

const Settings = () => {
    const [visible, setVisible] = useState(false);
    const [changePassModalVisible, setChangePassModalVisible] = useState(false);
    const [currentField, setCurrentField] = useState('');

    const onCreate = (values) => {
        setVisible(false);
    };

    const onCreateChangePassModal = (values) => {
        setChangePassModalVisible(false);
    };

    return (
        <div className="site-layout-content">
            <Row>
                <Col span={24}>
                    <Row justify={'space-between'} align={'middle'}>
                        <Col span={12}>Email: unicode256@yandex.by</Col>
                        <Col span={6}>
                            <Button
                                type={'primary'}
                                style={{textTransform: 'uppercase', width: '100%'}}
                                onClick={() => {
                                    setCurrentField('email');
                                    setVisible(true);
                                }}
                            >
                                change
                            </Button>
                        </Col>
                    </Row>
                    <Divider/>
                    <Row justify={'space-between'} align={'middle'}>
                        <Col span={12}>Phone number: +375447903119</Col>
                        <Col span={6}>
                            <Button
                                type={'primary'}
                                style={{textTransform: 'uppercase', width: '100%'}}
                                onClick={() => {
                                    setCurrentField('phone number');
                                    setVisible(true);
                                }}
                            >
                                change
                            </Button>
                        </Col>
                    </Row>
                    <Divider/>
                    <Row justify={'space-between'} align={'middle'}>
                        <Col span={12}>First name: Gleb</Col>
                        <Col span={6}>
                            <Button
                                type={'primary'}
                                style={{textTransform: 'uppercase', width: '100%'}}
                                onClick={() => {
                                    setCurrentField('first name');
                                    setVisible(true);
                                }}
                            >
                                change
                            </Button>
                        </Col>
                    </Row>
                    <Divider/>
                    <Row justify={'space-between'} align={'middle'}>
                        <Col span={12}>Last name: Andreev</Col>
                        <Col span={6}>
                            <Button
                                type={'primary'}
                                style={{textTransform: 'uppercase', width: '100%'}}
                                onClick={() => {
                                    setCurrentField('last name');
                                    setVisible(true);
                                }}
                            >
                                change
                            </Button>
                        </Col>
                    </Row>
                    <Divider/>
                    <Button
                        type={'primary'}
                        style={{textTransform: 'uppercase'}}
                        onClick={() => {
                            setChangePassModalVisible(true);
                        }}
                    >
                        change password
                    </Button>
                </Col>
            </Row>
            <ChangeProfileModal
                field={currentField}
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
            />
            <ChangePasswordModal
                visible={changePassModalVisible}
                onCreate={onCreateChangePassModal}
                onCancel={() => {
                    setChangePassModalVisible(false);
                }}
            />
        </div>
    );
}

export default Settings;