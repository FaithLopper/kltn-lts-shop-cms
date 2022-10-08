import React from "react";
import { connect } from "react-redux";
import { Button, Avatar } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { withTranslation } from "react-i18next";

import ListBasePage from "../ListBasePage";
import BaseTable from "../../compoments/common/table/BaseTable";

import { actions } from "../../actions";
import { convertUtcToTimezone } from "../../utils/datetimeHelper";
import { AppConstants, UserTypes, GroupPermissonTypes, STATUS_ACTIVE } from "../../constants";
import PageWrapper from "../../compoments/common/PageWrapper";
import { Link } from 'react-router-dom';
import { sitePathConfig } from "../../constants/sitePathConfig";
import { FieldTypes } from "../../constants/formConfig";
import { commonStatus } from "../../constants/masterData";
class StoreListPage extends ListBasePage {
  initialSearch() {
    return { name: "", addressDetails: ""};
  }

  constructor(props) {
    super(props);
    const {t} = this.props;
    this.objectName =  t("objectName");
    this.objectListName = 'store';
    this.breadcrumbs = [{name: t('breadcrumbs.currentPage')}];
    this.columns = [
      { title:  t("table.name"), dataIndex: "name" },
      { title:  t("table.addressDetails"), dataIndex: "addressDetails" },
      { title:  t("table.location"), dataIndex: ["ward","name"],colSpan:3,width: '150px', },
      { title:  t("table.districtId"), dataIndex: ["district","name"],colSpan:0,width: '150px', },
      { title:  t("table.location"), dataIndex: ["province","name"],colSpan:0,width: '150px',},
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
        key: "name",
        seachPlaceholder: t('searchPlaceHolder.name'),
        initialValue: this.search.name,
      },
      {
        key: "addressDetails",
        seachPlaceholder: t('searchPlaceHolder.addressDetails'),
        initialValue: this.search.addressDetails,
      },
    ];
  }

  getDetailLink(dataRow) {
    return sitePathConfig.storeUpdate.path.replace(':id', dataRow.id);
  }

  render() {
    const {
      dataList,
      loading,
      uploadFile,
      t,
    } = this.props;
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
          <PlusOutlined /> {t("createNewButton", { var: this.objectName}) }
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
  loading: state.store.storeListLoading,
  dataList: state.store.storeListData || {},
});

const mapDispatchToProps = (dispatch) => ({
  getDataList: (payload) => dispatch(actions.getStoreList(payload)),
  getDataById: (payload) => dispatch(actions.getStoreById(payload)),
  createData: (payload) => dispatch(actions.createStore(payload)),
  updateData: (payload) => dispatch(actions.updateStore(payload)),
  deleteData: (payload) => dispatch(actions.deleteStore(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['storeListPage','listBasePage'])(StoreListPage));
