import React from "react";
import { Form, Col, Row, Card } from "antd";
import BasicForm from "../common/entryForm/BasicForm";
import TextField from "../common/entryForm/TextField";
import Utils from "../../utils";
import { AppConstants } from "../../constants";
import ColorPicker from "../common/colorPicker/ColorPicker";

class TagsUpdateForm extends BasicForm {
  constructor(props) {
    super(props);
    this.state = {};

    this.acceptFileTypes = ".png, .jpg, .jpeg, .webp";
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataDetail !== this.props.dataDetail) {
      this.formRef.current.setFieldsValue(nextProps.dataDetail);
    }
    if (
      nextProps.dataDetail.avatar !== this.state.logo &&
      this.state.isUpdateLogo === false &&
      nextProps.dataDetail.avatar !== undefined
    ) {
      this.setState({
        logo: `${AppConstants.contentRootUrl}${nextProps.dataDetail.avatar}`,
      });
    }
  }

  onValuesChange = () => {
    const { setIsChangedFormValues } = this.props;
    setIsChangedFormValues(true);
  };

  handleSubmit(formValues) {
    const { onSubmit } = this.props;
    onSubmit({
      tag: Utils.getHashTag(Utils.removeAllSpecial(formValues.tag)),
      color: formValues.color,
    });
  }

  getInitialFormValues = () => {
    const { isEditing, dataDetail } = this.props;
    if (!isEditing) {
      return {};
    }
    return dataDetail;
  };

  render() {
    const { formId, actions, t } = this.props;
    return (
      <Form
        id={formId}
        onFinish={this.handleSubmit}
        ref={this.formRef}
        initialValues={this.getInitialFormValues()}
        layout="vertical"
        onValuesChange={this.onValuesChange}
        style={{ width: "600px" }}
      >
        <Card title="THÔNG TIN CƠ BẢN" bordered={false}>
          <div style={{ padding: "20px 6px" }}>
            <Row gutter={[16, 0]}>
              <Col span={12}>
                <TextField
                  fieldName="tag"
                  label={t("form.label.tag")}
                  required
                  // disabled={loadingSave}
                />
              </Col>
              <Col style={{ display: "none" }} span={12}>
                <TextField
                  fieldName="color"
                  label={t("form.label.color")}
                  required
                  disabled
                />
              </Col>
            </Row>
            <Row gutter={[16, 0]}>
              <Col span={12}>
                <ColorPicker
                  setter={(name, value) => this.setFieldValue(name, value)}
                  getter={(name) => this.getFieldValue(name)}
                  onValueChange={() => this.onValuesChange()}
                />
              </Col>
            </Row>
          </div>
        </Card>
        <div className="footer-card-form">
          <Row gutter={16} justify="end">
            <Col align="right" span={10}>
              {actions}
            </Col>
          </Row>
        </div>
      </Form>
    );
  }
}

export default TagsUpdateForm;
