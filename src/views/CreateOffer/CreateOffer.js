import React, {useState} from "react";
import {
    Card,
    Col,
    Row,
    Select,
    Steps,
    Button,
    message,
    Typography,
    Upload,
    Modal,
    AutoComplete,
    Input,
    Form
} from "antd";
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';

const {Title, Text} = Typography;
const {TextArea} = Input;
const {Step} = Steps;

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

const CreateOffer = () => {

    const [current, setCurrent] = useState(0);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const [isPreviewVisible, setIsPreviewVisibleGallery] = useState(false);
    const [previewImageGallery, setPreviewImageGallery] = useState('');
    const [previewTitleGallery, setPreviewTitleGallery] = useState('');
    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }
    ])

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div style={{marginTop: 8}}>Upload</div>
        </div>
    );

    const uploadButtonGallery = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                setImageUrl(imageUrl);
                setLoading(false);
            });
        }
    };

    const handleCancelGallery = () => setIsPreviewVisibleGallery(false);
    const handleChangeGallery = ({ fileList }) => setFileList(fileList);

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getGalleryBase64(file.originFileObj);
        }
        setPreviewImageGallery(file.url || file.preview);
        setIsPreviewVisibleGallery(true);
        setPreviewTitleGallery(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    return (
        <div style={{padding: '30px 20% 0 20%', backgroundColor: '#fff'}}>
            <Title level={3} style={{marginBottom: '50px'}}>Create offer to sell your car</Title>
            <Steps current={current} style={{marginBottom: '30px'}}>
                <Step key={'Main image'} title={'Main image'}/>
                <Step key={'Cover image'} title={'Cover image'}/>
                <Step key={'Cover image'} title={'Gallery'}/>
                <Step key={'Info about car'} title={'Info about car'}/>
            </Steps>
            <div className="steps-content">
                {current === 0 && (
                    <React.Fragment>
                        <Title style={{marginBottom: '20px'}} level={4}>Set main image of your offer</Title>
                        <Upload
                            name="main_image"
                            listType="picture-card"
                            className="main_image_uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: '100%'}}/> : uploadButton}
                        </Upload>
                    </React.Fragment>
                )}
                {current === 1 && (
                    <React.Fragment>
                        <Title style={{marginBottom: '20px'}} level={4}>Set cover image of your offer</Title>
                        <Upload
                            name="cover_image"
                            listType="picture-card"
                            className="cover_image_uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: '100%'}}/> : uploadButton}
                        </Upload>
                    </React.Fragment>
                )}
                {current === 2 && (
                    <React.Fragment>
                        <Title style={{marginBottom: '20px'}} level={4}>Upload photos of your car for gallery (10 maximum)</Title>
                        <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChangeGallery}
                        >
                            {fileList.length >= 8 ? null : uploadButtonGallery}
                        </Upload>
                        <Modal
                            visible={isPreviewVisible}
                            title={previewTitleGallery}
                            footer={null}
                            onCancel={handleCancelGallery}
                        >
                            <img alt="example" style={{ width: '100%' }} src={previewImageGallery} />
                        </Modal>
                    </React.Fragment>
                )}
                {current === 3 && (
                    <React.Fragment>
                        <Form style={{maxWidth: '400px'}}>
                            <Form.Item
                                style={{
                                    marginBottom: '16px'
                                }}
                                name={'current_mark'}
                                rules={[
                                    {
                                        required: true,
                                        message: `Please choose mark`,
                                    },
                                ]}
                            >
                                <AutoComplete
                                    options={options}
                                    placeholder="Mark"
                                    filterOption={(inputValue, option) =>
                                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                />
                            </Form.Item>
                            <Form.Item
                                style={{
                                    marginBottom: '16px'
                                }}
                                name={'current_model'}
                                rules={[
                                    {
                                        required: true,
                                        message: `Please choose model`,
                                    },
                                ]}
                            >
                                <AutoComplete
                                    options={options}
                                    placeholder="Model"
                                    filterOption={(inputValue, option) =>
                                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                />
                            </Form.Item>
                            <Form.Item
                                style={{
                                    marginBottom: '16px'
                                }}
                                name={'current_generation'}
                                rules={[
                                    {
                                        required: true,
                                        message: `Please choose generation`,
                                    },
                                ]}
                            >
                                <AutoComplete
                                    options={options}
                                    placeholder="Generation"
                                    filterOption={(inputValue, option) =>
                                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                />
                            </Form.Item>
                            <Form.Item
                                name={'current_cost'}
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
                                name={'current_mark'}
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
                                name={'current_mark'}
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
                                <Text>Please enter location and year of manufacture of your car in description</Text>
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
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
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

export default CreateOffer;