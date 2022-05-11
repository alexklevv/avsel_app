import React from 'react';
import {Card, Col, Row, Typography} from "antd";
import {HeartFilled, StopOutlined} from "@ant-design/icons";

const {Title, Text} = Typography;

const FavoriteOffers = () => (
    <div className="site-layout-content">
        <Title level={5} style={{marginBottom: '20px'}}>2 favorite offers</Title>
        <Row gutter={[16, 24]}>
            {
                [1, 2].map((value) => {
                    const car = value === 1 ? 'BMW M5 F10' : 'Porsche 911 Turbo S (992)';
                    const cost = value === 1 ? '60 000 USD' : '98 000 USD';
                    const prob = value === 1 ? '28 000 miles' : '14 000 miles';
                    const image = value === 1
                        ? 'https://images.unsplash.com/photo-1635770310392-1b02340432ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
                        : 'https://images.unsplash.com/photo-1576289668060-47fd82c89bb6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';

                    return (
                        <Col
                            key={value}
                            className="gutter-row"
                            xs={32}
                            lg={8}
                            style={{width: '100%'}}
                        >
                            <Card
                                cover={
                                    <img
                                        alt="example"
                                        src={image}
                                        style={{width: '100%', height: '200px', objectFit: 'cover'}}
                                    />
                                }
                                actions={[
                                    <HeartFilled key={'favorite'}/>,
                                    <StopOutlined key={'stop'}/>,
                                ]}
                            >
                                <Row gutter={[0, 8]}>
                                    <Col style={{fontSize: '16px'}} span={24} className="gutter-row">
                                        <Text strong>{car}</Text>
                                    </Col>
                                    <Col style={{fontSize: '16px'}} span={24} className="gutter-row">
                                        <Text type="success">{cost}</Text>
                                    </Col>
                                    <Col style={{fontSize: '16px'}} span={24} className="gutter-row">
                                        <Text>{prob}</Text>
                                    </Col>
                                    <Col span={24} className="gutter-row">
                                        <Text type="secondary">This car is vary beautiful and...</Text>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    )
                })
            }
        </Row>
    </div>
);

export default FavoriteOffers;