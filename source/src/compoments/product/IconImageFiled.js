import React from 'react';

import { Form, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

import { PlusOutlined, LoadingOutlined,UploadOutlined, PaperClipOutlined } from '@ant-design/icons';

import BaseField from '../common/entryForm/BaseField';

import { withTranslation } from 'react-i18next';
import { AppConstants } from '../../constants';

class CropImageFiled extends BaseField {
    
    constructor(props) {
        super(props);
        this.getContent = this.getContent.bind(this);
    }

    uploadFile = ({file, onSuccess}) => {
        const { uploadFile ,index} = this.props;
        uploadFile(file, onSuccess,index);
    }

    getContent() {
        const { showUploadList, fileList, maxFile, imageUrl, loading } = this.props;
        if(imageUrl) {
            return <img className="img-uploaded" src={`${AppConstants.contentRootUrl}${imageUrl}`} alt="field-upload" />;
        }
        else if(showUploadList && fileList && fileList.length === maxFile) {
            return null;
        }
        else {
            return this.renderUploadButton();
        }
    }

    renderUploadButton() {
        const { loading, showUploadList, style, t } = this.props;
        return (<>
          {loading ? <LoadingOutlined /> : <UploadOutlined style={{"fontSize":"22px","cursor":"pointer"}}/>}  
        </>
        );
    }
    render() {
        const {
            label,
            fileList,
            disabled,
            fieldName,
            accept,
            onChange,
            beforeUpload,
            showUploadList,
            aspect,
            index
        } = this.props;
        const aspectValue = aspect || 1;
        console.log(showUploadList)
        return (
            <Form.Item
                label={label}
                name={fieldName}
                rules={this.getRules()}
                valuePropName={fieldName}
            >
                        <ImgCrop aspect={aspectValue}>
                            <Upload
                                disabled={disabled}
                                accept={accept}
                                valuePropName={fieldName}
                                showUploadList={false}
                                customRequest={this.uploadFile}
                                beforeUpload={beforeUpload}
                                onChange={onChange}
                            >
                                {this.getContent()}
                            </Upload>
                        </ImgCrop>             
            </Form.Item>
        )
    }
}

export default withTranslation(['cropImageFiled', 'baseField'])(CropImageFiled);
