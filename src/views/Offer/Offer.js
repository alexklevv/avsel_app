import React, {useEffect, useState} from 'react';
import {Button, Col, Row, Typography, Carousel, Card, message} from "antd";
import {HeartOutlined, HeartFilled, StopOutlined} from "@ant-design/icons";
import {useParams} from "react-router-dom";
import {getOffer, updateOfferStatus} from "../../redux/actions/offers";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUser} from "../../redux/actions/users";
import {addOfferToFavourites, removeOfferFromFavourites} from "../../redux/actions/account";
import offers from "../../redux/reducers/offers";

const {Title, Text} = Typography;

const Offer = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const {current} = useSelector(state => state.offers);
    const {current: currentUser} = useSelector(state => state.users);

    const [isActivateButtonDisabled, setIsActivateButtonDisabled] = useState(false);
    const [isRejectButtonDisabled, setIsRejectButtonDisabled] = useState(false);

    const [isActivationLoading, setIsActivationLoading] = useState(false);
    const [isRejectionLoading, setIsRejectionLoading] = useState(false);

    const [isFavouriteLoading, setIsFavouriteLoading] = useState(false);

    useEffect(() => {
        console.log(params);
        dispatch(getOffer(params.offerId))
            .catch(errorText => {
                message.error(errorText);
            })
        dispatch(getCurrentUser())
            .catch(errorText => {
                message.error(errorText);
            })
    }, []);

    const onActivation = () => {
        setIsActivateButtonDisabled(true);
        setIsActivationLoading(true);
        dispatch(updateOfferStatus(params.offerId, '625f04f426c20807d265ef41'))
            .then(() => {
                setIsActivationLoading(false);
                setIsRejectButtonDisabled(false);
                dispatch(getOffer(params.offerId))
                    .catch(errorText => {
                        message.error(errorText);
                    })
            })
            .catch(errorText => {
                message.error(errorText);
            });
    }

    const onRejection = () => {
        setIsRejectButtonDisabled(true);
        setIsRejectionLoading(true);
        dispatch(updateOfferStatus(params.offerId, '625f04f426c20807d265ef43'))
            .then(() => {
                setIsRejectionLoading(false);
                setIsActivateButtonDisabled(false);
                dispatch(getOffer(params.offerId))
                    .catch(errorText => {
                        message.error(errorText);
                    })
            })
            .catch(errorText => {
                message.error(errorText);
            });
    }

    const onAddToFavourite = () => {
        if(current){
            dispatch(addOfferToFavourites(current.offer['_id']));
        }
    }

    const onRemoveFromFavourites = () => {
        if(current){
            dispatch(removeOfferFromFavourites(current.offer['_id']));
        }
    }

    return (
        <div style={{backgroundColor: '#fff'}}>
            {current && <div
                style={{
                    backgroundImage: `url(http://localhost:3000/uploads/${current.offer.images.find(image => image.isCover === true)['name']})`,
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
                            {`${current.offer.mark.name} ${current.offer.model.name} ${current.offer.generation.generation}`}
                        </Title>
                    </Col>
                </Row>
            </div>
            }
            {current && <div style={{width: '86%', maxWidth: '1068px', margin: '0 auto', padding: '20px'}}>
                <Row style={{marginBottom: '20px'}}>
                    <Col span={24}>
                        <Title
                            level={4}>{`${current.offer.mark.name} ${current.offer.model.name} ${current.offer.generation.generation}`}</Title>
                    </Col>
                    <Col span={24}>
                        <Row gutter={16}>
                            <Col>
                                <Text>№{current.offer.id}</Text>
                            </Col>
                            <Col>
                                <Text>created {current.offer.createdAt}</Text>
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
                            {current.offer.images.map(image => (
                                <div>
                                    <img
                                        alt={image.name}
                                        src={`http://localhost:3000/uploads/${image.name}`}
                                        style={{height: '400px', width: '100%', objectFit: 'cover'}}
                                    />
                                </div>
                            ))}
                        </Carousel>
                        <Text>{current.offer.description}</Text>
                    </Col>
                    <Col span={8}>
                        <Row gutter={[0, 32]}>
                            <Col span={24}>
                                <Card
                                    style={{width: '100%'}}
                                    actions={[
                                        current.isFavourite ? <HeartFilled key={'favorite'} onClick={onRemoveFromFavourites}/> : <HeartOutlined onClick={onAddToFavourite} key={'favorite'}/>,
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
                                            <Text>{current.offer.seller.firstName}</Text>
                                        </Col>
                                        <Col style={{fontSize: '16px'}} span={24} className="gutter-row">
                                            <Text>{current.offer.seller.email}</Text>
                                        </Col>
                                        <Col style={{fontSize: '16px'}} span={24} className="gutter-row">
                                            <Text>{current.offer.seller.phoneNumber}</Text>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            {currentUser && currentUser.role.name_en === 'admin' && <Col span={24}>
                                <Card style={{width: '100%'}}>
                                    <Row gutter={[0, 8]}>
                                        <Col style={{fontSize: '16px', fontWeight: '500'}} span={24}
                                             className="gutter-row">
                                            <Text>Status: <Text
                                                type="success">{current.offer.status.name_en}</Text></Text>
                                        </Col>
                                        <Col
                                            style={{fontSize: '16px', fontWeight: '500'}}
                                            span={24}
                                            className="gutter-row"
                                        >
                                            <Button
                                                type={'primary'}
                                                style={{textTransform: 'uppercase', marginBottom: '12px'}}
                                                loading={isActivationLoading}
                                                disabled={isActivateButtonDisabled || current.offer.status.name_en === 'active'}
                                                onClick={onActivation}
                                            >
                                                activate
                                            </Button>
                                            <Button
                                                danger
                                                type={'primary'}
                                                style={{textTransform: 'uppercase'}}
                                                loading={isRejectionLoading}
                                                disabled={isRejectButtonDisabled || current.offer.status.name_en === 'rejected'}
                                                onClick={onRejection}
                                            >
                                                reject
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>}
                        </Row>
                    </Col>
                </Row>
            </div>}
        </div>
    );
}

export default Offer;