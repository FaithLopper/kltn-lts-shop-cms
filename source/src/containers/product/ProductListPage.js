import React from "react";
import { connect } from "react-redux";
import { Button, Avatar, Divider } from "antd";
import { PlusOutlined, UserOutlined,MessageOutlined,EditOutlined,LockOutlined,DeleteOutlined,CheckOutlined,HomeOutlined } from "@ant-design/icons";
import { withTranslation } from "react-i18next";

import ListBasePage from "../ListBasePage";
import BaseTable from "../../compoments/common/table/BaseTable";

import { actions } from "../../actions";
import { convertUtcToTimezone } from "../../utils/datetimeHelper";
import { AppConstants, UserTypes, GroupPermissonTypes, STATUS_ACTIVE } from "../../constants";
import PageWrapper from "../../compoments/common/PageWrapper";
import { Link } from 'react-router-dom';
import { sitePathConfig } from "../../constants/sitePathConfig";
import ElementWithPermission from "../../compoments/common/elements/ElementWithPermission";
class ProductListPage extends ListBasePage {
  initialSearch() {
    return { name: "", value: ""};
  }

  constructor(props) {
    super(props);
    const {t} = this.props;
    this.objectName =  t("objectName");
    this.objectListName = 'product';
    this.breadcrumbs = [{name: t('breadcrumbs.currentPage')}];
    this.columns = [
      { title:  t("table.name"), dataIndex: "name"},
      { title:  t("table.price"), align:"right",dataIndex: "price"},
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
      // {
      //   key: "value",
      //   seachPlaceholder: t('searchPlaceHolder.value'),
      //   initialValue: this.search.value,
      // },
    ];
  }

  getDetailLink(dataRow) {
    return sitePathConfig.productUpdate.path.replace(':id', dataRow.id);
  }


  render() {
    const {
      dataList,
      loading,
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
  loading: state.product.productListLoading,
  dataList: state.product.productListData || {},
  customerAutoComplete:state.product.productAutoComplete || {}
});

const mapDispatchToProps = (dispatch) => ({
  getDataList: (payload) => dispatch(actions.getProductList(payload)),
  getDataById: (payload) => dispatch(actions.getProductById(payload)),
  deleteData: (payload) => dispatch(actions.deleteProduct(payload)),
  // uploadFile: (payload) => dispatch(actions.uploadFile(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['productListPage','listBasePage'])(ProductListPage));
