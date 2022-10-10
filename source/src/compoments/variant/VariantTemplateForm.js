import React from 'react';
import { Form, Col, Row, Card, Button, message, Input, Select } from 'antd';
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
import BasicModal from '../common/modal/BasicModal';
import VariantListForm from './VariantListForm';
import { connect } from 'react-redux';
class VariantTemplateForm extends BasicForm {

    constructor(props) {
        super(props)
        this.state = {
            templateConfigData:[],
            isShowModifiedModal: false,
            isShowModifiedLoading: false,
            dataList:[],
            name:"",
        }
        this.configIndex=0
        this.selectedVariant=null
        this.onShowModifiedModal= this.onShowModifiedModal.bind(this)
        this.onCancelModal= this.onCancelModal.bind(this)
        this.onVariantSelect= this.onVariantSelect.bind(this)
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

    setConfigField(text, index,fieldName){
        const {templateConfigData} = this.state
        this.setState({
            templateConfigData:templateConfigData.map((item,key)=>{
                if(item.index === index){
                    return {
                        ...item,
                        fieldName:text
                    }
                }
                return item
            })
        })
    }

    renderTemplateConfig =()=>{
        const {templateConfigData}= this.state
        return this.state.templateConfigData.map(item=>{
            return (<>
                <div className='variant-config-wrapper'>

                <Row gutter={[12, 18]}>
                    <Col span={2} type="flex" align="middle" className='variant-delete-icon'>
                        <MinusCircleOutlined style={{'fontSize':"19px","color":"red"}} onClick={()=>this.removeVariantItem(item.index)}/>
                    </Col>
                    <Col span={8}>
                        <Row gutter={[16, 0]}>
                            <Col span={24}>
                               <Form.Item required>
                                <Input placeholder='Tên' onChange={e=> this.setConfigField(e.target.value,item.index,'name')}/>
                               </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[16, 0]}>
                              <Col span={24}>
                              <Form.Item required name="choiceKind">
                                <Select placeholder='Loại' options={variantTemplateConfig}/>
                               </Form.Item>
                            </Col>
                        </Row>
                        <div className='row-checkbox'>
                        <Row gutter={[16, 0]}>
                              <Col span={24}>
                            <CheckBoxField   fieldName="isRequired" label='Đề xuất'/>
                            </Col>
                        </Row>
                        </div>
                    </Col>
                    <Col span={14}>
                        <Row gutter={[12, 0]}>
                                {/* <Col span={24}>
                                    <TextField fieldName="variantName"  />
                                </Col> */}
                                <Col span={24}>
                                {item.variantIds.lenght !==0 ? 
                                    <>
                                    {item.variantIds.map(data => {
                                        return <Row gutter={8}>
                                            <Col span={22}> 
                                                <Form.Item>
                                                    <Input value={data.name}/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={2}> 
                                            <MinusCircleOutlined />
                                            </Col>
                                        </Row>
                                    })}
                                    </>
                                 :<></> }
                              
                                </Col>
                                <Col span={22}>
                                <Button type="dashed" onClick={()=>{this.addVariantItem(item.index)}} block icon={<PlusOutlined />}  >
                                    Thêm thuộc tính
                                </Button>
                                </Col>
                        </Row>
                    </Col>
                </Row>
                                    
                </div>
                </>)
        })
    }

    addConfigItem =()=>{
        this.setState({
            templateConfigData:[    
                ...this.state.templateConfigData,
                {
                    index:this.configIndex++,
                    name:"",
                    choiceKind:"",
                    isRequired:false,
                    variantIds:[]
                }
            ]
        })
    }

    getDataDetailMapping(data) {
        return data;
    }

    addVariantItem =(index)=>{
        const { getList, showFullScreenLoading, hideFullScreenLoading } = this.props;
        getList(
            {
                params:{page:0,size:100},
                onCompleted: ({data}) => {
                    this.setState({
                        dataList:  this.getDataDetailMapping(data)
                    })
                    this.onShowModifiedModal(true);
                    this.selectedVariant= index
                    // hideFullScreenLoading();
                },
                onError: (err) => {
                  console.log(err)
                }
            }
        )
        
    }

    removeVariantItem =(index)=>{

    }

    onVariantSelect(variant) {
        // console.log(variant);
        // console.log(this.selectedVariant);
        const {templateConfigData} = this.state
        this.setState({
            templateConfigData:templateConfigData.map((item,index)=>{
                if(item.index === this.selectedVariant){
                    return {
                        ...item,
                        variantIds:[
                            ...item.variantIds,
                            variant,
                        ]
                    }
                }
                return item
            })
        })
        // console.log(this.state.templateConfigData);
        // console.log(this.state.templateConfigData);

        this.setState({ isShowModifiedModal: false, isShowModifiedLoading: false });
    }

    onCancelModal() {
        this.setState({ isShowModifiedModal: false, isShowModifiedLoading: false });
    }

    onShowModifiedModal() {
        this.setState({ isShowModifiedModal: true });
    }

    render() {
        const { formId, actions, isEditing,t} = this.props
        const {dataList}= this.state
        const variantData = dataList.data || [];
        console.log(this.state)
        const {
            isShowModifiedModal,
            isShowModifiedLoading,
          } = this.state;
        return (
            <>
            <Form
                id={formId}
                onFinish={this.handleSubmit}
                ref={this.formRef}
                initialValues={this.getInitialFormValues()}
                layout="vertical"
                onValuesChange={this.onValuesChange}
                style={{width:"600px"}}
            >
                <Card title='THÔNG TIN THUỘC TÍNH' className="card-form" bordered={false}>
                        <Row gutter={[16, 0]}>
                            <Col span={12}>
                        <Form.Item required name="name" >
                                <Input placeholder='Tên bộ thuộc tính'  onChange={e =>this.setState({name:e.target.value})}/>
                            </Form.Item>
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
                            Thêm bộ thuộc tính 
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
            <BasicModal
          visible={isShowModifiedModal}
          loading={isShowModifiedLoading}
        //   onOk={this.onOkModal}
          onCancel={this.onCancelModal}
        >
          <VariantListForm
            t={t}
            dataSource={variantData}
            onVariantSelect={this.onVariantSelect}
            // loading={loading}
          />
        </BasicModal>
            </>
        )
    }
}

export default VariantTemplateForm;