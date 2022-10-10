import React from "react";
import { connect } from "react-redux";
import { Avatar, Divider, Button } from "antd";
import {
  UserOutlined,
  PlusOutlined,
  EditOutlined,
  LockOutlined,
  CheckOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import qs from "query-string";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ListBasePage from "../ListBasePage";
import BaseTable from "../../compoments/common/table/BaseTable";
import { sitePathConfig } from "../../constants/sitePathConfig";
import { actions } from "../../actions";
import { FieldTypes } from "../../constants/formConfig";
import { AppConstants, STATUS_ACTIVE } from "../../constants";
import { commonStatus } from "../../constants/masterData";
class CategoryProductSubListPage extends ListBasePage {
  initialSearch() {
    return { name: "", status: null };
  }

  constructor(props) {
    super(props);
    const { t } = props;

    const {
      location: { search },
    } = this.props;

    const { parentId, parentName } = qs.parse(search);
    this.parentId = parentId;
    this.parentName = parentName;

    this.objectName = t("objectName");
    this.objectListName = "category-product-sub";
    this.breadcrumbs = [
      {
        name: t("breadcrumbs.parentPage"),
        path: `${sitePathConfig.categoryProduct.path}`,
      },
      { name: `${parentName}`, path: `` },
    ];
    this.columns = [
      {
        title: "#",
        dataIndex: "icon",
        align: "center",
        width: 100,
        render: (avatarPath) => (
          <Avatar
            className="table-avatar"
            size="large"
            icon={<UserOutlined />}
            src={
              avatarPath ? `${AppConstants.contentRootUrl}${avatarPath}` : null
            }
          />
        ),
      },
      {
        title: t("table.name"),
        render: (dataRow) => {
          return dataRow.name;
        },
      },
      this.renderStatusColumn(),
      this.renderActionColumn(),
    ];
    this.actionColumns = {
      isEdit: true,
      isDelete: true,
      isChangeStatus: false,
    };
  }

  getList() {
    const { getDataList } = this.props;
    const page = this.pagination.current ? this.pagination.current - 1 : 0;

    const params = {
      page,
      size: this.pagination.pageSize,
      search: this.search,
      parentId: this.parentId,
      isChild: true,
    };
    getDataList({ params });
  }

  getSearchFields() {
    const { t } = this.props;
    return [
      {
        key: "name",
        seachPlaceholder: t("searchPlaceHolder.name"),
        initialValue: this.search.name,
      },
      {
        key: "status",
        seachPlaceholder: t("searchPlaceHolder.status"),
        fieldType: FieldTypes.SELECT,
        options: commonStatus,
        initialValue: this.search.status,
      },
    ];
  }

  getDetailLink(dataRow) {
    return sitePathConfig.categoryProductSubUpdate.path.replace(
      ":id",
      `${dataRow.id}?${qs.stringify({
        parentId: this.parentId,
        parentName: this.parentName,
      })}`
    );
  }

  getCreateLink() {
    return `/${this.objectListName}/create?${qs.stringify({
      parentId: this.parentId,
      parentName: this.parentName,
    })}`;
  }

  renderActionColumn() {
    const { t } = this.props;
    const isRender = this.checkRenderActionColumn();
    if (isRender)
      return {
        title: t ? t("listBasePage:titleActionCol") : "Action",
        width: "100px",
        align: "center",
        render: (dataRow) => {
          const actionColumns = [];
          if (this.actionColumns.isEdit) {
            const detailLink = this.getDetailLink(dataRow);
            actionColumns.push(
              this.renderEditButton(
                <Link to={detailLink}>
                  <Button type="link" className="no-padding">
                    <EditOutlined color="red" />
                  </Button>
                </Link>
              )
            );
          }
          if (this.actionColumns.isChangeStatus) {
            actionColumns.push(
              <Button
                type="link"
                onClick={(e) => {
                  e.stopPropagation();
                  this.showChangeStatusConfirm(dataRow);
                }}
                className="no-padding"
              >
                {dataRow.status === STATUS_ACTIVE ? (
                  <LockOutlined />
                ) : (
                  <CheckOutlined />
                )}
              </Button>
            );
          }
          if (this.actionColumns.isDelete) {
            actionColumns.push(
              this.renderDeleteButton(
                <Button
                  type="link"
                  onClick={(e) => {
                    e.stopPropagation();
                    this.showDeleteConfirm(dataRow.id);
                  }}
                  className="no-padding"
                >
                  {this.actionColumns.isDelete.icon || <DeleteOutlined />}
                </Button>
              )
            );
          }
          const actionColumnsWithDivider = [];
          actionColumns.forEach((action, index) => {
            actionColumnsWithDivider.push(action);
            if (index !== actionColumns.length - 1) {
              actionColumnsWithDivider.push(<Divider type="vertical" />);
            }
          });
          return (
            <span>
              {actionColumnsWithDivider.map((action, index) => (
                <span key={index}>{action}</span>
              ))}
            </span>
          );
        },
      };
    else return {};
  }

  render() {
    const { dataList, loading, t, uploadFile } = this.props;
    const categoryData = dataList.data || [];
    this.pagination.total = dataList.totalElements || 0;
    this.dataDetail.parentName = this.parentName;
    this.dataDetail.parentId = this.parentId;
    return (
      <div>
        {this.renderSearchForm()}
        <div className="action-bar">
          {this.renderCreateNewButton(
            <Link to={this.getCreateLink()}>
              <Button type="primary">
                <PlusOutlined />{" "}
                {t("createNewButton", { var: t("objectNameSub") })}
              </Button>
            </Link>
          )}
        </div>
        <BaseTable
          loading={loading}
          columns={this.columns}
          rowKey={(record) => record.id}
          dataSource={categoryData}
          pagination={this.pagination}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.productCategory.tbProductCategoryLoading,
  dataList: state.productCategory.productCategoryData || {},
});

const mapDispatchToProps = (dispatch) => ({
  getDataList: (payload) => dispatch(actions.getProductCategoryList(payload)),
  getDataById: (payload) => dispatch(actions.getProductCategoryById(payload)),
  updateData: (payload) => dispatch(actions.updateProductCategory(payload)),
  deleteData: (payload) => dispatch(actions.deleteProductCategory(payload)),
  createData: (payload) => dispatch(actions.createProductCategory(payload)),
  uploadFile: (payload) => dispatch(actions.uploadFile(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTranslation([
    "categoryProductListPage",
    "listBasePage",
    "constants",
    "basicModal",
  ])(CategoryProductSubListPage)
);
