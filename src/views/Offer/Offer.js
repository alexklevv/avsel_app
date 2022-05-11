import React, {useState} from 'react';
import {AutoComplete, Button, Col, Row, Typography, Carousel, Card} from "antd";
import {HeartOutlined, StopOutlined} from "@ant-design/icons";

const {Title, Text} = Typography;

const Offer = () => {

    return (
        <div style={{backgroundColor: '#fff'}}>
            <div
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1610099610040-ab19f3a5ec35?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80)',
                    backgroundSize: 'cover',
                    backgroundPositionX: 'center',
                    backgroundPositionY: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <Row
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        padding: '200px 6% 140px 6%',
                    }}
                    justify={'center'}
                >
                    <Col span={24} style={{marginBottom: '40px'}}>
                        <Title
                            level={1}
                            style={{color: '#fff', textTransform: 'uppercase', textAlign: 'center'}}
                        >
                            Mercedes-Benz S63 AMG W223 (2020 - 2022)
                        </Title>
                    </Col>
                </Row>
            </div>
            <div style={{width: '86%', maxWidth: '1068px', margin: '0 auto', padding: '20px'}}>
                <Row style={{marginBottom: '20px'}}>
                    <Col span={24}>
                        <Title level={4}>Mercedes-Benz S63 AMG W223</Title>
                    </Col>
                    <Col span={24}>
                        <Row gutter={16}>
                            <Col>
                                <Text>№23</Text>
                            </Col>
                            <Col>
                                <Text>created 12.04.2022</Text>
                            </Col>
                            <Col>
                                <Text>11 views</Text>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row gutter={32}>
                    <Col span={16}>
                        <Carousel autoplay arrows style={{marginBottom: '20px'}}>
                            <div>
                            <img
                                alt="example"
                                src="https://images.unsplash.com/photo-1619221496652-7ee3d7406203?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80"
                                style={{height: '400px', width: '100%', objectFit: 'cover'}}
                            />
                            </div>
                            <div>
                            <img
                                alt="example"
                                src="https://images.unsplash.com/photo-1629019879059-2a0345f93aea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                                style={{height: '400px', width: '100%', objectFit: 'cover'}}
                            />
                            </div>
                            <div>
                            <img
                                alt="example"
                                src="https://images.unsplash.com/photo-1629019878224-7fe58daab3c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                                style={{height: '400px', width: '100%', objectFit: 'cover'}}
                            />
                            </div>
                            <div>
                            <img
                                alt="example"
                                src="https://images.unsplash.com/photo-1629019878898-77222937b153?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                                style={{height: '400px', width: '100%', objectFit: 'cover'}}
                            />
                            </div>
                        </Carousel>
                        <Text>Sell w222 restyling with low original mileage.
                            With an updated OM656 engine for 340 horses and just hurricane dynamics (which is
                            fundamentally different from OM642 3.0 diesel).
                            I am the 2nd owner (1st owner of Mercedes Benz Rus), for the entire period of operation
                            there was not a single accident, according to CASCO, the windshield was changed once and the
                            rear right door was painted (there is nothing else painted on the car).
                            I always looked after the car both technically and aesthetically, until recently the car was
                            almost completely covered with armor film (so there are no chips or scratches), when
                            dismantling the film, the body was completely polished and covered with Nxtzen ceramic with
                            Graphene additive (car shines like new, due to the hydrophobic property it gets less dirty
                            in bad weather).</Text>
                    </Col>
                    <Col span={8}>
                        <Row gutter={[0, 32]}>
                            <Col span={24}>
                                <Card
                                    style={{width: '100%'}}
                                    actions={[
                                        <HeartOutlined key={'favorite'}/>,
                                        <StopOutlined key={'stop'}/>,
                                    ]}
                                >
                                    <Row gutter={[0, 8]}>
                                        <Col style={{fontSize: '16px', fontWeight: '500'}} span={24}
                                             className="gutter-row">
                                            <Text type="success">60 000 USD</Text>
                                        </Col>
                                        <Col style={{fontSize: '16px', fontWeight: '500'}} span={24}
                                             className="gutter-row">
                                            <Text>30 000 miles</Text>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col span={24}>
                                <Card style={{width: '100%'}}>
                                    <Row gutter={[0, 8]}>
                                        <Col style={{fontSize: '16px', fontWeight: '500', marginBottom: '20px'}}
                                             span={24} className="gutter-row">
                                            <Text>Vladimir</Text>
                                        </Col>
                                        <Col style={{fontSize: '16px'}} span={24} className="gutter-row">
                                            <Text>vladimirm12@gmail.com</Text>
                                        </Col>
                                        <Col style={{fontSize: '16px'}} span={24} className="gutter-row">
                                            <Text>+375447654577</Text>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>

        </div>
    );
}

export default Offer;