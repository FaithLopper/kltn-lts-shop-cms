import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import ListBasePage from "../ListBasePage";
import GroupPermissionForm from "../../compoments/groupPermission/GroupPermissionForm";
import BaseTable from "../../compoments/common/table/BaseTable";
import BasicModal from "../../compoments/common/modal/BasicModal";
import { sitePathConfig } from "../../constants/sitePathConfig";
import { actions } from "../../actions";
import PageWrapper from "../../compoments/common/PageWrapper";

class GroupPermissionListPage extends ListBasePage {
  initialSearch() {
    return {name: ""};
  }

  constructor(props) {
    super(props);
    const { t } = props;
    this.objectName = t("objectName");
    this.breadcrumbs = [{ name: t("breadcrumbs.currentPage") }];
    this.columns = [
      this.renderIdColumn(),
      { title: t("table.name"), dataIndex: "name" },
      { title: t("table.description"), dataIndex: "description", width: "200px" },
      this.renderActionColumn(),
    ];
    this.actionColumns = {
      isEdit: true,
      isDelete: false,
      isChangeStatus: false,
    };
  }

  getSearchFields() {
    const { t } = this.props;
    return [
      {
        key: "name",
        seachPlaceholder: t("searchPlaceholder.name"),
        initialValue: this.search.group,
      },
    ];
  }

  getDataDetailMapping(data) {
    return {
        ...data,
        permissions: data.permissions ? data.permissions.map(permission => permission.id) : []
    }
  }

  // getDetailLink(dataRow) {
  //   return sitePathConfig.adminUpdate.path.replace(':id', dataRow.id);
  // }

  render() {
    const {
      dataList,
      loading,
      permissions,
      t,
    } = this.props;
    const { isShowModifiedModal, isShowModifiedLoading } = this.state;
    const groupPermissions = dataList.data || [];
    this.pagination.total = dataList.totalElements || 0;
    const permissionsList = permissions.data || [];

    return (
        <PageWrapper>
        {this.renderSearchForm()}
        <div className="action-bar">
        </div>
        <BaseTable
          loading={loading}
          columns={this.columns}
          rowKey={(record) => record.id}
          dataSource={groupPermissions}
          pagination={this.pagination}
          onChange={this.handleTableChange}
        />
      </PageWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.groupPermission.tbGroupPermissionLoading,
  dataList: state.groupPermission.groupPermissionData || {},
  permissions: state.groupPermission.permissions || {},
});

const mapDispatchToProps = (dispatch) => ({
  getDataList: (payload) => dispatch(actions.getGroupPermissionList(payload)),
  getDataById: (payload) => dispatch(actions.getGroupPermissionById(payload)),
  createData: (payload) => dispatch(actions.createGroupPermission(payload)),
  updateData: (payload) => dispatch(actions.updateGroupPermission(payload)),
  getPermissionList: (payload) => dispatch(actions.getPermissionList(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['groupPermissionListPage','listBasePage','constants', 'basicModal'])(GroupPermissionListPage));
