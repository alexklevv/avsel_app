import React from 'react';
import {Button, Card, Col, Divider, Row, Typography, Input} from "antd";

const {Title, Text} = Typography;
const {Search} = Input;

const Users = () => {
    return (
        <div className="site-layout-content">
            <Title level={5} style={{marginBottom: '20px'}}>3 users</Title>
            <Search placeholder="input phone number" enterButton style={{marginBottom: '24px'}}/>
            <Row gutter={[16, 24]}>
                <Col
                    key={1}
                    className="gutter-row"
                    xs={32}
                    lg={8}
                    style={{width: '100%'}}
                >
                    <Card>
                        <Row gutter={[0, 8]}>
                            <Col style={{fontSize: '16px'}} span={24} className="gutter-row">
                                <Text strong>Vladimir Malich</Text>
                            </Col>
                            <Col style={{fontSize: '16px'}} span={24} className="gutter-row">
                                <Text type="success">+375447654577</Text>
                            </Col>
                            <Col style={{fontSize: '16px'}} span={24} className="gutter-row">
                                <Text>vladimirm12@gmail.com</Text>
                            </Col>
                            <Divider/>
                            <Button
                                type={'primary'}
                                style={{textTransform: 'uppercase', width: '100%', marginBottom: '4px'}}
                            >
                                make verified
                            </Button>
                            <Button
                                type={'primary'}
                                style={{textTransform: 'uppercase', width: '100%', marginBottom: '4px'}}
                            >
                                make admin
                            </Button>
                            <Button
                                type={'primary'}
                                style={{textTransform: 'uppercase', width: '100%'}}
                                danger={true}
                            >
                                block user
                            </Button>
                        </Row>
                    </Card>
                </Col>
                <Col
                    key={1}
                    className="gutter-row"
                    xs={32}
                    lg={8}
                    style={{width: '100%'}}
                >
                    <Card>
                        <Row gutter={[0, 8]}>
                            <Col style={{fontSize: '16px'}} span={24} className="gutter-row">
                                <Text strong>Gleb Andreev</Text>
                            </Col>
                            <Col style={{fontSize: '16px'}} span={24} className="gutter-row">
                                <Text type="success">+375443333333</Text>
                            </Col>
                            <Col style={{fontSize: '16px'}} span={24} className="gutter-row">
                                <Text>andreev.gs12@yandex.by</Text>
                            </Col>
                            <Divider/>
                            <Button
                                type={'primary'}
                                style={{textTransform: 'uppercase', width: '100%', marginBottom: '4px'}}
                                disabled={true}
                            >
                                make verified
                            </Button>
                            <Button
                                type={'primary'}
                                style={{textTransform: 'uppercase', width: '100%', marginBottom: '4px'}}
                                disabled={true}
                            >
                                make admin
                            </Button>
                            <Button
                                type={'primary'}
                                style={{textTransform: 'uppercase', width: '100%'}}
                                danger={true}
                                disabled={true}
                            >
                                block user
                            </Button>
                        </Row>
                    </Card>
                </Col>
                <Col
                    key={1}
                    className="gutter-row"
                    xs={32}
                    lg={8}
                    style={{width: '100%'}}
                >
                    <Card>
                        <Row gutter={[0, 8]}>
                            <Col style={{fontSize: '16px'}} span={24} className="gutter-row">
                                <Text strong>Lena Kaminskaya</Text>
                            </Col>
                            <Col style={{fontSize: '16px'}} span={24} className="gutter-row">
                                <Text type="success">+375447777777</Text>
                            </Col>
                            <Col style={{fontSize: '16px'}} span={24} className="gutter-row">
                                <Text>lena1234@gmail.com</Text>
                            </Col>
                            <Divider/>
                            <Button
                                type={'primary'}
                                style={{textTransform: 'uppercase', width: '100%', marginBottom: '4px'}}
                            >
                                make verified
                            </Button>
                            <Button
                                type={'primary'}
                                style={{textTransform: 'uppercase', width: '100%', marginBottom: '4px'}}
                            >
                                make admin
                            </Button>
                            <Button
                                type={'primary'}
                                style={{textTransform: 'uppercase', width: '100%'}}
                                danger={true}
                            >
                                block user
                            </Button>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    )
};

export default Users;