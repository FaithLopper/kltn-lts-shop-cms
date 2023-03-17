import React from "react";
import { connect } from "react-redux";
import { Avatar, Button } from "antd";
import {
  UserOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import qs from "query-string";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ListBasePage from "../ListBasePage";
import { sitePathConfig } from "../../constants/sitePathConfig";
import { actions } from "../../actions";
import { FieldTypes } from "../../constants/formConfig";
import { AppConstants } from "../../constants";
import { commonStatus } from "../../constants/masterData";
import SortableBaseTable from "../../compoments/common/table/SortableBaseTable";
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
    this.pagination = { pageSize: 200 };
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

  mapDataToTable(dataSource) {
    let tempData = dataSource
      ? dataSource.map((item) => ({
          ...item,
          index: item.orderSort,
          key: item.id,
        }))
      : [];
    return tempData;
  }
  getCreateLink() {
    return `/${this.objectListName}/create?${qs.stringify({
      parentId: this.parentId,
      parentName: this.parentName,
    })}`;
  }

  render() {
    const { dataList, loading, t, changeOrderData } = this.props;
    const categoryData =
      Object.keys(dataList).length !== 0 ? this.mapDataToTable(dataList?.data || []) : [];
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
        <SortableBaseTable
          loading={loading}
          columns={this.columns}
          rowKey={(record) => record.id}
          data={categoryData}
          pagination={this.pagination}
          onChange={this.handleTableChange}
          changeOrderData={changeOrderData}
          parentId={this.parentId}
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
  changeOrderData: (payload) =>
    dispatch(actions.changeOrderProductCategory(payload)),
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
