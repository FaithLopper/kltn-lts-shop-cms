import React from 'react';
import { Form, Col, Row, Card, Button, message, Input, Select, Checkbox } from 'antd';
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
import {SaveOutlined} from '@ant-design/icons';
class VariantTemplateForm extends BasicForm {

    constructor(props) {
        super(props)
        this.state = {
            templateConfigData:[],
            isShowModifiedModal: false,
            isShowModifiedLoading: false,
            dataList:[],
            name:"",
            id:null,
        }
        this.configIndex=0
        this.selectedVariant=null
        this.onShowModifiedModal= this.onShowModifiedModal.bind(this)
        this.onCancelModal= this.onCancelModal.bind(this)
        this.onVariantSelect= this.onVariantSelect.bind(this)
        this.removeVariantItem=this.removeVariantItem.bind(this)
        this.removeVariant=this.removeVariant.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dataDetail !== this.props.dataDetail) {
            this.setState({
                templateConfigData:nextProps.dataDetail.variantConfigs,
                name:nextProps.dataDetail.name,
                id:nextProps.dataDetail.id
            })
            this.setFieldValue("name",nextProps.dataDetail.name)
            const {variantConfigs} = nextProps.dataDetail
            variantConfigs.map(item =>{
                this.setFieldValue(`name_${item.id}`,item.name)
                this.setFieldValue(`choiceKind_${item.id}`,item.choiceKind)
                this.setFieldValue(`isRequired_${item.id}`,item.isRequired)
            })
        }
    }

    onValuesChange = () => {
        const { setIsChangedFormValues } = this.props
        setIsChangedFormValues(true)
    }

    handleSubmit(formValues) {
        const { onSubmit } = this.props;
        onSubmit({
            name:this.state.name,
            variantConfigs:this.state.templateConfigData,
            id:this.state.id,
        })
    }


	getInitialFormValues = () => {
		const { isEditing, dataDetail } = this.props;
        if(dataDetail.name !== undefined){
            if (!isEditing) {
                return {};
                }
                return {
                    ...dataDetail,
                };
        }
	};

    setConfigField(text, index,kind){
        const {templateConfigData} = this.state
        this.setState({
            templateConfigData:templateConfigData.map((item,key)=>{
                if(item.index === index){
                    if(kind ===1)
                        return {
                        ...item,
                        name:text
                        }
                    else if(kind === 2)
                        return {
                            ...item,
                            choiceKind:text
                    }
                    else if(kind === 3)
                        return {
                            ...item,
                            isRequired:!item.isRequired
                        }
                }
                return item
            })
        })
    }

    renderTemplateConfig =()=>{
        const {templateConfigData}= this.state
        const {isEditing} = this.props
        return templateConfigData.map((item,_index)=>{
            return (<>
                <div className='variant-config-wrapper'>

                <Row gutter={[12, 18]}>
                    <Col span={2} type="flex" align="middle" className='variant-delete-icon'>
                        <MinusCircleOutlined style={{'fontSize':"19px","color":"red"}} onClick={()=>this.removeVariant(item.index)}/>
                    </Col>
                    <Col span={8}>
                        <Row gutter={[16, 0]}>
                            <Col span={24}>
                               <Form.Item required name={item.id ? `name_${item.id}` :`name_${item.index}`}>
                                <Input placeholder='Tên' onChange={e=> this.setConfigField(e.target.value,item.index,1)}/>
                               </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[16, 0]}>
                              <Col span={24}>
                              <Form.Item required name={ item.id ?`choiceKind_${item.id}`:`choiceKind_${item.index}`}>
                                <Select placeholder='Loại' options={variantTemplateConfig} onSelect={e=> this.setConfigField(e,item.index,2)}/>
                               </Form.Item>
                            </Col>
                        </Row>
                        <div className='row-checkbox'>
                        <Row gutter={[16, 0]}>
                              <Col span={24}>
                                                <CheckBoxField
                                                label='Đề xuất'
                                                onChange={e=> this.setConfigField(e.target.value,item.index,3)}
                                fieldName={item.id ?`isRequired_${item.id}`:`isRequired_${item.index}` }
                                />
                            </Col>
                        </Row>
                        </div>
                    </Col>
                    <Col span={14}>
                        <Row gutter={[12, 0]}>
                                <Col span={24}>
                                {item.variantIds.lenght !==0 ? 
                                    <>
                                    {item.variantIds.map((data,index) => {
                                        return <Row gutter={8}>
                                            <Col span={22}> 
                                                <Form.Item>
                                                    <Input value={data.name}/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={2}> 
                                            <MinusCircleOutlined onClick={e =>{this.removeVariantItem(data,data.id,item.index)}}/>
                                            </Col>
                                        </Row>
                                    })}
                                    </>
                                 :<></> }
                              
                                </Col>
                                <Col span={22}>
                                <Button type="dashed" onClick={()=>{this.addVariantItem(item.index,_index)}} block icon={<PlusOutlined />}  >
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

    addVariantItem =(index,_index)=>{
        const { getList, showFullScreenLoading, hideFullScreenLoading } = this.props;
        getList(
            {
                params:{page:0,size:100},
                onCompleted: ({data}) => {
                    this.setState({
                        dataList:  this.getDataDetailMapping(data)
                    })
                    this.selectedVariant= index
                    this.selectedVariantArray= _index
                    this.onShowModifiedModal(true);
                    // hideFullScreenLoading();
                },
                onError: (err) => {
                  console.log(err)
                }
            }
        )
        
    }

    removeVariant =(index)=>{
        const {templateConfigData} = this.state
        this.setState({
            templateConfigData:templateConfigData.filter(itemArray => itemArray.index !== index)
        })
    }

    removeVariantItem =(data,key,parenIndex)=>{
        const {templateConfigData} = this.state
        const temp= templateConfigData.map((item,index)=>{
                    if(item.index === parenIndex){
                        return {
                            ...item,
                            variantIds:item.variantIds.filter(function(itemArray) {
                                return itemArray.id !== key
                            })
                        }
                    }
                    return item
                })
            this.setState({
                templateConfigData:temp
            })
        }


    onVariantSelect(variant) {
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
        const {dataList,name}= this.state
        const variantData = dataList.data || [];
        console.log(this.state.templateConfigData)
        const {
            isShowModifiedModal,
            isShowModifiedLoading,
          } = this.state;
        return (
            <>
            <Form
                id='form-variant-template'
                onFinish={this.handleSubmit}
                ref={this.formRef}
                initialValues={this.getInitialFormValues()}
                layout="vertical"
                // onValuesChange={this.onValuesChange}
                style={{width:"600px"}}
            >
                <Card title='THÔNG TIN THUỘC TÍNH' className="card-form" bordered={false}>
                        <Row gutter={[16, 0]}>
                            <Col span={12}>
                        <Form.Item required  name='name'>
                                <Input placeholder='Tên nhóm thuộc tính' onChange={e =>this.setState({name:e.target.value})}/>
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
                            Thêm nhóm thuộc tính 
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
                        <Col align="right" span={10}>
                            <Row gutter={16} justify="end">
                <Col span={10}>
                <Button
                    key="submit"
                    htmlType="submit"
                    type="primary"
                    form='form-variant-template'
                    icon={<SaveOutlined />}
                    >
                {t(`basicSavePage:${"saveButton"}`)}
                </Button>
                </Col>
            </Row>
                            </Col>
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
            selectedVariantArray={this.state.templateConfigData[this.selectedVariantArray]?.variantIds || []}
            // loading={loading}
          />
        </BasicModal>
            </>
        )
    }
}

export default VariantTemplateForm;