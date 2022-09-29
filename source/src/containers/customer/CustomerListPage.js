import React from "react";
import { connect } from "react-redux";
import { Button, Avatar, Divider } from "antd";
import { PlusOutlined, UserOutlined,MessageOutlined,EditOutlined,LockOutlined,DeleteOutlined,CheckOutlined } from "@ant-design/icons";
import { withTranslation } from "react-i18next";

import ListBasePage from "../ListBasePage";
import BaseTable from "../../compoments/common/table/BaseTable";

import { actions } from "../../actions";
import { convertUtcToTimezone } from "../../utils/datetimeHelper";
import { AppConstants, UserTypes, GroupPermissonTypes, STATUS_ACTIVE } from "../../constants";
import PageWrapper from "../../compoments/common/PageWrapper";
import { Link } from 'react-router-dom';
import { sitePathConfig } from "../../constants/sitePathConfig";
import StatusTag from "../../compoments/common/elements/StatusTag";
import ElementWithPermission from "../../compoments/common/elements/ElementWithPermission";
class CustomerListPage extends ListBasePage {
  initialSearch() {
    return { username: "", fullName: "" };
  }

  constructor(props) {
    super(props);
    const {t} = this.props;
    this.objectName =  t("objectName");
    this.objectListName = 'customer';
    this.breadcrumbs = [{name: t('breadcrumbs.currentPage')}];
    this.columns = [
      this.renderIdColumn(),
      {
        title: "#",
        dataIndex: ["account","avatar"],
        align: 'center',
        render: (avatar) => (
          <Avatar
            size="large"
            icon={<UserOutlined />}
            src={avatar ? `${AppConstants.contentRootUrl}${avatar}` : null}
          />
        ),
      },
      { title:  t("table.fullName"), dataIndex: ["account", "fullName"]},
      { title:  t("table.phone"),  dataIndex: ["account", "phone"]},
      { title: "E-mail",  dataIndex: ["account", "email"], width: "200px" },
      this.renderStatusColumn(),
      this.renderActionColumn(),
    ];
    this.actionColumns = {
      isEdit: true,
      isDelete: true,
      isChangeStatus: false,
    };

  }

  renderStatusColumn() {
    const { t } = this.props;
    return {
        title: t ? t('listBasePage:titleStatusCol') : 'Status',
        dataIndex: ['account','status'],
        width: '100px',
        render: (status) => <StatusTag status={status}/>
    }
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
    return sitePathConfig.customerUpdate.path.replace(':id', dataRow.id);
  }

  renderActionColumn() {
    const { t } = this.props;
    return {
        title: t ? t('listBasePage:titleActionCol') : 'Action',
        width: '100px',
        align: 'center',
        render: (dataRow) => {
            const actionColumns = [];
            
            let toGo = `${sitePathConfig.address.path}?customerId=${dataRow.id}`
            actionColumns.push(
                      <Link to={toGo}>

              <Button type="link" className="no-padding">
                      <MessageOutlined />
                  </Button>
                      </Link>
              )
              if (this.actionColumns.isEdit) {               
                const detailLink = this.getDetailLink(dataRow);
                let to = {
                    state: { prevPath: this.props.location.pathname }
                }
                if (typeof detailLink === 'object') {
                    to = {
                        ...to,
                        ...detailLink,
                    }
                } else {
                    to.pathname = detailLink;
                }
                actionColumns.push(
                    <Link to={to}>
                        <Button type="link" className="no-padding">
                            <EditOutlined color="red" />
                        </Button>
                    </Link>
                )
            }
            if(this.actionColumns.isChangeStatus) {
                actionColumns.push(
                    <Button type="link" onClick={(e) => {
                        e.stopPropagation()
                        this.showChangeStatusConfirm(dataRow)
                    }} className="no-padding">
                        {
                            dataRow.status === STATUS_ACTIVE
                            ?
                            <LockOutlined/>
                            :
                            <CheckOutlined/>
                        }
                    </Button>
                )
            }
            if(this.actionColumns.isDelete) {
                actionColumns.push(
                    this.renderDeleteButton((
                        <Button type="link" onClick={(e) => {
                            e.stopPropagation()
                            this.showDeleteConfirm(dataRow.id)
                        }} className="no-padding">
                            { this.actionColumns.isDelete.icon || <DeleteOutlined/> }
                        </Button>
                    ))
                )
            }
            const actionColumnsWithDivider = [];
            actionColumns.forEach((action, index) => {
                actionColumnsWithDivider.push(action);
                if(index !== (actionColumns.length -1))
                {
                    actionColumnsWithDivider.push(<Divider type="vertical" />);
                }
            })
            return (
                <span>
                    {
                        actionColumnsWithDivider.map((action, index) => <span key={index}>{action}</span>)
                    }
                </span>
            )
        }
    }  
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
  loading: state.customer.customerLoading,
  dataList: state.customer.customerData || {},
  customerAutoComplete:state.customer.customerAutoCompleteData || {}
});

const mapDispatchToProps = (dispatch) => ({
  getDataList: (payload) => dispatch(actions.getCustomerList(payload)),
  getDataById: (payload) => dispatch(actions.getCustomerById(payload)),
  createData: (payload) => dispatch(actions.createCustomer(payload)),
  updateData: (payload) => dispatch(actions.updateCustomer(payload)),
  deleteData: (payload) => dispatch(actions.deleteCustomer(payload)),
  // uploadFile: (payload) => dispatch(actions.uploadFile(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['customerListPage','listBasePage'])(CustomerListPage));
