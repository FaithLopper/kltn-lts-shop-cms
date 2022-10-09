import React from 'react';
import { Form, Col, Row, Card, Button, message } from 'antd';
import BasicForm from '../common/entryForm/BasicForm';
import TextField from '../common/entryForm/TextField';
import { convertDateTimeToString, convertUtcToLocalTime } from '../../utils/datetimeHelper';
import CropImageFiled from '../common/entryForm/CropImageFiled';
import Utils from "../../utils";
import { KeyOutlined, CopyOutlined ,PlusOutlined,MinusCircleOutlined} from '@ant-design/icons';
import { commonStatus, variantKinds, variantTemplateConfig } from '../../constants/masterData';
import {
    AppConstants,
    UploadFileTypes,
    STATUS_ACTIVE,
  } from "../../constants";
  import { showErrorMessage } from "../../services/notifyService";
import PasswordGeneratorField from '../common/entryForm/PasswordGeneratorField';
import DropdownField from '../common/entryForm/DropdownField';
import NumericField from '../common/entryForm/NumericField';
import RichTextField from '../common/entryForm/RichTextField';
import CheckBoxField from '../common/entryForm/CheckBoxField';
import Title from 'antd/lib/typography/Title';
class VariantTemplateForm extends BasicForm {

    constructor(props) {
        super(props)
        this.state = {
            templateConfigData:[]
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dataDetail !== this.props.dataDetail) {
            this.formRef.current.setFieldsValue(nextProps.dataDetail)
        }
    }

    onValuesChange = () => {
        const { setIsChangedFormValues } = this.props
        setIsChangedFormValues(true)
    }

    handleSubmit(formValues) {
        const { onSubmit } = this.props
        onSubmit({
            ...formValues,
        })
    }


	getInitialFormValues = () => {
		const { isEditing, dataDetail } = this.props;
		if (!isEditing) {
		return {
			status: STATUS_ACTIVE,
		};
		}
		return {
            ...dataDetail,
        };
	};

    renderTemplateConfig =()=>{
        return this.state.templateConfigData.map(item=>{
            return (<>
                <Row gutter={[12, 0]}>
                    <Col span={8}>
                        <Row gutter={[16, 0]}>
                            <Col span={24}>
                                <TextField fieldName="configName" required placeHolder="Tên"/>
                            </Col>
                        </Row>
                        <Row gutter={[16, 0]}>
                              <Col span={24}>
                        <DropdownField fieldName="configKind" options={variantTemplateConfig} required/>
                            </Col>
                        </Row>
                        <Row gutter={[16, 0]}>
                              <Col span={24}>
                        <CheckBoxField fieldName="isRequire"/>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={15}>
                        <Row gutter={[12, 0]}>
                                {/* <Col span={24}>
                                    <TextField fieldName="variantName"  />
                                </Col> */}
                                <Col span={24}>
                                <Button type="dashed" onClick={()=>{this.addVariantItem()}} block icon={<PlusOutlined />}  >
                                    Thêm item 
                                </Button>
                                </Col>
                        </Row>
                    </Col>
                    <Col span={1} >
                        <MinusCircleOutlined />
                    </Col>
                </Row>
                </>)
        })
    }

    addConfigItem =()=>{
        console.log("e");
        this.setState({
            templateConfigData:[    
                ...this.state.templateConfigData,
                {
                    configName:"",
                    configKind:"",
                    isRequired:false,
                }
            ]
        })
        console.log(this.state.templateConfigData)
    }

    addVariantItem =()=>{
        
    }

    render() {
        const { formId, dataDetail, actions, isEditing,t } = this.props
        return (
            <Form
                id={formId}
                onFinish={this.handleSubmit}
                ref={this.formRef}
                initialValues={this.getInitialFormValues()}
                layout="vertical"
                onValuesChange={this.onValuesChange}
                style={{width:"600px"}}
            >
                <Card title={t(`baseField:${"basicInfo"}`)} className="card-form" bordered={false}>
                        <Row gutter={[16, 0]}>
                        <Col span={24}>
                            <TextField fieldName="name" label={t("form.label.name")} required 
                            // disabled={loadingSave}
                            />
                        </Col>
                        </Row>
                        <Card title='Thuộc tính' className="card-form" bordered={false}>
                            {/* <Row gutter={[16, 0]}>
                            <Col span={10}>
                                <TextField fieldName="name" label={t("form.label.name")} required 
                                // disabled={loadingSave}
                                />
                            </Col>
                            </Row> */}
                            <Col span={24}>

                            {this.renderTemplateConfig()}

                            <Button type="dashed" className='add-variant' onClick={()=>{this.addConfigItem()}} block icon={<PlusOutlined />}  >
                                Thêm item 
                            </Button>
                            </Col>
                        </Card>
                        <Row gutter={[16, 0]}>
                        <Col span={24}>
                        
                        </Col>
                        </Row>
                                
                </Card>
                <div className="footer-card-form">
                    <Row gutter={16} justify="end">
                        <Col align="right" span={10}>{actions}</Col>
                    </Row>
                </div>
            </Form>
        )
    }
}

export default VariantTemplateForm;