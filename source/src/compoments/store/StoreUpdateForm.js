import React, { Children } from 'react';
import { Form, Col, Row, Card, Button, message, Result, Select } from 'antd';
import BasicForm from '../common/entryForm/BasicForm';
import TextField from '../common/entryForm/TextField';
import RadioField from '../common/entryForm/RadioField';
import DatePickerField from '../common/entryForm/DatePickerField';
import UploadImageField from '../common/entryForm/UploadImageField';
import { convertDateTimeToString, convertLocalTimeToUtc, convertUtcToLocalTime } from '../../utils/datetimeHelper';
import CropImageFiled from '../common/entryForm/CropImageFiled';
import Utils from "../../utils";
import { KeyOutlined, CopyOutlined } from '@ant-design/icons';
import { commonSex, commonStatus } from '../../constants/masterData';
import {
    AppConstants,
    UploadFileTypes,
    STATUS_ACTIVE,
    ProvinceKinds,
  } from "../../constants";
  import { showErrorMessage } from "../../services/notifyService";
import PasswordGeneratorField from '../common/entryForm/PasswordGeneratorField';
import DropdownFieldWithSearch from '../common/entryForm/DropdownFieldWithSearch';
import CheckBoxField from '../common/entryForm/CheckBoxField';
class StoreUpdateForm extends BasicForm {

    constructor(props) {
        super(props)
        this.state = {
            provinceOption:[],
            districtOption:[],
            communeOption:[],
        }
        this.provinceId=null
        this.districtId=null
        this.communeId=null
        this.onGetLocationComplete= this.onGetLocationComplete.bind(this)
        this.getInitialFormValues=this.getInitialFormValues.bind(this)
        this.getLocationDetail=this.getLocationDetail.bind(this)
        this.handleChangeLocation=this.handleChangeLocation.bind(this)
        this.locationOnSelect=this.locationOnSelect.bind(this)
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
        const { isEditing, dataDetail} = this.props;
        if (!isEditing) {
		return {
			status: STATUS_ACTIVE,
		};
		}
		return {
            ...dataDetail,
        };
	};
    

    getLocationDetail(dataDetail){
        const {getLocationDetail}= this.props
        if(Object.keys(dataDetail).length!==0){      
            getLocationDetail({
                    params: { page:0, size: 64,provinceKind:ProvinceKinds.province.level
                        ,districtKind:ProvinceKinds.district.level,districtParentId:dataDetail.district.parentId
                        ,wardKind:ProvinceKinds.commune.level,wardParentId:dataDetail.ward.parentId
                    },
                    onCompleted:(responseData)=>{
                        if(responseData?.result){
                            const {province,district,commune}= responseData.data
                                this.setState({
                                    provinceOption:province.data.map(item=>{
                                        return {value:item.id,label:item.name}
                                    })
                                })
                                this.setState({
                                    districtOption:district.data.map(item=>{
                                        return {value:item.id,label:item.name}
                                    })
                                })
                                this.setState({
                                    communeOption:commune.data.map(item=>{
                                        return {value:item.id,label:item.name}
                                    })
                                })
                                this.provinceId=dataDetail.province.id
                                this.districtId=dataDetail.district.id
                                this.communeId=dataDetail.ward.id
                        }
                    },
                    onError:this.onGetLocationError,
            })
        }
        }   


    componentWillReceiveProps(nextProps) {
        if (nextProps.dataDetail !== this.props.dataDetail) {
            const {dataDetail}= nextProps
            let data={
                ...dataDetail
            }
            this.formRef.current.setFieldsValue(data)
            this.setFieldValue("provinceId",data.province.id)
            this.setFieldValue("districtId",data.district.id)
            this.setFieldValue("wardId",data.ward.id)
            if(this.provinceId === null){
                this.getLocationDetail(dataDetail)
            }
        }
    }

    handleChangeLocation =(id,kind)=>{
        const {getLocation}= this.props
        if(kind === ProvinceKinds.province.level){
            const { getDataList } = this.props;
            const params = { page:0, size: 64,kind:ProvinceKinds.district.level,parentId:id};
            if(id !== this.provinceId){
                if(params.parentId!==undefined){
                    getLocation({
                        params,
                        onCompleted:this.onGetLocationComplete,
                        onError:this.onGetLocationError,
                    })   
                }   
                this.provinceId=id
                this.setState({
                    districtOption:[],
                    communeOption:[],
                })
                this.setFieldValue("districtId",undefined)   
                this.setFieldValue("wardId",undefined)     
            }
        }
        if(kind === ProvinceKinds.district.level){
            const { getDataList } = this.props;
            const params = { page:0, size: 64,kind:ProvinceKinds.commune.level,parentId:id};
            if(id !== this.districtId){
                this.setState({
                    communeOption:[]
                })
                if(params.parentId!==undefined){
                    getLocation({
                    params,
                    onCompleted:this.onGetLocationComplete,
                    onError:this.onGetLocationError,
                }) }   
                this.districtId=id
                this.setFieldValue("wardId",undefined)       
            }
        }
    }

    onGetLocationComplete(responseData){
        if(responseData?.result){
            const data= responseData.data?.data
            const options=data.map(item=>{
                return {value:item.id,label:item.name}
            })
            if(data[0]?.kind===ProvinceKinds.province.level){
                this.setState({
                    provinceOption:options
                })
            }
            else if(data[0]?.kind===ProvinceKinds.district.level){
                this.setState({
                    districtOption:options
                })
            }
            else if(data[0]?.kind===ProvinceKinds.commune.level){
                this.setState({
                    communeOption:options
                })
            }
        }
    }

    onGetLocationError(error){

    }


    locationOnSelect=(kind)=>{
        const {getLocation}= this.props
        const params = { page:0, size: 64,kind:kind};
        if(this.state.provinceOption.length===0){
            getLocation({
                params,
                onCompleted:this.onGetLocationComplete,
                onError:this.onGetLocationError,
            })
        }
    }

    render() {
        const { formId, dataDetail, actions, isEditing,t } = this.props
        const {
            provinceOption,
            districtOption,
            communeOption
        } = this.state
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
                <Card title={t(`baseField:${"address"}`)} className="card-form" bordered={false}>
                        
                <Row gutter={[16, 0]}>
                        <Col span={24}>
                            <TextField
                            fieldName="name"
                            label={t("form.label.name")}
                            required
                        />
                        </Col>
                        </Row>
                        <Row gutter={[16, 0]}>
                        <Col span={8}>
                        <DropdownFieldWithSearch
                        fieldName="provinceId"
                        label={t("form.label.provinceId")}
                        required
                        allowClear
                        options={provinceOption}
                        onClick={e=>this.locationOnSelect(ProvinceKinds.province.level)}
                        onChange={value=>this.handleChangeLocation(value,ProvinceKinds.province.level)}
                    />
                        </Col>
                        <Col span={8}>
                        <DropdownFieldWithSearch
                        fieldName="districtId"
                        label={t("form.label.districtId")}
                        required
                        allowClear
                        options={districtOption}
                        onChange={value=>this.handleChangeLocation(value,ProvinceKinds.district.level)}
                    />
                        </Col>
                        <Col span={8}>
                        <DropdownFieldWithSearch
                        fieldName="wardId"
                        label={t("form.label.wardId")}
                        required
                        allowClear
                        options={communeOption}
                        onChange={value=>this.handleChangeLocation(value,ProvinceKinds.commune.level)}
                    />
                        </Col>
                        </Row>
                        <Row gutter={[16, 0]}>
                        <Col span={24}>
                            <TextField
                            fieldName="addressDetails"
                            required
                            label={t('form.label.addressDetails')}
                            />
                            </Col>
                        </Row>
                        <Row gutter={[16, 0]}>
                        <Col span={12}>
                            <TextField
                             type="number"
                            fieldName="longitude"
                            label={t('form.label.longitude')}
                            />
                            </Col>
                        <Col span={12}>
                            <TextField
                            type="number"
                            fieldName="latitude"
                            label={t('form.label.latitude')}
                            />
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

export default StoreUpdateForm;