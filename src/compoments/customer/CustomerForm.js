import React from "react";
import { Form, Col, Row } from "antd";

import BasicForm from "../common/entryForm/BasicForm";
import TextField from "../common/entryForm/TextField";
import DatePickerField from "../common/entryForm/DatePickerField";
import FieldSet from "../common/elements/FieldSet";
import DropdownField from "../common/entryForm/DropdownField";

import { commonStatus, commonLanguages } from "../../constants/masterData";
import CropImageFiled from "../common/entryForm/CropImageFiled";

import { AppConstants, UploadFileTypes, STATUS_ACTIVE } from "../../constants";
import Utils from "../../utils";
import { showErrorMessage } from "../../services/notifyService";
import CheckBoxField from "../common/entryForm/CheckBoxField";
import moment from "moment";

// import { actions } from "../../actions";
// const { getUserData } = actions;

class CustomerForm extends BasicForm {
  constructor(props) {
    super(props);
    this.state = {
      logo: props.dataDetail.customerAvatarPath
        ? `${AppConstants.contentRootUrl}/${props.dataDetail.customerAvatarPath}`
        : "",
      uploading: false,
      isLoyalty:props.dataDetail.isLoyalty
    };
    this.sexOptions = [
      { value: 0, label: "Nam" },
      { value: 1, label: "Nữ" },
    ];
    this.loyaltyLevelOption = [
      { value: 0, label: "0" },
      { value: 1, label: "1" },
      { value: 2, label: "2" },
      { value: 3, label: "3" },
    ];
    
  }

  componentDidMount() {
    const { dataDetail } = this.props;
    this.setFieldValue("avatar", dataDetail.customerAvatarPath);
  }

  validateToConfirmPassword = (rule, value) => {
    const {
      current: { validateFields, isFieldTouched },
    } = this.formRef;
    if (isFieldTouched("confirmPassword")) {
      validateFields(["confirmPassword"], { force: true });
    }
    return Promise.resolve();
  };

  compareToPassword = (rule, newPassword) => {
    const { t } = this.props;
    const password = this.getFieldValue("password");
    if ((password || newPassword) && password !== newPassword) {
      return Promise.reject(t("form.validationMessage.comparePassword"));
    } else {
      return Promise.resolve();
    }
  };

  handleChangeLogo = (info) => {
    console.log(info);
    if (info.file.status === "done") {
      Utils.getBase64(info.file.originFileObj, (logo) =>
        this.setState({ logo })
      );
    }
  };

  uploadFileLogo = (file, onSuccess) => {
    const { uploadFile } = this.props;
    this.setState({ uploading: true });
    uploadFile({
      params: { fileObjects: { file }, type: UploadFileTypes.AVATAR },
      onCompleted: (result) => {
        // this.otherData.logoPath = result.data.filePath;
        this.setFieldValue("avatar", result.data.filePath);
        this.setState({ uploading: false });
        onSuccess();
      },
      onError: (err) => {
        if (err && err.message) {
          showErrorMessage(err.message);
          this.setState({ uploading: false });
        }
      },
    });
  };

  getInitialFormValues = () => {
    const { isEditing, dataDetail } = this.props;

    if (!isEditing) {
      return {
        status: STATUS_ACTIVE,
      };
    }
    return {
      ...dataDetail,
      birthday: dataDetail.birthday ? moment(dataDetail.birthday) : "",
    };
  };

  handleSubmit(formValues) {
    const { onSubmit } = this.props;
    onSubmit({
      ...formValues,
      isLoyalty:this.state.isLoyalty,
      ...this.otherData,
    });
  }

  render() {
    const { isEditing, formId, loadingSave, t } = this.props;
    const { uploading, logo, color, displayColorPicker } = this.state;
    return (
      <Form
        id={formId}
        ref={this.formRef}
        layout="vertical"
        onFinish={this.handleSubmit}
        initialValues={this.getInitialFormValues()}
      >
        <FieldSet title="Thông tin khách hàng">
          <Row gutter={16}>
            <Col span={12}>
              <CropImageFiled
                fieldName="avatar"
                loading={uploading}
                label={t("form.label.avatar")}
                imageUrl={logo}
                onChange={this.handleChangeLogo}
                uploadFile={this.uploadFileLogo}
                disabled={loadingSave}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <TextField
                fieldName="customerPhone"
                min={6}
                label={t("form.label.phone")}
                disabled={loadingSave}
                required={!isEditing}
              />
            </Col>
            <Col span={12}>
              <TextField
                fieldName="customerFullName"
                label={t("form.label.fullName")}
                required
                disabled={loadingSave}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <TextField
                type="password"
                fieldName="customerPassword"
                label={t("form.label.password")}
                required={!isEditing}
                validators={[this.validateToConfirmPassword]}
                minLength={6}
                disabled={loadingSave}
              />
            </Col>
            <Col span={12}>
              <TextField
                type="email"
                fieldName="customerEmail"
                label={t("form.label.customerEmail")}
                required={!isEditing || this.getFieldValue("password")}
                disabled={loadingSave}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <DropdownField
                fieldName="sex"
                label={t("form.label.sex")}
                required
                options={this.sexOptions}
                disabled={loadingSave}
              />
            </Col>
            <Col span={12}>
              <DatePickerField
                fieldName="birthday"
                label={t("form.label.birthday")}
                required
                disabled={loadingSave}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <TextField
                fieldName="customerAddress"
                type="textarea"
                label={t("form.label.address")}
                disabled={loadingSave}
              />
            </Col>
          </Row>
        </FieldSet>
        <FieldSet title="Khách hàng thân thiết">
          <Row gutter={16}>
            <Col span={12}>
              <CheckBoxField
                fieldName="isLoyalty"
                label={t("form.label.isLoyalty")}
                onChange={(e)=>{this.setState({isLoyalty:!this.state.isLoyalty})}}
                disabled={loadingSave}
              />
            </Col>
            <Col span={12}>
              <DropdownField
                fieldName="loyaltyLevel"
                label={t("form.label.loyaltyLevel")}
                required={this.state.isLoyalty}
                options={this.loyaltyLevelOption}
                disabled={!this.state.isLoyalty}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <TextField
                fieldName="saleOff"
                label={t("form.label.saleOff")}
                required={this.state.isLoyalty}
                type="number"
                disabled={!this.state.isLoyalty}
              />
            </Col>
          </Row>
        </FieldSet>
        <FieldSet title="Trạng thái">
        <Row gutter={16}>
          <Col span={12}>
            <DropdownField
              fieldName="status"
              label={t("form.label.status")}
              required
              options={commonStatus}
              disabled={loadingSave}
            />
          </Col>
          <Col span={12}>
            <TextField
              fieldName="note"
              type="textarea"
              label={t("form.label.note")}
              style={{ height: "100px" }}
              disabled={loadingSave}
            />
          </Col>
        </Row>
        </FieldSet>
      </Form>
    );
  }
}

export default CustomerForm;
