import React from "react";
import { connect } from "react-redux";
import { Avatar, Tag, Button } from "antd";
import { UserOutlined, PlusOutlined } from "@ant-design/icons";
import qs from "query-string";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ListBasePage from "../ListBasePage";
import BaseTable from "../../compoments/common/table/BaseTable";
import { sitePathConfig } from "../../constants/sitePathConfig";
import { actions } from "../../actions";
import { FieldTypes } from "../../constants/formConfig";
import { AppConstants } from "../../constants";
import { commonStatus } from "../../constants/masterData";
import CategoryProductSubForm from "../../compoments/categoryProduct/CategoryProductSubForm";
import BasicModal from "../../compoments/common/modal/BasicModal";

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
    this.objectListName = "category-product";
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
      this.renderActionColumnModal(),
    ];
    this.actionColumns = {
      isEdit: true,
      isDelete: true,
      isChangeStatus: false,
    };
  }

  //   handleRouting(parentId, parentName) {
  //     const {
  //       location: { search, pathname },
  //       history,
  //     } = this.props;
  //     const queryString = qs.parse(search);
  //     const result = {};
  //     Object.keys(queryString).map((q) => {
  //       result[`parentSearch${q}`] = queryString[q];
  //     });
  //     history.push(
  //       `${pathname}-sub?${qs.stringify({ ...result, parentId, parentName })}`
  //     );
  //   }

  prepareCreateData(data) {
    return {
      ...data,
    };
  }
  prepareUpdateData(data) {

    console.log('update',data)
    return {
      ...data,
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

  render() {
    const { dataList, loading, t, uploadFile } = this.props;
    const categoryData = dataList.data || [];
    this.pagination.total = dataList.totalElements || 0;
    const { isShowModifiedModal, isShowModifiedLoading } = this.state;
    this.dataDetail.parentName = this.parentName;
    this.dataDetail.parentId = this.parentId;
    return (
      <div>
        {this.renderSearchForm()}
        <div className="action-bar">
          {this.renderCreateNewButton(
            <Button
              type="primary"
              onClick={() => this.onShowModifiedModal(false)}
            >
              <PlusOutlined />{" "}
              {t("createNewButton", {
                var: t(`constants:${"CategoryProductSub"}`, ""),
              })}
            </Button>
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
        <BasicModal
          visible={isShowModifiedModal}
          isEditing={this.isEditing}
          objectName={this.objectName}
          loading={isShowModifiedLoading}
          onOk={this.onOkModal}
          onCancel={this.onCancelModal}
          width={500}
        >
          <CategoryProductSubForm
            visible={isShowModifiedModal}
            dataDetail={
              this.isEditing
                ? this.dataDetail
                : {
                    parentName: this.dataDetail.parentName,
                    parentId: this.dataDetail.parentId,
                  }
            }
            isEditing={this.isEditing}
            objectName={this.objectName}
            loading={isShowModifiedLoading}
            onOk={this.onOkModal}
            onCancel={this.onCancelModal}
            uploadFile={uploadFile}
            t={t}
          />
        </BasicModal>
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
