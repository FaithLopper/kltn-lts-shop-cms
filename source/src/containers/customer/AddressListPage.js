import React from "react";
import { connect } from "react-redux";
import { Button, Avatar } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { withTranslation } from "react-i18next";
import qs from 'query-string'
import ListBasePage from "../ListBasePage";
import BaseTable from "../../compoments/common/table/BaseTable";

import { actions } from "../../actions";
import { convertUtcToTimezone } from "../../utils/datetimeHelper";
import { AppConstants, UserTypes, GroupPermissonTypes, STATUS_ACTIVE } from "../../constants";
import PageWrapper from "../../compoments/common/PageWrapper";
import { Link } from 'react-router-dom';
import { sitePathConfig } from "../../constants/sitePathConfig";
import StatusTag from "../../compoments/common/elements/StatusTag";
class AddressListPage extends ListBasePage {
  initialSearch() {
    return { username: "", fullName: "" };
  }

  constructor(props) {
    super(props);
    const {t,location: { search } } = this.props;
    this.objectName =  t("objectName");
    this.objectListName = 'address';
    const {customerId} = qs.parse(search);
    this.customerId=customerId
    this.breadcrumbs = [{name: t('breadcrumbs.currentPage')}];
    this.columns = [
      this.renderIdColumn(),
      { title:  t("table.addressDetails"), dataIndex: "addressDetails"},
      { title:  t("table.province"), dataIndex: "province"},
      { title:  t("table.district"), dataIndex: "district"},
      { title:  t("table.ward"), dataIndex: "ward"},
      this.renderActionColumn(),
    ];
    this.actionColumns = {
      isEdit: true,
      isDelete: true,
      isChangeStatus: false,
    };

  }

  getSearchFields() {
    const {t} = this.props;
    return [
      {
        key: "username",
        seachPlaceholder: t('searchPlaceHolder.username'),
        initialValue: this.search.username,
      },
      {
        key: "fullName",
        seachPlaceholder: t('searchPlaceHolder.fullName'),
        initialValue: this.search.fullName,
      },
    ];
  }

  getDetailLink(dataRow) {
    return sitePathConfig.adminUpdate.path.replace(':id', dataRow.id);
  }
  
  getList() {
    const { getDataList } = this.props;
    const page = this.pagination.current ? this.pagination.current - 1 : 0;
    const params = { page, size: this.pagination.pageSize,customerId:this.customerId, search: this.search,};
    getDataList({ params });
  }

  render() {
    const {
      dataList,
      loading,
      uploadFile,
      t,
    } = this.props;
    const { isShowModifiedModal, isShowModifiedLoading } = this.state;
    const users = dataList.data || [];
    this.pagination.total = dataList.totalElements || 0;
    return (
      
        <PageWrapper>
              {this.renderSearchForm()}
        <div className="action-bar">
          {this.renderCreateNewButton((
          <Link to={this.getCreateLink()}>
          <Button
          type="primary"
        >
          <PlusOutlined /> {t("createNewButton", { var: t(`objectName`, "") })}
        </Button></Link>
          ))}
        </div>
        <BaseTable
          loading={loading}
          columns={this.columns}
          rowKey={(record) => record.id}
          dataSource={users}
          pagination={this.pagination}
          onChange={this.handleTableChange}
        />
        </PageWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.address.addressLoading,
  dataList: state.address.addressData || {}
});

const mapDispatchToProps = (dispatch) => ({
  getDataList: (payload) => dispatch(actions.getAddressList(payload)),
  getDataById: (payload) => dispatch(actions.getAddressById(payload)),
  createData: (payload) => dispatch(actions.createAddress(payload)),
  updateData: (payload) => dispatch(actions.updateAddress(payload)),
  deleteData: (payload) => dispatch(actions.deleteAddress(payload)),
  // uploadFile: (payload) => dispatch(actions.uploadFile(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['addressListPage','listBasePage'])(AddressListPage));
