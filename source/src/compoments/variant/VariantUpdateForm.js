import React from 'react';
import { Form, Col, Row, Card, Button, message } from 'antd';
import BasicForm from '../common/entryForm/BasicForm';
import TextField from '../common/entryForm/TextField';
import { convertDateTimeToString, convertUtcToLocalTime } from '../../utils/datetimeHelper';
import CropImageFiled from '../common/entryForm/CropImageFiled';
import Utils from "../../utils";
import { KeyOutlined, CopyOutlined } from '@ant-design/icons';
import { commonStatus, variantKinds } from '../../constants/masterData';
import {
    AppConstants,
    UploadFileTypes,
    STATUS_ACTIVE,
  } from "../../constants";
  import { showErrorMessage } from "../../services/notifyService";
import PasswordGeneratorField from '../common/entryForm/PasswordGeneratorField';
import DropdownField from '../common/entryForm/DropdownField';
class VariantUpdateForm extends BasicForm {

    constructor(props) {
        super(props)
        this.state = {
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
                        <Col span={12}>
                            <TextField
                            fieldName="kind"
                            type="number"
                            label={t("form.label.kind")}
                            options={variantKinds}
                            required
                            />
                        </Col>
                        <Col span={12}>
                            <TextField fieldName="name" label={t("form.label.name")} required 
                            // disabled={loadingSave}
                            />
                        </Col>
                        </Row>
                        <Row gutter={[16, 0]}>
                            <Col span={12}>
                            </Col>
                            <Col span={12}>
                            <TextField
                            type="number"
                            fieldName="price"
                            label={t("form.label.price")}
                            required
                            // disabled={loadingSave}
                            />
                        </Col>
                        </Row>
                        <Row gutter={[16, 0]}>
                        <Col span={12}>
                            <TextField fieldName="value"  label={t("form.label.value")}
                            required
                            // disabled={loadingSave}
                            />
                        </Col>
                       <Col span={12}>
                       <TextField fieldName="variantTemplateId"  label={t("form.label.variantTemplateId")}
                            required
                            // disabled={loadingSave}
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

export default VariantUpdateForm;