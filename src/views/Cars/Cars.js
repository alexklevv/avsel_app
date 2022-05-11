import React from 'react';
import {Card, Row, Col, Typography, AutoComplete, Button, Select, Upload} from 'antd';
import {
    HeartOutlined,
    StopOutlined,
    SearchOutlined,
    CameraOutlined,
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
import styles from './Cars.css';

const {Text, Link, Title} = Typography;
const {Meta} = Card;
const { Option, OptGroup } = Select;

const options = [
    {
        value: 'Burns Bay Road',
    },
    {
        value: 'Downing Street',
    },
    {
        value: 'Wall Street',
    },
];

const Cars = () => {
    const navigate = useNavigate();

    return (
        <div style={{backgroundColor: '#fff'}}>
            <div>
                <Row
                    style={{
                        backgroundImage: 'url(https://lh3.google.com/u/0/d/12QZlBIseNOgiQAaafPam9hjn3bLKH6t0=w1400-h800-iv1)',
                        padding: '200px 6% 140px 6%',
                        backgroundSize: 'cover',
                        backgroundPositionX: 'center',
                        backgroundPositionY: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                    justify={'center'}
                >
                    <Col span={24} style={{marginBottom: '40px'}}>
                        <Title
                            level={1}
                            style={{color: '#fff', textTransform: 'uppercase', textAlign: 'center'}}
                        >
                            search available offers
                        </Title>
                    </Col>
                    <Col span={16}>
                        <Row gutter={[16, 24]}>
                            <Col xs={24} lg={6}>
                                <AutoComplete
                                    style={{
                                        width: '100%',
                                    }}
                                    options={options}
                                    placeholder="Mark"
                                    filterOption={(inputValue, option) =>
                                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                />
                            </Col>
                            <Col xs={24} lg={6}>
                                <AutoComplete
                                    style={{
                                        width: '100%',
                                    }}
                                    options={options}
                                    placeholder="Model"
                                    filterOption={(inputValue, option) =>
                                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                />
                            </Col>
                            <Col xs={24} lg={6}>
                                <AutoComplete
                                    style={{
                                        width: '100%',
                                    }}
                                    options={options}
                                    placeholder="Generation"
                                    filterOption={(inputValue, option) =>
                                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                />
                            </Col>
                            <Col xs={24} lg={3}>
                                <Button style={{textTransform: 'uppercase', width: '100%'}} type="primary" icon={<SearchOutlined />}/>
                            </Col>
                            <Col xs={24} lg={3}>
                                <Upload style={styles}>
                                    <Button style={{textTransform: 'uppercase', width: '100%'}} type="primary" icon={<CameraOutlined />}/>
                                </Upload>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            <div style={{width: '86%', maxWidth: '1068px', margin: '0 auto', padding: '20px'}}>
                <Row justify={'space-between'} align={'middle'} style={{marginBottom: '20px'}}>
                    <Col span={12}>
                        <Title level={4} style={{margin: 0}}>10 000 offers found</Title>
                    </Col>
                    <Col span={6}>
                        <Select defaultValue="Recent first" style={{ width: '100%' }}>
                            <OptGroup label="By price">
                                <Option value="Inexpensive first">Inexpensive first</Option>
                                <Option value="Expensive first">Expensive first</Option>
                            </OptGroup>
                            <OptGroup label="By creation date">
                                <Option value="Recent first">Recent first</Option>
                                <Option value="Old first">Old first</Option>
                            </OptGroup>
                        </Select>
                    </Col>
                </Row>
                <Row gutter={[16, 24]}>
                    <Col
                        key={0}
                        className="gutter-row"
                        sm={32}
                        lg={8}
                        style={{width: '100%'}}
                    >
                        <Card
                            cover={
                                <img
                                    alt="example"
                                    src="https://images.unsplash.com/photo-1629019879059-2a0345f93aea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                                    style={{width: '100%', height: '200px', objectFit: 'cover', cursor: 'pointer'}}
                                    onClick={() => navigate('/cars/11')}
                                />
                            }
                            actions={[
                                <HeartOutlined key={'favorite'}/>,
                                <StopOutlined key={'stop'}/>,
                            ]}
                        >
                            <Row gutter={[0, 8]}>
                                <Col style={{fontSize: '16px'}} span={24} className="gutter-row">
                                    <Text strong>Mercedes-Benz S63 AMG W223</Text>
                                </Col>
                                <Col style={{fontSize: '16px'}} span={24} className="gutter-row">
                                    <Text type="success">45 000 USD</Text>
                                </Col>
                                <Col style={{fontSize: '16px'}} span={24} className="gutter-row">
                                    <Text>30 000 miles</Text>
                                </Col>
                                <Col span={24} className="gutter-row">
                                    <Text type="secondary">This is the description</Text>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Cars;