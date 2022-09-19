import React from "react";
import { Form, Col, Row } from "antd";

import BasicForm from "../common/entryForm/BasicForm";
import TextField from "../common/entryForm/TextField";
import { commonStatus } from "../../constants/masterData";
import NumericField from "../common/entryForm/NumericField";
import DropdownField from "../common/entryForm/DropdownField";
import CropImageFiled from "../common/entryForm/CropImageFiled";

import RichTextField from "../../compoments/common/entryForm/RichTextField";
import CheckBoxField from "../../compoments/common/entryForm/CheckBoxField";

import { AppConstants, UploadFileTypes, STATUS_ACTIVE } from "../../constants";
import Utils from "../../utils";
import { showErrorMessage } from "../../services/notifyService";

class ImportForm extends BasicForm {
  constructor(props) {
    super(props);
    this.state = {
      avatar: props.dataDetail.filePath
        ? `${AppConstants.contentRootUrl}/${props.dataDetail.filePath}`
        : "",
      uploading: false,
    };
  }

  getInitialFormValues = () => {
    const { isEditing, dataDetail, categoryOptions } = this.props;
    if (!isEditing) {
      return {
        status: STATUS_ACTIVE,
        ordering: 0,
      };
    }
    return {
      ...dataDetail,
      categoryId: categoryOptions[0] && categoryOptions[0].value,
      ordering: 0,
    };
  };

  handleChangeAvatar = (info) => {
    if (info.file.status === "done") {
      Utils.getBase64(info.file.originFileObj, (avatar) =>
        this.setState({ avatar })
      );
    }
  };

  uploadFileAvatar = (file, onSuccess) => {
    const { uploadFile } = this.props;
    this.setState({ uploading: true });
    uploadFile({
      params: { fileObjects: { file }, type: UploadFileTypes.AVATAR },
      onCompleted: (result) => {
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
  handleSubmit(formValues) { 
    const { onSubmit } = this.props;
    onSubmit({
        ...formValues,
        kind:1
    });
    
}
  render() {
    const { formId, categoryOptions, loadingSave, t, isEditing } = this.props;
    const { uploading, avatar } = this.state;
    console.log(this.getInitialFormValues())
    console.log(categoryOptions)
    return (
      <Form
        id={formId}
        ref={this.formRef}
        layout="vertical"
        onFinish={this.handleSubmit}
        initialValues={this.getInitialFormValues()}
      >
        <Row gutter={16}>
          <Col span={12}>
            <CropImageFiled
              fieldName="avatar"
              loading={uploading}
              label={t("form.label.avatar")}
              imageUrl={avatar}
              onChange={this.handleChangeAvatar}
              uploadFile={this.uploadFileAvatar}
              required
              requiredMsg={t("form.validationMessage.avatarRequire")}
              disabled={loadingSave}
            />
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <DropdownField
              fieldName="categoryId"
              label={t("form.label.category")}
              required
              options={categoryOptions}
              disabled={loadingSave}

            />
          </Col>
          <Col span={12}>
            <TextField
              fieldName="code"
              label={t("form.label.code")}
              required
              disabled={loadingSave}
            />
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <TextField
              fieldName="money"
              label={t("form.label.money")}
              required
              disabled={loadingSave}
            />
          </Col>

          <Col span={12}>
            <TextField
              fieldName="note"
              label={t("form.label.note")}
              type="textarea"
              style={{ height: "122px" }}
              disabled={loadingSave}
              required
            />
          </Col>
        </Row>
      </Form>
    );
  }
}

export default ImportForm;
