import React from 'react';
import {Typography, Button, Row, Col} from 'antd';
import {useNavigate} from "react-router-dom";

const {Title} = Typography;

const Home = () => {
    const navigate = useNavigate();

    return (
        <Row
            style={{
                backgroundImage: 'url(/main.png)',
                height: 'calc(100vh - 64px)',
                textTransform: 'uppercase',
                textAlign: 'center',
                backgroundSize: 'cover',
                backgroundPositionX: 'center',
                backgroundPositionY: 'center',
                backgroundRepeat: 'no-repeat',
            }}
            align={'middle'}
        >
            <Col span={24}>
                <Title style={{color: '#fff'}}>used and new cars</Title>
                <Title style={{color: '#fff'}} level={2}>convenient car sales</Title>
                <Title level={2} style={{marginBottom: '60px', color: '#fff'}}>convenient search for offers</Title>
                <Row gutter={[16, 24]} justify={'center'}>
                    <Col xs={20} sm={10} md={6}>
                        <Button
                            type={'primary'}
                            style={{width: '100%', textTransform: 'uppercase'}}
                            onClick={() => navigate('/cars/add')}
                        >
                            create offer
                        </Button>
                    </Col>
                    <Col xs={20} sm={10} md={6}>
                        <Button
                            type={'primary'}
                            style={{width: '100%', textTransform: 'uppercase'}}
                            ghost
                            onClick={() => navigate('/cars')}
                        >
                            search offers
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default Home;