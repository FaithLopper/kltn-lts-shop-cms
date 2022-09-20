import React from "react";
import { connect } from "react-redux";
import { Avatar, Tag, Button, Row, Col } from "antd";
import { UserOutlined, PlusOutlined } from "@ant-design/icons";
import qs from "query-string";
import { withTranslation } from "react-i18next";

import ListBasePage from "../ListBasePage";
import CategoryForm from "../../compoments/category/CategoryForm";
import BaseTable from "../../compoments/common/table/BaseTable";
import BasicModal from "../../compoments/common/modal/BasicModal";

import { actions } from "../../actions";
import { FieldTypes } from "../../constants/formConfig";
import { AppConstants } from "../../constants";
import { commonStatus } from "../../constants/masterData";
import ImportForm from "../../compoments/importExport/ImportForm";

class importListPage extends ListBasePage {
  initialSearch() {
    return { code: "", categoryId: undefined, date: undefined };
  }

  constructor(props) {
    super(props);
    const { t } = props;
    this.objectName = t("objectName");
    this.breadcrumbs = [{ name: t("breadcrumbs.currentPage") }];
    this.columns = [
      {
        title: t("table.categoryName"),
        dataIndex: "categoryDto",
        render: (categoryDto) => (
          <span>
            {categoryDto.categoryName ? categoryDto.categoryName : ""}
          </span>
        ),
      },
      {
        title: t("table.money"),
        dataIndex: "money",
      },
      {
        title: t("table.fullName"),
        dataIndex: "accountAdminDto",
        render: (accountAdminDto) => (
          <span>
            {accountAdminDto.fullName ? accountAdminDto.fullName : ""}
          </span>
        ),
      },
      {
        title: t("table.note"),
        dataIndex: "note",
      },
      {
        title: t("table.createdDate"),
        dataIndex: "createdDate",
      },
      this.renderStatusColumn(),
      this.renderActionColumn(),
    ];
    this.actionColumns = {
      isEdit: true,
      isDelete: true,
      isChangeStatus: false,
    };
    this.props.getCategoryAutoCompleteImportExport({ kind: 1 });
    this.categoryOptions = [];
    this.sum = 0;
  }

  handleRouting(parentId, parentName) {
    const {
      location: { search, pathname },
      history,
    } = this.props;
    const queryString = qs.parse(search);
    const result = {};
    Object.keys(queryString).map((q) => {
      result[`parentSearch${q}`] = queryString[q];
    });
    history.push(
      `${pathname}-child?${qs.stringify({ ...result, parentId, parentName })}`
    );
  }

  prepareCreateData(data) {
    return {
      ...data,
      categoryKind: 1,
    };
  }

  getList() {
    const { getDataList } = this.props;
    const page = this.pagination.current ? this.pagination.current - 1 : 0;
    const params = {
      page,
      size: this.pagination.pageSize,
      search: this.search,
      kind: 1,
    };
    getDataList({ params });
  }

  getSearchFields() {
    const { t } = this.props;
    return [
      {
        key: "code",
        seachPlaceholder: t("searchPlaceHolder.code"),
        initialValue: this.search.code,
      },
      {
        key: "categoryId",
        seachPlaceholder: t("searchPlaceHolder.category"),
        fieldType: FieldTypes.SELECT,
        options: [...this.categoryOptions],
        initialValue: this.search.categoryId,
      },
      {
        key: "date",
        seachPlaceholder: ["Từ ngày", "đến ngày"],
        fieldType: FieldTypes.DATE_RANGE,
      },
    ];
  }

  render() {
    const { dataList, loading, uploadFile, t, categoryAutoComplete } =
      this.props;
    const { isShowModifiedModal, isShowModifiedLoading } = this.state;

    const categoryData = dataList.data || [];
    this.pagination.total = dataList.totalElements || 0;
    this.sum = dataList.sum || 0;
    this.categoryOptions = categoryAutoComplete.data
      ? categoryAutoComplete.data.map((c) => {
          return {
            value: c.id,
            label: c.categoryName,
          };
        })
      : [];
    return (
      <div>
        {this.renderSearchForm()}
        <div className="action-bar">
          {
            <Row>
              <Col>
                <span style={{ color: "green", fontWeight: "bolder" }}>
                  Tổng thu : {this.sum} VND
                </span>
              </Col>
              <Col offset={18}>
                {this.renderCreateNewButton(
                  <Button
                    type="primary"
                    onClick={() => this.onShowModifiedModal(false)}
                  >
                    <PlusOutlined /> {t("createNewButton")}
                  </Button>
                )}
              </Col>
            </Row>
          }
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
        >
          <ImportForm
            isEditing={this.isEditing}
            dataDetail={this.isEditing ? this.dataDetail : {}}
            categoryOptions={this.categoryOptions}
            uploadFile={uploadFile}
            loadingSave={isShowModifiedLoading}
            t={t}
          />
        </BasicModal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.importExports.importExportLoading,
  dataList: state.importExports.importExportDataList || {},
  categoryAutoComplete:
    state.importExports.categoryAutoCompleteImportExport || {},
});

const mapDispatchToProps = (dispatch) => ({
  getDataList: (payload) => dispatch(actions.getImportExportList(payload)),
  getDataById: (payload) => dispatch(actions.getImportExportById(payload)),
  updateData: (payload) => dispatch(actions.updateImportExport(payload)),
  deleteData: (payload) => dispatch(actions.deleteImportExport(payload)),
  createData: (payload) => dispatch(actions.createImportExport(payload)),
  uploadFile: (payload) => dispatch(actions.uploadFile(payload)),
  getCategoryAutoCompleteImportExport: (payload) =>
    dispatch(actions.getCategoryAutoCompleImportExport(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation(["importListPage", "listBasePage"])(importListPage));
