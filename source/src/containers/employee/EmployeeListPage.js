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
import { Link } from "react-router-dom";
class EmployeeListPage extends ListBasePage {
  initialSearch() {
    return { title: "", status: undefined, categoryId: undefined };
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
        align: 'center',
        dataIndex: ['account','avatar'],
        render: (avatar) => (
          <Avatar
            className="customer-avatar"
            size="large"
            icon={<UserOutlined />}
            src={avatar ? `${AppConstants.contentRootUrl}${avatar}` : null}
          />
        ),
      },
      { title: t("table.title"), dataIndex: "title",width: "250px" },
      {
        title: t("table.employee"),
        dataIndex: "employeeId",
        width: "250px",
        render: (categoryId) => {
          let selectedCategory;
          if (this.categoryOptions.length > 0) {
            selectedCategory = this.categoryOptions.find(
              (e) => e.value === categoryId
            );
          }
          return <span>{selectedCategory ? selectedCategory.label : ""}</span>;
        },
      },
      {
        title: t("table.pinTop"),
        dataIndex: "pinTop",
        width: "250px",
        align: "center",
        render: (pinTop) => (
          <PushpinFilled style={{ color: pinTop === 1 ? "green" : "#ccc" }} />
        ),
      },
      {
        title: (
          <div style={{ paddingRight: "20px" }}>{t("table.createdDate")}</div>
        ),
        align: "right",
        width: 135,
        dataIndex: "createdDate",
        render: (createdDate) => (
          <div style={{ paddingRight: "20px" }}>
            {convertUtcToLocalTime(createdDate)}
          </div>
        ),
      },
      this.renderStatusColumn(),
      this.renderActionColumn(),
    ];
    this.actionColumns = {
      isEdit: true,
      isDelete: true,
      isChangeStatus: false,
      isPreview: true,
    };
    this.props.getCategoryAutoCompleteNews({ kind: 1 });
    this.categoryOptions = [];
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

  renderUserEmployDetailButton(children) { // re check this shit
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
        if (this.actionColumns.isPreview) {
          actionColumns.push(
            this.renderUserEmployDetailButton(
              <Button
                type="link"
                onClick={() => this.getNewsDetailById(dataRow.id)}
                className="no-padding"
              >
                <EyeOutlined />
              </Button>
            )
          );
        }
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
        key: "title",
        seachPlaceholder: t("searchPlaceHolder.title"),
        initialValue: this.search.title,
      },
      {
        key: "categoryId",
        seachPlaceholder: t("searchPlaceHolder.category"),
        fieldType: FieldTypes.SELECT,
        options: [...this.categoryOptions],
        initialValue: this.search.categoryId,
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
      kind: 1,
    };
    getDataList({ params });
  }

  getDetailLink(dataRow) {
    return sitePathConfig.adminNewsUpdate.path.replace(":id", dataRow.id);
  }

  render() {
    const { dataList, loading, categoryAutoCompleteNews, t } =
      this.props;
    const {
      isShowPreviewModal,
      isShowPreviewLoading,
    } = this.state;
    const employee = dataList.data || [];
    console.log(employee)
    this.pagination.total = dataList.totalElements || 0;
    this.categoryOptions = categoryAutoCompleteNews.data
      ? categoryAutoCompleteNews.data.map((c) => {
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
  categoryAutoCompleteNews: state.news.categoryAutoCompleteNews || {},
});

const mapDispatchToProps = (dispatch) => ({
  getDataList: (payload) => dispatch(actions.getUserEmployList(payload)),
  // getDataById: (payload) => dispatch(actions.getUserEmployById(payload)),
  // createData: (payload) => dispatch(actions.createNews(payload)),
  // updateData: (payload) => dispatch(actions.updateNews(payload)),
  // deleteData: (payload) => dispatch(actions.deleteNews(payload)),
  getCategoryAutoCompleteNews: (payload) =>
    dispatch(actions.getCategoryAutoCompleteNews(payload)),
  uploadFile: (payload) => dispatch(actions.uploadFile(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTranslation(["adminNewsListPage", "listBasePage", "constants"])(
    EmployeeListPage
  )
);
