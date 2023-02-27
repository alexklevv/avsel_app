import React, {useEffect} from 'react';
import {Card, Col, message, Row, Typography} from "antd";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getFavouriteOffers, getOffers} from "../../../redux/actions/account";

const {Title, Text} = Typography;

const FavoriteOffers = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {favourites} = useSelector(state => state.account);
    const {isAuthenticated} = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(getFavouriteOffers())
            .catch(errorText => {
                message.error(errorText);
            });
    }, []);

    return (
    <div className="site-layout-content">
        <Title level={5} style={{marginBottom: '20px'}}>Favorite offers: {favourites ? favourites.length : ''}</Title>
        <Row gutter={[16, 24]}>
            {favourites && favourites.map((object) => {
                return (
                    <Col
                        key={object.offer.id}
                        className="gutter-row"
                        xs={32}
                        lg={8}
                        style={{width: '100%'}}
                    >
                        <Card
                            cover={
                                <img
                                    alt="example"
                                    src={`http://localhost:3000/uploads/${object.offer.images[0]['name']}`}
                                    style={{width: '100%', height: '200px', objectFit: 'cover', cursor: 'pointer'}}
                                    onClick={() => navigate(`/cars/${object.offer.id}`)}
                                />
                            }
                        >
                            <Row gutter={[0, 8]}>
                                <Col style={{fontSize: '16px'}} span={24} className="gutter-row">
                                    <Text strong>
                                        {`${object.offer.mark.name} ${object.offer.model.name} ${object.offer.generation.generation}`}
                                    </Text>
                                </Col>
                                <Col style={{fontSize: '16px'}} span={24} className="gutter-row">
                                    <Text type="success">120000 USD</Text>
                                </Col>
                                <Col style={{fontSize: '16px'}} span={24} className="gutter-row">
                                    <Text>60000 miles</Text>
                                </Col>
                                <Col span={24} className="gutter-row">
                                    <Text type="secondary">{object.offer.description}</Text>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                )
            })}
        </Row>
    </div>
)};

export default FavoriteOffers;