import React from "react";
import { connect } from "react-redux";
import { Button, Avatar, Divider } from "antd";
import {
  PlusOutlined,
  FileTextOutlined,
  PushpinFilled,
  UserOutlined,
  EyeOutlined,
  EditOutlined,
  LockOutlined,
  CheckOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import ListBasePage from "../ListBasePage";
import BaseTable from "../../compoments/common/table/BaseTable";
import BasicModal from "../../compoments/common/modal/BasicModal";
import { FieldTypes } from "../../constants/formConfig";
import { commonStatus } from "../../constants/masterData";
import { convertUtcToLocalTime } from "../../utils/datetimeHelper";
import { actions } from "../../actions";
import { AppConstants, DEFAULT_TABLE_ITEM_SIZE } from "../../constants";
import { withTranslation } from "react-i18next";
import { STATUS_ACTIVE } from "../../constants";
import { showErrorMessage } from "../../services/notifyService";
import { sitePathConfig } from "../../constants/sitePathConfig";
import ElementWithPermission from "../../compoments/common/elements/ElementWithPermission";
import StatusTag from "../../compoments/common/elements/StatusTag";
import { Link } from "react-router-dom";
class EmployeeListPage extends ListBasePage {
  initialSearch() {
    return {
      username: "",
      status: undefined,
      categoryDepartmentId: undefined,
      categoryOptionsJob: undefined,
    };
  }

  constructor(props) {
    super(props);
    const { t } = props;
    this.objectName = t("objectName");
    this.objectListName = "employee";
    this.breadcrumbs = [{ name: t("breadcrumbs.currentPage") }];
    this.pagination.pageSize = DEFAULT_TABLE_ITEM_SIZE;
    this.columns = [
      this.renderIdColumn(),
      {
        title: <div style={{ textAlign: "center" }}> # </div>,
        width: "5px",
        align: "center",
        dataIndex: ["account", "avatar"],
        render: (avatar) => (
          <Avatar
            className="customer-avatar"
            size="large"
            icon={<UserOutlined />}
            src={avatar ? `${AppConstants.contentRootUrl}${avatar}` : null}
          />
        ),
      },
      {
        title: t("table.username"),
        dataIndex: ["account", "username"],
        width: "130px",
      },
      {
        title: t("table.fullName"),
        dataIndex: ["account", "fullName"],
        width: "130px",
      },
      {
        title: t("table.email"),
        dataIndex: ["account", "email"],
        width: "130px",
      },
      {
        title: t("table.phone"),
        dataIndex: ["account", "phone"],
        width: "130px",
      },
      {
        title: t("table.departmentTitle"),
        dataIndex: ["department", "categoryName"],
        width: "150px",
      },
      {
        title: t("table.jobTitle"),
        dataIndex: ["job", "categoryName"],
        width: "150px",
      },
      // {
      //   title: (
      //     <div style={{ paddingRight: "20px" }}>{t("table.createdDate")}</div>
      //   ),
      //   align: "right",
      //   width: 80,
      //   dataIndex: ["account", "createdDate"],
      //   render: (createdDate) => (
      //     <div style={{ paddingRight: "20px" }}>
      //       {convertUtcToLocalTime(createdDate)}
      //     </div>
      //   ),
      // },
      this.renderStatusColumn(),
      this.renderActionColumn(),
    ];

    this.actionColumns = {
      isEdit: true,
      isDelete: true,
      isChangeStatus: false,
    };

    this.categoryOptionsJob = [];
    this.categoryOptionsDepartment = [];
    this.getCategoryList();
  }

  renderStatusColumn() {
    const { t } = this.props;
    return {
      title: t ? t("listBasePage:titleStatusCol") : "Status",
      dataIndex: ["account", "status"],
      width: "100px",
      render: (status) => <StatusTag status={status} />,
    };
  }

  getUserEmployDetailById(id) {
    const { showFullScreenLoading, hideFullScreenLoading, getDataById } =
      this.props;
    const params = { id };
    showFullScreenLoading();
    getDataById({
      params,
      onCompleted: ({ data }) => {
        this.dataDetail = this.getDataDetailMapping(data);
        this.onShowPreviewModal();
        hideFullScreenLoading();
      },
      onError: (err) => {
        if (err && err.message) showErrorMessage(err.message);
        else
          showErrorMessage(
            `${this.getActionName()} ${
              this.objectName
            } failed. Please try again!`
          );
        hideFullScreenLoading();
      },
    });
  }

  renderUserEmployDetailButton(children) {
    // re check this shit
    const pathname = sitePathConfig.employee.path;
    const requiredPermissions = [];
    Object.keys(sitePathConfig) &&
      Object.keys(sitePathConfig).forEach((key) => {
        if (sitePathConfig[key].path === pathname) {
          requiredPermissions.push(sitePathConfig[key].permissions[1]); //Get by id
        }
      });
    return (
      <ElementWithPermission permissions={requiredPermissions}>
        {children}
      </ElementWithPermission>
    );
  }

  onShowPreviewModal = () => {
    this.setState({ isShowPreviewModal: true });
  };

  onCancelPreviewModal = () => {
    this.setState({ isShowPreviewModal: false, isShowPreviewLoading: false });
  };

  renderActionColumn() {
    const { t } = this.props;
    return {
      title: t ? t("listBasePage:titleActionCol") : "Action",
      width: "100px",
      align: "center",
      render: (dataRow) => {
        const actionColumns = [];
        if (this.actionColumns.isEdit) {
          actionColumns.push(
            this.renderEditButton(
              <Link to={this.getDetailLink(dataRow)}>
                <Button type="link" className="no-padding">
                  <EditOutlined />
                </Button>
              </Link>
            )
          );
        }
        if (this.actionColumns.isChangeStatus) {
          actionColumns.push(
            <Button
              type="link"
              onClick={() => this.showChangeStatusConfirm(dataRow)}
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
                onClick={() => this.showDeleteConfirm(dataRow.id)}
                className="no-padding"
              >
                <DeleteOutlined />
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
  }

  getSearchFields() {
    const { t } = this.props;
    return [
      {
        key: "username",
        seachPlaceholder: t("searchPlaceHolder.username"),
        initialValue: this.search.username,
      },
      {
        key: "fullName",
        seachPlaceholder: t("searchPlaceHolder.fullName"),
        initialValue: this.search.fullName,
      },
      // {
      //   key: "categoryJobId",
      //   seachPlaceholder: t("searchPlaceHolder.categoryJobId"),
      //   fieldType: FieldTypes.SELECT,
      //   options: [...this.categoryOptionsJob],
      //   initialValue: this.search.categoryJobId,
      // },
      // {
      //   key: "categoryDepartmentId",
      //   seachPlaceholder: t("searchPlaceHolder.categoryDepartmentId"),
      //   fieldType: FieldTypes.SELECT,
      //   options: [...this.categoryOptionsDepartment],
      //   initialValue: this.search.categoryDepartmentId,
      // },
      {
        key: "status",
        seachPlaceholder: t("searchPlaceHolder.status"),
        fieldType: FieldTypes.SELECT,
        options: commonStatus,
        initialValue: this.search.status,
      },
    ];
  }

  getDataDetailMapping(data) {
    return {
      ...data,
      content:
        data.content &&
        data.content.replaceAll("{{baseUrl}}", AppConstants.contentRootUrl),
    };
  }

  prepareCreateData(data) {
    return {
      ...data,
      kind: 1,
      pinTop: data.pinTop ? 1 : 0,
      content:
        data.content &&
        data.content.replaceAll(AppConstants.contentRootUrl, "{{baseUrl}}"),
    };
  }

  prepareUpdateData(data) {
    return {
      ...data,
      id: this.dataDetail.id,
      pinTop: data.pinTop ? 1 : 0,
      content:
        data.content &&
        data.content.replaceAll(AppConstants.contentRootUrl, "{{baseUrl}}"),
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

  getDetailLink(dataRow) {
    return sitePathConfig.employeeUpdate.path.replace(":id", dataRow.id);
  }

  getCategoryList() {
    this.props.getCategoryAutoComplete({ kind: 2 });
    this.props.getCategoryAutoComplete({ kind: 3 });
  }

  render() {
    const {
      dataList,
      loading,
      categoryAutoCompleteJob,
      categoryAutoCompleteDepartment,
      t,
    } = this.props;
    const employee = dataList.data || [];
    this.pagination.total = dataList.totalElements || 0;

    this.categoryOptionsJob = categoryAutoCompleteJob.data
      ? categoryAutoCompleteJob.data.map((c) => {
          return {
            value: c.id,
            label: c.categoryName,
          };
        })
      : [];

    this.categoryOptionsDepartment = categoryAutoCompleteDepartment.data
      ? categoryAutoCompleteDepartment.data.map((c) => {
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
          {this.renderCreateNewButton(
            <Link to={this.getCreateLink()}>
              <Button type="primary">
                <PlusOutlined />
                {t("createNewButton", { var: t(`constants:${"News"}`, "") })}
              </Button>
            </Link>
          )}
        </div>
        <BaseTable
          columns={this.columns}
          rowKey={(record) => record.id}
          dataSource={employee}
          pagination={this.pagination}
          onChange={this.handleTableChange}
          loading={loading}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.employee.tbUserEmployLoading,
  dataList: state.employee.userEmployListData || {},
  categoryAutoCompleteJob: state.category.categoryAutoCompleteJob || {},
  categoryAutoCompleteDepartment:
    state.category.categoryAutoCompleteDepartment || {},
});

const mapDispatchToProps = (dispatch) => ({
  getDataList: (payload) => dispatch(actions.getUserEmployList(payload)),
  // getDataById: (payload) => dispatch(actions.getUserEmployById(payload)),
  // createData: (payload) => dispatch(actions.createNews(payload)),
  // updateData: (payload) => dispatch(actions.updateNews(payload)),
  deleteData: (payload) => dispatch(actions.deleteUserEmploy(payload)),
  getCategoryAutoComplete: (payload) =>
    dispatch(actions.getCategoryAutoComplete(payload)),
  uploadFile: (payload) => dispatch(actions.uploadFile(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTranslation(["userEmployListPage", "listBasePage", "constants"])(
    EmployeeListPage
  )
);
