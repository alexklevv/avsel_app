import React, {useEffect, useRef, useState} from 'react';
import {Card, Row, Col, Typography, AutoComplete, Button, Select, Upload, message} from 'antd';
import {
    HeartOutlined,
    StopOutlined,
    SearchOutlined,
    CameraOutlined,
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    clearGenerations,
    clearModels,
    getAllOffers,
    getGenerations,
    getMarks,
    getModels
} from "../../redux/actions/offers";
import CreateСomplaintModal from "../../components/Modals/CreateСomplaintModal";

const {Text, Title} = Typography;
const {Option, OptGroup} = Select;

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

const Cars = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {marks, models, generations, list} = useSelector(state => state.offers);

    const [visibleComplaintModal, setVisibleComplaintModal] = useState(false);

    const [checkedMarkId, setCheckedMarkId] = useState(null);
    const [checkedModelId, setCheckedModelId] = useState(null);
    const [checkedGenerationId, setCheckedGenerationId] = useState(null);

    const [isMarksDisabled, setIsMarksDisabled] = useState(true);
    const [isModelsDisabled, setIsModelsDisabled] = useState(true);
    const [isGenerationsDisabled, setIsGenerationsDisabled] = useState(true);

    const [isSearchByImageLoading, setIsSearchByImageLoading] = useState(false);

    let [searchParams, setSearchParams] = useSearchParams();
    let markIdQueryParam = searchParams.get('markId');
    let modelIdQueryParam = searchParams.get('modelId');
    let generationIdQueryParam = searchParams.get('generationId');

    const onMarkChange = (value) => {
        setCheckedMarkId(value);
        setCheckedModelId(null);
        setCheckedGenerationId(null);
        setIsModelsDisabled(true);
        setIsGenerationsDisabled(true);
        if(value){
            dispatch(getModels(value)).then(() => {
                setIsModelsDisabled(false);
            });
        }
    }

    const onModelChange = (value) => {
        setCheckedModelId(value);
        setCheckedGenerationId(null);
        setIsGenerationsDisabled(true);
        dispatch(getGenerations(checkedMarkId, value)).then(() => {
            setIsGenerationsDisabled(false);
        });
    }

    const onGenerationChange = (value) => {
        setCheckedGenerationId(value);
    }

    const onSearch = () => {
        const searchQueryParams = {};
        if(checkedMarkId){
            searchQueryParams.markId = checkedMarkId;
        }
        if(checkedModelId){
            searchQueryParams.modelId = checkedModelId;
        }
        if(checkedGenerationId){
            searchQueryParams.generationId = checkedGenerationId;
        }
        setSearchParams(searchQueryParams);
    }

    const onCreate = (values) => {
        setVisibleComplaintModal(false);
    };

    const handleChangeImageForSearch = info => {
        if (info.file.status === 'uploading') {
            setIsSearchByImageLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            setIsSearchByImageLoading(false);
            setCheckedMarkId(null);
            setCheckedModelId(null);
            setCheckedGenerationId(null);
            setIsModelsDisabled(true);
            setIsGenerationsDisabled(true);
            const matchedMarks = marks.filter(mark => {
                if(mark.name.toUpperCase().indexOf(info.file.response.car.mark.toUpperCase()) !== -1){
                    return true;
                }
            });
            if(matchedMarks.length){
                setCheckedMarkId(matchedMarks[0].id);
                dispatch(getModels(matchedMarks[0].id))
                    .then(models => {
                        setIsModelsDisabled(false);
                        const matchedModels = models.filter(model => {
                            if(model.name.toUpperCase().indexOf(info.file.response.car.model.toUpperCase()) !== -1){
                                return true;
                            }
                        });
                        if(matchedModels.length){
                            setCheckedModelId(matchedModels[0].id);
                            dispatch(getGenerations(matchedMarks[0].id, matchedModels[0].id)).then(() => {
                                setIsGenerationsDisabled(false);
                            });
                        }
                        else {
                            message.error('could not recognize model on image');
                        }
                    })
                    .catch(errorText => {
                        message.error(errorText);
                    });
            }
            else {
                message.error('could not recognize mark on image');
            }
        }
    };

    useEffect(() => {
        dispatch(getMarks())
            .then(() => {
                setIsMarksDisabled(false);
            });
        dispatch(getAllOffers({
            markId: markIdQueryParam,
            modelId: modelIdQueryParam,
            generationId: generationIdQueryParam
        }))
            .catch((errorText) => {
                message.error(errorText);
            });
    }, [markIdQueryParam, modelIdQueryParam, generationIdQueryParam]);

    return (
        <div style={{backgroundColor: '#fff'}}>
            <div>
                <Row
                    style={{
                        backgroundImage: `url(/cars.png)`,
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
                                <Select
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Mark"
                                    disabled={isMarksDisabled}
                                    showSearch={true}
                                    allowClear={true}
                                    value={checkedMarkId}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().includes(input.toLowerCase())
                                    }
                                    onChange={onMarkChange}
                                >
                                    {marks && marks.map((item) => (
                                        <Option value={item.id}>{item.name}</Option>
                                    ))}
                                </Select>
                            </Col>
                            <Col xs={24} lg={6}>
                                <Select
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Model"
                                    disabled={isModelsDisabled}
                                    showSearch={true}
                                    value={checkedModelId}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().includes(input.toLowerCase())
                                    }
                                    onChange={onModelChange}
                                >
                                    {models && models.map((item) => (
                                        <Option value={item.id}>{item.name}</Option>
                                    ))}
                                </Select>
                            </Col>
                            <Col xs={24} lg={6}>
                                <Select
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Generation"
                                    disabled={isGenerationsDisabled}
                                    showSearch={true}
                                    value={checkedGenerationId}
                                    onChange={onGenerationChange}
                                >
                                    {generations && generations.map((item) => (
                                        <Option value={item.id}>{item.generation}</Option>
                                    ))}
                                </Select>
                            </Col>
                            <Col xs={24} lg={3}>
                                <Button
                                    style={{textTransform: 'uppercase', width: '100%'}}
                                    type="primary"
                                    icon={<SearchOutlined/>}
                                    onClick={onSearch}
                                />
                            </Col>
                            <Col xs={24} lg={3}>
                                <Upload
                                    name={'image'}
                                    action="http://localhost:3000/images/recognize"
                                    beforeUpload={beforeUpload}
                                    onChange={handleChangeImageForSearch}
                                >
                                    <Button
                                        style={{textTransform: 'uppercase', width: '100%'}}
                                        type="primary"
                                        icon={<CameraOutlined/>}
                                    />
                                </Upload>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            <div style={{width: '86%', maxWidth: '1068px', margin: '0 auto', padding: '20px'}}>
                <Row justify={'space-between'} align={'middle'} style={{marginBottom: '20px'}}>
                    <Col span={12}>
                        <Title level={4} style={{margin: 0}}>offers found: {list ? list.length : '0'}</Title>
                    </Col>
                    <Col span={6}>
                        <Select defaultValue="Recent first" style={{width: '100%'}}>
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
                    {list && list.length && list.map((offer) => {
                        return (
                            <Col
                                key={offer.id}
                                className="gutter-row"
                                xs={32}
                                lg={8}
                                style={{width: '100%'}}
                            >
                                <Card
                                    cover={
                                        <img
                                            alt="example"
                                            src={`http://localhost:3000/uploads/${offer.images[0]['name']}`}
                                            style={{width: '100%', height: '200px', objectFit: 'cover', cursor: 'pointer'}}
                                            onClick={() => navigate(`/cars/${offer.id}`)}
                                        />
                                    }
                                >
                                    <Row gutter={[0, 8]}>
                                        <Col style={{fontSize: '16px'}} span={24} className="gutter-row">
                                            <Text strong>
                                                {`${offer.mark.name} ${offer.model.name} ${offer.generation.generation}`}
                                            </Text>
                                        </Col>
                                        <Col style={{fontSize: '16px'}} span={24} className="gutter-row">
                                            <Text type="success">120000 USD</Text>
                                        </Col>
                                        <Col style={{fontSize: '16px'}} span={24} className="gutter-row">
                                            <Text>60000 miles</Text>
                                        </Col>
                                        <Col span={24} className="gutter-row">
                                            <Text type="secondary">{offer.description}</Text>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </div>
            <CreateСomplaintModal
                visible={visibleComplaintModal}
                onCreate={onCreate}
                onCancel={() => {
                    setVisibleComplaintModal(false);
                }}
            />
        </div>
    );
}

export default Cars;