import React from "react";
import { Form, Col, Row, Card, Divider } from "antd";
import BasicForm from "../common/entryForm/BasicForm";
import Utils from "../../utils";
import { orderStatus } from "../../constants/masterData";
import DropdownField from "../common/entryForm/DropdownField";
import TextField from "../common/entryForm/TextField";
import BaseTable from "../common/table/BaseTable";
import { withTranslation } from "react-i18next";
import NumericField from "../common/entryForm/NumericField";
import { convertUtcToTimezone } from "../../utils/datetimeHelper";

class OrderUpdateForm extends BasicForm {
  constructor(props) {
    super(props);
    const { t } = this.props;
    const { formatMoney } = Utils;
    this.state = {
      logo: "",
      uploading: false,
      isUpdateLogo: false,
    };
    this.columns = [
      {
        title: t("table.productName"),
        render: (dataRow) => {
          return dataRow.productName;
        },
      },
      {
        title: t("table.variants"),
        render: (dataRow) => {
          const variants = JSON.parse(JSON.stringify(dataRow.extraVariant));
          return variants.map((eachVar) => {
            return (
              <div key={eachVar.id}>
                <Divider
                  orientation="left"
                  style={{
                    textTransform: "capitalize",
                    fontSize: "0.85rem",
                  }}
                >
                  {eachVar.name}
                </Divider>
                {eachVar.variants?.map((e) => {
                  return (
                    <div key={e.id} style={{ textAlign: "center" }}>
                      <span>{e.name}</span>
                      <Divider type="vertical" />
                      <span>{formatMoney(e.price)}</span>
                    </div>
                  );
                })}
              </div>
            );
          });
        },
      },
      {
        title: t("table.quantity"),
        render: (dataRow) => {
          return dataRow.quantity;
        },
      },
      {
        title: t("table.discount"),
        render: (dataRow) => {
          return formatMoney(dataRow.discount);
        },
      },
      {
        title: t("table.price"),
        render: (dataRow) => {
          return formatMoney(dataRow.price);
        },
      },
    ];
    this.acceptFileTypes = ".png, .jpg, .jpeg, .webp";
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataDetail !== this.props.dataDetail) {
      const { getPaymentMethod } = Utils;
      this.formRef.current.setFieldsValue({
        ...nextProps.dataDetail,
        createdDate: convertUtcToTimezone(nextProps.dataDetail.createdDate),
        modifiedDate: convertUtcToTimezone(nextProps.dataDetail.modifiedDate),
        paymentMethod: getPaymentMethod(nextProps.dataDetail.paymentMethod),
      });
    }
  }

  onValuesChange = () => {
    const { setIsChangedFormValues } = this.props;
    setIsChangedFormValues(true);
  };

  handleSubmit(formValues) {
    const { onSubmit, dataDetail } = this.props;

    onSubmit({
      orderId: dataDetail.id,
      orderStatus: formValues.status,
    });
  }

  getInitialFormValues = () => {
    const { isEditing, dataDetail } = this.props;
    if (!isEditing) {
      return {};
    }
    return dataDetail;
  };

  getOrderItems = () => {
    const { isEditing, dataDetail } = this.props;
    if (!isEditing) {
      return [];
    }
    return dataDetail.orderItems ? dataDetail.orderItems : [];
  };

  render() {
    const { formId, actions, isEditing, t } = this.props;
    const { formatMoney } = Utils;

    return (
      <Form
        id={formId}
        onFinish={this.handleSubmit}
        ref={this.formRef}
        initialValues={this.getInitialFormValues()}
        layout="vertical"
        onValuesChange={this.onValuesChange}
      >
        <div style={{ display: "flex" }}>
          <Card
            style={{ minWidth: "600px" }}
            title="THÔNG TIN ĐƠN HÀNG"
            bordered={false}
          >
            <div style={{ padding: "20px 6px" }}>
              <Row gutter={8}>
                <Col span={12}>
                  {isEditing ? (
                    <DropdownField
                      fieldName="status"
                      label={t("form.label.status")}
                      required
                      options={orderStatus}
                    />
                  ) : null}
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={12}>
                  <TextField
                    disabled
                    fieldName="createdBy"
                    label={t("form.label.createdBy")}
                  />
                </Col>
                <Col span={12}>
                  <TextField
                    disabled
                    fieldName="createdDate"
                    label={t("form.label.createdDate")}
                  />
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={12}>
                  <TextField
                    disabled
                    fieldName="modifiedBy"
                    label={t("form.label.modifiedBy")}
                  />
                </Col>
                <Col span={12}>
                  <TextField
                    disabled
                    fieldName="modifiedDate"
                    label={t("form.label.modifiedDate")}
                  />
                </Col>
              </Row>
              <Row>
                <Card
                  style={{ width: "700px", padding: "0px" }}
                  title="SẢN PHẨM"
                  bordered={false}
                >
                  <BaseTable
                    columns={this.columns}
                    rowKey={(record) => record.id}
                    dataSource={this.getOrderItems()}
                    bordered
                  />
                  <Row gutter={5} style={{ marginTop: "15px" }}>
                    <Col
                      span={18}
                      style={{
                        fontSize: "18px",
                        textAlign: "end",
                        paddingRight: "20px",
                        paddingTop: "7px",
                      }}
                    >
                      {t("form.label.subTotal")}:
                    </Col>
                    <Col span={6} style={{ textAlign: "end" }}>
                      <NumericField
                        width="100%"
                        fieldName="subTotal"
                        formatter={formatMoney}
                        style={{ fontSize: 10 }}
                        size="large"
                      />
                    </Col>
                  </Row>
                </Card>
              </Row>
            </div>
          </Card>
          <Card
            style={{ minWidth: "700px" }}
            headStyle={{ backgroundColor: "#dddddd" }}
            title="THÔNG TIN VẬN CHUYỂN"
            bordered
          >
            <Row gutter={5}>
              <Col span={12}>
                <TextField
                  disabled
                  fieldName="receiverFullName"
                  label={t("form.label.receiverFullName")}
                />
              </Col>
              <Col span={12}>
                <TextField
                  disabled
                  fieldName="phone"
                  label={t("form.label.phone")}
                />
              </Col>
            </Row>
            <Row gutter={5}>
              <Col span={12}>
                <TextField
                  fieldName="paymentMethod"
                  label={t("form.label.paymentMethod")}
                  disabled
                />
              </Col>
              <Col span={12}>
                <NumericField
                  disabled
                  fieldName="shippingCharge"
                  label={t("form.label.shippingCharge")}
                  formatter={formatMoney}
                  width="100%"
                />
              </Col>
            </Row>
            <Row gutter={5}>
              <Col span={8}>
                <TextField
                  disabled
                  fieldName={["province", "name"]}
                  label={t("form.label.province")}
                />
              </Col>
              <Col span={8}>
                <TextField
                  disabled
                  fieldName={["district", "name"]}
                  label={t("form.label.district")}
                />
              </Col>
              <Col span={8}>
                <TextField
                  disabled
                  fieldName={["ward", "name"]}
                  label={t("form.label.ward")}
                />
              </Col>
            </Row>
            <TextField
              disabled
              type="textarea"
              fieldName="addressDetails"
              label={t("form.label.addressDetails")}
            />
          </Card>
        </div>
        <div className="footer-card-form">
          <Row gutter={16} justify="end">
            <Col align="right" span={5}>
              {actions}
            </Col>
          </Row>
        </div>
      </Form>
    );
  }
}

export default withTranslation(["orderListPage", "listBasePage"])(
  OrderUpdateForm
);
