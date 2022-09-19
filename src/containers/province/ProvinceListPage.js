import React, { Component } from "react";
import ListBasePage from "../ListBasePage";
import { connect } from "react-redux";
import { actions } from "../../actions/province";
import BaseTable from "../../compoments/common/table/BaseTable";
import { withTranslation } from "react-i18next";
import { Button, Avatar } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import BasicModal from "../../compoments/common/modal/BasicModal";
import ProvinceForm from "../../compoments/province/ProvinceForm";
import { FieldTypes } from "../../constants/formConfig";
import qs from "query-string";
class ProvinceListPage extends ListBasePage {
  initialSearch() {
    return { province: "" };
  }
  constructor(props) {
    super(props);
    const { t } = props;
    this.breadcrumbs = [{ name: t("breadcrumbs.currentPage") }];
    this.objectName = t("objectName");

    this.columns = [
      this.renderIdColumn(),
      {
        title: t("table.provinceName"),
        render: (dataRow) => {
          return (
            <span
              className="routing"
              onClick={() => {
                this.handleRouting(dataRow.id, dataRow.provinceName);
              }}
            >
              {dataRow.provinceName}
            </span>
          );
        },
      },

      this.renderActionColumn(),
    ];
    this.actionColumns = {
      isEdit: true,
      isDelete: true,
      isChangeStatus: false,
    };
    this.props.getProvinceAutoComple({});
  }
  handleRouting(provinceId, provinceName) {
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
      `${pathname}-district?${qs.stringify({
        ...result,
        provinceId,
        provinceName,
      })}`
    );
  }
  getSearchFields() {
    const { t } = this.props;
    return [
      {
        key: "name",
        seachPlaceholder: t("searchPlaceHolder.province"),
        initialValue: this.search.province,
      },
    ];
  }
  prepareCreateData(data) {
    return {
      ...data,
    };
  }
  prepareUpdateData(data) {
    return {
      id: data.id,
      provinceName: data.provinceName,
    };
  }
  getList() {
    const { getDataList } = this.props;
    const page = this.pagination.current ? this.pagination.current - 1 : 0;
    const params = {
      page,
      size: this.pagination.pageSize,
      search: this.search,
    };
    getDataList({ params });
  }
  render() {
    const { loading, dataList, t } = this.props;
    const provinces = dataList.data || [];

    this.pagination.total = dataList.totalElements || 0;
    const {
      isShowModifiedModal,
      isShowModifiedLoading,
      isShowPreviewModal,
      isShowPreviewLoading,
    } = this.state;
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
              {t("createNewButton", { var: t(`constants:${"Province"}`, "") })}
            </Button>
          )}
        </div>
        <BaseTable
          columns={this.columns}
          rowkey={(record) => record.id}
          dataSource={provinces}
          pagination={this.pagination}
          onChange={this.handleTableChange}
          loading={loading}
        />
        <BasicModal
          visible={isShowModifiedModal}
          isEditing={this.isEditing}
          objectName={this.objectName}
          loading={isShowModifiedLoading}
          onOk={this.onOkModal}
          onCancel={this.onCancelModal}
        >
          <ProvinceForm
            visible={isShowModifiedModal}
            dataDetail={this.isEditing ? this.dataDetail : {}}
            isEditing={this.isEditing}
            objectName={this.objectName}
            loading={isShowModifiedLoading}
            onOk={this.onOkModal}
            onCancel={this.onCancelModal}
            t={t}
          />
        </BasicModal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.province.provinceLoading,
  dataList: state.province.provinceData || {},
});
const mapDispatchToProps = (dispatch) => ({
  getDataList: (payload) => dispatch(actions.getProvinceList(payload)),
  getProvinceAutoComple: (payload) =>
    dispatch(actions.getProvinceAutocomple(payload)),
  getDataById: (payload) => dispatch(actions.getProvinceById(payload)),
  createData: (payload) => dispatch(actions.createProvince(payload)),
  updateData: (payload) => dispatch(actions.updateProvince(payload)),
  deleteData: (payload) => dispatch(actions.deleteProvince(payload)),
});

// export default ProvinceListPage;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation(["provinceListPage", "listBasePage"])(ProvinceListPage));
