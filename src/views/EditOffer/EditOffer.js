import React, {useEffect, useState} from "react";
import {AutoComplete, Button, Form, Input, message, Modal, Steps, Typography, Upload} from "antd";
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {
    createOffer,
    deleteFromGallery, editOffer,
    getCoverImage,
    getGallery,
    getGenerations,
    getMainImage,
    getMarks,
    getModels,
    setGallery
} from "../../redux/actions/offers";
import authHeader from "../../redux/services/AuthHeader";
import {useParams} from "react-router-dom";

const {Title} = Typography;
const {TextArea} = Input;
const {Step} = Steps;

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function getGalleryBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

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

const EditOffer = () => {
    const [form] = Form.useForm();
    const params = useParams();
    const dispatch = useDispatch();
    const {marks, models, generations, gallery, current: offer} = useSelector(state => state.offers);

    const [current, setCurrent] = useState(0);

    const [mainImageLoading, setMainImageLoading] = useState(false);
    const [coverImageLoading, setCoverImageLoading] = useState(false);

    const [isPreviewVisible, setIsPreviewVisibleGallery] = useState(false);
    const [isMainImageDisabled, setIsMainImageDisabled] = useState(true);
    const [isCoverImageDisabled, setIsCoverImageDisabled] = useState(true);
    const [isGalleryDisabled, setIsGalleryDisabled] = useState(true);

    const [isMarksDisabled, setIsMarksDisabled] = useState(true);
    const [isModelsDisabled, setIsModelsDisabled] = useState(true);
    const [isGenerationsDisabled, setIsGenerationsDisabled] = useState(true);

    const [mainImageUrl, setMainImageUrl] = useState('');
    const [coverImageUrl, setCoverImageUrl] = useState('');

    const [previewImageGallery, setPreviewImageGallery] = useState('');
    const [previewTitleGallery, setPreviewTitleGallery] = useState('');

    const [checkedMarkId, setCheckedMarkId] = useState('');
    const [checkedModelId, setCheckedModelId] = useState('');
    const [checkedGenerationId, setCheckedGenerationId] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log(params);
        dispatch(getMainImage(params.offerId))
            .then((url) => {
                setMainImageUrl(url);
                setIsMainImageDisabled(false);
            })
            .catch((errorText) => {
                message.error(errorText);
            });
        dispatch(getCoverImage(params.offerId))
            .then((url) => {
                setCoverImageUrl(url);
                setIsCoverImageDisabled(false);
            })
            .catch((errorText) => {
                message.error(errorText);
            });
        dispatch(getGallery(params.offerId))
            .then(() => {
                setIsGalleryDisabled(false);
            })
            .catch((errorText) => {
                message.error(errorText);
            });
        dispatch(getMarks())
            .then(() => {
                setIsMarksDisabled(false);
            })
    }, []);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const onSelectMark = (_, markData) => {
        setIsModelsDisabled(true);
        setIsGenerationsDisabled(true);
        dispatch(getModels(markData.id)).then(() => {
            setCheckedMarkId(markData.id);
            setIsModelsDisabled(false);
        })
        console.log(markData);
    }

    const onSelectModel = (_, modelData) => {
        setIsGenerationsDisabled(true);
        dispatch(getGenerations(checkedMarkId, modelData.id)).then(() => {
            setCheckedModelId(modelData.id);
            setIsGenerationsDisabled(false);
        })
        console.log(modelData);
    }

    const onSelectGeneration = (_, generationData) => {
        setCheckedGenerationId(generationData.id);
        console.log(generationData);
    }

    const onSendingToModeration = (values) => {
        setIsLoading(true);
        const newOfferData = values;
        delete newOfferData.mark;
        delete newOfferData.model;
        delete newOfferData.generation;

        newOfferData['markId'] = checkedMarkId;
        newOfferData['modelId'] = checkedModelId;
        newOfferData['generationId'] = checkedGenerationId;

        dispatch(editOffer(newOfferData, params.offerId))
            .then(() => {
                message.success('offer successfully created');
            })
            .catch(errorText => {
                setIsLoading(false);
                message.error(errorText);
            })
        console.log(newOfferData);
    }

    const uploadButtonMainImage = (
        <div>
            {mainImageLoading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div style={{marginTop: 8}}>Upload</div>
        </div>
    );

    const uploadButtonCoverImage = (
        <div>
            {coverImageLoading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div style={{marginTop: 8}}>Upload</div>
        </div>
    );

    const uploadButtonGallery = (
        <div>
            <PlusOutlined/>
            <div style={{marginTop: 8}}>Upload</div>
        </div>
    );

    const handleChangeMainImage = info => {
        if (info.file.status === 'uploading') {
            setMainImageLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                setMainImageUrl(imageUrl);
                setMainImageLoading(false);
            });
        }
    };

    const handleChangeCoverImage = info => {
        if (info.file.status === 'uploading') {
            setCoverImageLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                setCoverImageUrl(imageUrl);
                setCoverImageLoading(false);
            });
        }
    };

    const handleCancelGallery = () => setIsPreviewVisibleGallery(false);
    const handleChangeGallery = (info) => {
        let fileList = [...info.fileList];
        dispatch(setGallery(fileList));
        if (info.file.status === 'uploading') {
            console.log('uploading', info);
        }
        if (info.file.status === 'done') {
            info.fileList.pop();
            info.fileList.push({
                uid: info.file.response.image['_id'],
                name: info.file.response.image.name,
                status: 'done',
                url: `http://localhost:3000/uploads/${info.file.response.image.name}`
            });
            dispatch(setGallery(info.fileList));
            console.log('done', info);
        }
    };

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getGalleryBase64(file.originFileObj);
        }
        setPreviewImageGallery(file.url || file.preview);
        setIsPreviewVisibleGallery(true);
        setPreviewTitleGallery(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleRemoveFromGallery = (image) => {
        dispatch(deleteFromGallery(image, params.offerId))
            .catch((errorText) => {
                message.error(errorText);
            });
    }

    return (
        <div style={{padding: '30px 20% 0 20%', backgroundColor: '#fff'}}>
            <Title level={3} style={{marginBottom: '50px'}}>Change your offer</Title>
            <Steps current={current} style={{marginBottom: '30px'}}>
                <Step key={'Change main image'} title={'Change main image'}/>
                <Step key={'Change cover image'} title={'Change cover image'}/>
                <Step key={'Change gallery'} title={'Change gallery'}/>
                <Step key={'Enter new info about car'} title={'Enter new info about car'}/>
            </Steps>
            <div className="steps-content">
                {current === 0 && (
                    <React.Fragment>
                        <Title style={{marginBottom: '20px'}} level={4}>Set main image of your offer</Title>
                        <Upload
                            name="image"
                            listType="picture-card"
                            className="main_image_uploader"
                            showUploadList={false}
                            action={`http://localhost:3000/images/cars/${params.offerId}/main`}
                            headers={authHeader()}
                            method={mainImageUrl ? 'PATCH' : 'POST'}
                            beforeUpload={beforeUpload}
                            onChange={handleChangeMainImage}
                            disabled={isMainImageDisabled}
                        >
                            {mainImageUrl && !mainImageLoading ? <img src={mainImageUrl} alt="avatar" style={{
                                width: '100%',
                                objectFit: 'cover'
                            }}/> : uploadButtonMainImage}
                        </Upload>
                    </React.Fragment>
                )}
                {current === 1 && (
                    <React.Fragment>
                        <Title style={{marginBottom: '20px'}} level={4}>Set cover image of your offer</Title>
                        <Upload
                            name="image"
                            listType="picture-card"
                            className="cover_image_uploader"
                            showUploadList={false}
                            action={`http://localhost:3000/images/cars/${params.offerId}/cover`}
                            headers={authHeader()}
                            method={coverImageUrl ? 'PATCH' : 'POST'}
                            beforeUpload={beforeUpload}
                            onChange={handleChangeCoverImage}
                            disabled={isCoverImageDisabled}
                        >
                            {coverImageUrl && !coverImageLoading ? <img src={coverImageUrl} alt="avatar"
                                                                        style={{width: '100%'}}/> : uploadButtonCoverImage}
                        </Upload>
                    </React.Fragment>
                )}
                {current === 2 && (
                    <React.Fragment>
                        <Title style={{marginBottom: '20px'}} level={4}>Upload photos of your car for gallery (10
                            maximum)</Title>
                        <Upload
                            action={`http://localhost:3000/images/cars/${params.offerId}`}
                            listType="picture-card"
                            fileList={gallery}
                            name="image"
                            headers={authHeader()}
                            onPreview={handlePreview}
                            onChange={handleChangeGallery}
                            onRemove={handleRemoveFromGallery}
                            disabled={isGalleryDisabled}
                        >
                            {gallery.length >= 10 ? null : uploadButtonGallery}
                        </Upload>
                        <Modal
                            visible={isPreviewVisible}
                            title={previewTitleGallery}
                            footer={null}
                            onCancel={handleCancelGallery}
                        >
                            <img alt="example" style={{width: '100%'}} src={previewImageGallery}/>
                        </Modal>
                    </React.Fragment>
                )}
                {current === 3 && (
                    <React.Fragment>
                        <Form
                            form={form}
                            style={{maxWidth: '400px'}}
                            onFinish={onSendingToModeration}
                        >
                            <Form.Item
                                style={{
                                    marginBottom: '16px'
                                }}
                                name={'mark'}
                                rules={[
                                    {
                                        required: true,
                                        message: `Please choose mark`,
                                    },
                                ]}
                            >
                                <AutoComplete
                                    options={marks ? marks.map((item) => ({id: item.id, value: item.name})) : []}
                                    placeholder="Mark"
                                    disabled={isMarksDisabled}
                                    filterOption={(inputValue, option) =>
                                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                    onSelect={onSelectMark}
                                >
                                </AutoComplete>
                            </Form.Item>
                            <Form.Item
                                style={{
                                    marginBottom: '16px'
                                }}
                                name={'model'}
                                rules={[
                                    {
                                        required: true,
                                        message: `Please choose model`,
                                    },
                                ]}
                            >
                                <AutoComplete
                                    options={models ? models.map((item) => ({id: item.id, value: item.name})) : []}
                                    placeholder="Model"
                                    disabled={isModelsDisabled}
                                    filterOption={(inputValue, option) =>
                                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                    onSelect={onSelectModel}
                                >
                                </AutoComplete>
                            </Form.Item>
                            <Form.Item
                                style={{
                                    marginBottom: '16px'
                                }}
                                name={'generation'}
                                rules={[
                                    {
                                        required: true,
                                        message: `Please choose generation`,
                                    },
                                ]}
                            >
                                <AutoComplete
                                    options={generations ? generations.map((item) => ({
                                        id: item.id,
                                        value: item.generation
                                    })) : []}
                                    placeholder="Generation"
                                    disabled={isGenerationsDisabled}
                                    filterOption={(inputValue, option) =>
                                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                    onSelect={onSelectGeneration}
                                >
                                </AutoComplete>
                            </Form.Item>
                            <Form.Item
                                name={'cost'}
                                style={{
                                    marginBottom: '16px'
                                }}
                                rules={[
                                    {
                                        required: true,
                                        message: `Please enter cost`,
                                    },
                                ]}
                            >
                                <Input placeholder={'Cost(USD)'}/>
                            </Form.Item>
                            <Form.Item
                                name={'mileage'}
                                style={{
                                    marginBottom: '16px'
                                }}
                                rules={[
                                    {
                                        required: true,
                                        message: `Please enter mileage`,
                                    },
                                ]}
                            >
                                <Input placeholder={'Mileage(miles)'}/>
                            </Form.Item>
                            <Form.Item
                                name={'description'}
                                style={{
                                    marginBottom: '16px'
                                }}
                                rules={[
                                    {
                                        required: true,
                                        message: `Please enter description`,
                                    },
                                ]}
                            >
                                <TextArea rows={4} placeholder={'Description'}/>
                            </Form.Item>
                        </Form>
                    </React.Fragment>
                )}
            </div>
            <div className="steps-action">
                {current < 3 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === 3 && (
                    <Button
                        type="primary"
                        onClick={() => {
                            form
                                .validateFields()
                                .then((values) => {
                                    onSendingToModeration(values);
                                });
                        }}
                        loading={isLoading}
                    >
                        Send to moderation
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{margin: '0 8px'}} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
            </div>
        </div>
    );
}

export default EditOffer;