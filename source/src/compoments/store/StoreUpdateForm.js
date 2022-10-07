import React, { Children } from 'react';
import { Form, Col, Row, Card, Button, message } from 'antd';
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
import DropdownField from '../common/entryForm/DropdownField';
import CheckBoxField from '../common/entryForm/CheckBoxField';
class StoreUpdateForm extends BasicForm {

    constructor(props) {
        super(props)
        this.state = {
            logo: "",
			uploading: false,
            curPassword: null,
            isUpdateLogo:false,
            provinceOption:[],
            districtOption:[],
            communeOption:[],
        }
        // this.provinceOption=[],
        // this.districtOption=[],
        // this.communeOption=[],
        this.provinceId=null
        this.districtId=null
        this.communeId=null
    }

    componentWillReceiveProps(nextProps,currentProps) {
        if (nextProps.dataDetail !== this.props.dataDetail) {
            const {dataDetail}= nextProps
            let data={
                ...dataDetail
            }
            this.formRef.current.setFieldsValue(data)
        }
        const {communeOption,provinceOption, districtOption } =nextProps;
        if(provinceOption){
            this.setState({
                provinceOption:provinceOption.map(item=>{
                    return {value:item.id,label:item.name}
                })
            })
        }
        if(nextProps.districtOption !== this.state.districtOption){
            if(districtOption){ 
                this.setState({
                    districtOption:districtOption.map(item=>{
                        return {value:item.id,label:item.name}
                    })
                })
            }
        }

        if(communeOption){
            this.setState({
                communeOption:communeOption.map(item=>{
                    return {value:item.id,label:item.name}
                })
            })
        }
        // console.log(this.state.provinceOption)
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
        const { isEditing, dataDetail,communeOption,provinceOption, districtOption } = this.props;
        if (!isEditing) {
		return {
			status: STATUS_ACTIVE,
		};
		}
		return {
            ...dataDetail,
        };
	};

    handleChangeLogo = (info) => {
		if (info.file.status === "done") {
		Utils.getBase64(info.file.originFileObj, (logo) =>{
			this.setState({ logo:logo,isUpdateLogo:true })
        }
		);
		}
	};

    copyToClipboardAlert = () => {
        const { t } = this.props;
        message.success( t('constants:successMessage.copied'));
    };
    handleChangeLocation =(id,kind)=>{
        const {getLocation}= this.props
        if(kind === ProvinceKinds.province.level){
            const { getDataList } = this.props;
            const params = {
              page:0,
              size: 64,
              kind: ProvinceKinds.district.name,
              parentId: id,
            };
            if(id !== this.provinceId){
                this.provinceId=id
                this.setState({
                    districtOption:[]
                })
                getLocation({ params });          
            }
        }
        if(kind === ProvinceKinds.district.level){
            const { getDataList } = this.props;
            const params = {
              page:0,
              size: 64,
              kind: ProvinceKinds.commune.name,
              parentId: id,
            };
            if(id !== this.districtId){
                getLocation({ params });
                this.districtId=id
                this.setState({
                    communeOption:[]
                })
            }
        }
    }

    locationOnSelect=(kind)=>{
        const {getLocation}= this.props
        const params = { page:0, size: 64,search:{kind:kind}};
        if(this.state.provinceOption.length===0){
            getLocation({params})
        }
    }

    render() {
        const { formId, dataDetail, actions, isEditing,t } = this.props
        const {
            provinceOption,
            districtOption,
            communeOption
        } = this.state
        console.log(districtOption);
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
                            // required
                        />
                        </Col>
                        </Row>
                        <Row gutter={[16, 0]}>
                        <Col span={8}>
                        <DropdownField
                        fieldName="provinceId"
                        label={t("form.label.provinceId")}
                        // required
                        allowClear
                        options={provinceOption}
                        onClick={e=>this.locationOnSelect(ProvinceKinds.province.level)}
                        onChange={value=>this.handleChangeLocation(value,ProvinceKinds.province.level)}
                    />
                        </Col>
                        <Col span={8}>
                        <DropdownField
                        fieldName="districtId"
                        label={t("form.label.districtId")}
                        // required
                        allowClear
                        options={districtOption}
                        onChange={value=>this.handleChangeLocation(value,ProvinceKinds.district.level)}
                    />
                        </Col>
                        <Col span={8}>
                        <DropdownField
                        fieldName="wardId"
                        label={t("form.label.wardId")}
                        // required
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
                            // required
                            label={t('form.label.addressDetails')}
                            />
                            </Col>
                        </Row>
                        <Row gutter={[16, 0]}>
                        <Col span={12}>
                            <TextField
                            type="number"
                            fieldName="latitude"
                            label={t('form.label.latitude')}
                            />
                            </Col>
                        <Col span={12}>
                            <TextField
                             type="number"
                            fieldName="longitude"
                            label={t('form.label.longitude')}
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