import React from "react";
import { Form, Col, Row, Card, Divider, Avatar, Tabs } from "antd";
import BasicForm from "../common/entryForm/BasicForm";
import Utils from "../../utils";
import { orderStatus } from "../../constants/masterData";
import DropdownField from "../common/entryForm/DropdownField";
import TextField from "../common/entryForm/TextField";
import BaseTable from "../common/table/BaseTable";
import { withTranslation } from "react-i18next";
import NumericField from "../common/entryForm/NumericField";
import { convertUtcToTimezone } from "../../utils/datetimeHelper";
import { AppConstants } from "../../constants";
import { GiftOutlined } from "@ant-design/icons";
import createFormStyles from "./OrderCreateForm.module.scss";

const headerStyle = {
  backgroundColor: "black",
  color: "white",
  fontSize: "16px",
};

const fixOverFlowText = {
  whiteSpace: "nowrap",
  maxWidth: "10rem",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const tableFontSize = "15px";

const customTableTitle = (
  title,
  style = { fontSize: "15.5px", textAlign: "center" }
) => {
  return <div style={style}>{title}</div>;
};

class OrderCreateForm extends BasicForm {
  constructor(props) {
    super(props);
    const { t } = this.props;
    const { formatMoney } = Utils;
    this.state = {
      logo: "",
      uploading: false,
      isUpdateLogo: false,
      nextOrderState: [],
      currentActiveCart: 0,
      carts: [],
    };
    this.columns = [
      {
        title: customTableTitle(t("table.image")),
        align: "center",
        dataIndex: "avatar",
        render: (avatar) => (
          <Avatar
            shape="square"
            className="customer-avatar"
            size={128}
            icon={<GiftOutlined />}
            src={avatar ? `${AppConstants.contentRootUrl}${avatar}` : null}
          />
        ),
      },
      {
        title: customTableTitle(t("table.productName")),
        align: "center",
        render: (dataRow) => {
          return (
            <div style={{ fontSize: tableFontSize }}>{dataRow.productName}</div>
          );
        },
      },
      {
        title: customTableTitle(t("table.variants")),
        render: (dataRow) => {
          const variants = JSON.parse(
            JSON.stringify(dataRow.extraVariant || [])
          );
          return variants.map((eachVar) => {
            return (
              <div key={eachVar.id} style={{ fontSize: tableFontSize }}>
                <Divider
                  orientation="left"
                  style={{
                    textTransform: "capitalize",
                    fontSize: "0.85rem",
                  }}
                >
                  <span style={{ ...fixOverFlowText, display: "block" }}>
                    {eachVar.name}
                  </span>
                </Divider>
                {eachVar.variants?.map((e) => {
                  return (
                    <div key={e.id} style={{ paddingLeft: 16, maxWidth: 256 }}>
                      <span
                        style={{
                          ...fixOverFlowText,
                          display: "inline-block",
                          maxWidth: "8rem",
                        }}
                      >
                        {e.name}
                      </span>
                      {e.price !== 0 && (
                        <>
                          <Divider type="vertical" />
                          <span
                            style={{
                              ...fixOverFlowText,
                              display: "inline-block",
                              maxWidth: "8rem",
                            }}
                          >
                            {formatMoney(e.price)}
                          </span>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          });
        },
      },
      {
        title: customTableTitle(t("table.quantity")),
        paddingLeft: "20px",
        align: "center",
        render: (dataRow) => {
          return (
            <div style={{ fontSize: tableFontSize }}>{dataRow.quantity}</div>
          );
        },
      },
      //   {
      //     title: customTableTitle(t("table.discount")),
      //     align: "center",
      //     render: (dataRow) => {
      //       return (
      //         <div style={{ fontSize: tableFontSize }}>
      //           {formatMoney(dataRow.discount)}
      //         </div>
      //       );
      //     },
      //   },
      //   {
      //     title: customTableTitle(t("table.note")),
      //     render: (dataRow) => {
      //       return <div style={{ fontSize: tableFontSize }}>{dataRow.note}</div>;
      //     },
      //   },
      {
        title: customTableTitle(t("table.price")),
        align: "center",
        render: (dataRow) => {
          return (
            <div style={{ fontSize: tableFontSize }}>
              {formatMoney(dataRow.price)}
            </div>
          );
        },
      },
    ];
    this.acceptFileTypes = ".png, .jpg, .jpeg, .webp";
    this.newCartIndex = React.createRef(0);
    this.addNewCart = this.addNewCart.bind(this);
    this.removeCart = this.removeCart.bind(this);
    this.editCartList = this.editCartList.bind(this);
    this.changeActiveCart = this.changeActiveCart.bind(this);
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
    return {};
  };

  getOrderItems = (currentActiveCart) => {
    const { cartsData } = this.props;
    return cartsData[currentActiveCart]?.orderItems || [];
  };

  addNewCart() {
    const { cartActions } = this.props;
    const newCurrentActiveCart = `cart-${(this.newCartIndex.current += 1)}`;
    cartActions.addNewCart({
      label: `Giỏ hàng ${this.newCartIndex.current}`,
      key: newCurrentActiveCart,
    });
    this.setState({
      carts: [
        ...this.state.carts,
        {
          label: `Giỏ hàng ${this.newCartIndex.current}`,
          key: newCurrentActiveCart,
        },
      ],
      currentActiveCart: newCurrentActiveCart,
    });
  }

  removeCart(targetCartKey) {
    const { carts, currentActiveCart } = this.state;
    const targetCartIndex = carts.findIndex(
      (pane) => pane.key === targetCartKey
    );
    const newCarts = carts.filter((pane) => pane.key !== targetCartKey);
    if (newCarts.length && targetCartKey === currentActiveCart) {
      const { key } =
        newCarts[
          targetCartIndex === newCarts.length
            ? targetCartIndex - 1
            : targetCartIndex
        ];
      this.setState({
        currentActiveCart: key,
      });
    }
    this.setState({
      carts: [...newCarts],
    });
  }

  editCartList(targetCartKey, action) {
    if (action === "add") {
      this.addNewCart();
    } else {
      this.removeCart(targetCartKey);
    }
  }

  changeActiveCart(key) {
    this.setState({
      currentActiveCart: key,
    });
  }

  render() {
    const { formId, actions, isEditing, t } = this.props;
    const { carts, currentActiveCart } = this.state;
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
        <div
          style={{
            width: "100rem",
          }}
        >
          <Row>
            <Card
              style={{ backgroundColor: "grey", width: "100%", padding: "0px" }}
              title="Tạo Đơn Hàng"
              bordered={false}
              headStyle={headerStyle}
            >
              <div style={{ height: 56 }}>
                <Tabs
                  hideAdd={carts.length >= 10}
                  onChange={this.changeActiveCart}
                  activeKey={currentActiveCart}
                  type="editable-card"
                  onEdit={this.editCartList}
                  items={carts}
                />
              </div>
              {carts.length ? (
                <div>
                  <BaseTable
                    columns={this.columns}
                    rowKey={(record) => record.id}
                    dataSource={this.getOrderItems(currentActiveCart)}
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
                        fontWeight: 700,
                        textDecoration: "underline",
                      }}
                    >
                      {t("form.label.subTotal")}:
                    </Col>
                    <Col span={6} style={{ textAlign: "end" }}>
                      <NumericField
                        width="100%"
                        fieldName="subTotal"
                        formatter={formatMoney}
                        style={{ fontSize: 12 }}
                        size="large"
                        defaultValue={0}
                        addonBefore
                      />
                    </Col>
                  </Row>
                </div>
              ) : (
                <div>Hiện không có giỏ hàng, bấm "+" để khởi tạo</div>
              )}
            </Card>
          </Row>
          {/* <Row style={{ maxHeight: "500px" }}>
            <Col span={12}>
              <Card
                title="THÔNG TIN ĐƠN HÀNG"
                bordered
                style={{ maxHeight: "500px" }}
                headStyle={headerStyle}
              >
                <Row gutter={8}>
                  <Col span={12}>
                    {isEditing ? (
                      <DropdownField
                        fieldName="status"
                        label={t("form.label.status")}
                        required
                        options={this.state.nextOrderState}
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
              </Card>
            </Col>
            <Col span={12}>
              <Card
                style={{ maxHeight: "500px" }}
                title="THÔNG TIN VẬN CHUYỂN"
                bordered
                headStyle={headerStyle}
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
            </Col>
          </Row> */}
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
  OrderCreateForm
);
