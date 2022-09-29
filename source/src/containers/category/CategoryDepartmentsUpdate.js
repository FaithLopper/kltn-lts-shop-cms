import React from "react";
import CategoryUpdateForm from "../../compoments/category/CategoryUpdateForm";
import SaveBasePage from "../SaveBasePage";
import LoadingWrapper from "../../compoments/common/elements/LoadingWrapper";
import { connect } from "react-redux";
// import { eCatalogueActions } from '../../redux/actions';
import { actions } from "../../actions";
import { convertUtcToLocalTime } from "../../utils/datetimeHelper";
import {
  showErrorMessage,
  showSucsessMessage,
} from "../../services/notifyService";
// import { siteConfig } from "../../constants/siteConfig";
import { sitePathConfig } from "../../constants/sitePathConfig";
// import ObjectNotFound from "../../components/common/ObjectNotFound";
import ObjectNotFound from "../../compoments/common/ObjectNotFound";
import { withTranslation } from "react-i18next";
import { UserTypes } from "../../constants";
import { categoryKinds } from "../../constants/masterData";
class CategoryDepartmentsUpdate extends SaveBasePage {
  constructor(props) {
    super(props);
    const { t } = this.props;
    this.objectName = `${t("objectName")} ${t("kind.departments")}`;
    this.getListUrl = sitePathConfig.categoryDepartments.path;
    this.actionFooter = false;
    this.breadcrumbs = [
      {
        name: `${t("breadcrumbs.parentPage")} ${t("kind.departments")}`,
        path: `${sitePathConfig.categoryDepartments.path}`,
      },
      {
        name: this.isEditing
          ? `${t(`listBasePage:${"update"}`)} ${this.objectName} ${this.dataId}`
          : `${t(`listBasePage:${"create"}`)} ${this.objectName}`,
      },
    ];
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.match.params.id &&
      nextProps.match.params.id !== this.props.match.params.id
    ) {
      this.getDetail(nextProps.match.params.id);
    }
  }

  getDataDetailMapping = (data) => {
    const categoryDepartmentsData = data;

    if (!categoryDepartmentsData) {
      this.setState({ objectNotFound: true });
      return;
    }

    return {
      ...categoryDepartmentsData,
    };
  };

  onGetDetailCompleted = ({ data }) => {
    this.dataDetail = this.getDataDetailMapping(data);
    this.setState({ isGetDetailLoading: false });
  };

  onInsertCompleted = (res) => {
    const { history } = this.props;
    this.setIsChangedFormValues(false);
    if (res?.result) {
      this.showSuccessConfirmModal({
        onContinueEdit: () => {
          history.push(
            sitePathConfig.categoryDepartmentsUpdate.path.replace(":id", res.id)
          );
        },
      });
    } else if (res?.result === false) {
      this.showFailedConfirmModal({
        title: res?.message,
      });
    } else {
      this.showFailedConfirmModal();
    }
  };

  onUpdateCompleted = (res) => {
    this.setIsChangedFormValues(false);
    if (res.result) {
      this.getDetail(this.dataId);
      this.showSuccessConfirmModal();
    } else if (res?.result === false) {
      this.showFailedConfirmModal({
        title: res?.message,
      });
    } else {
      this.showFailedConfirmModal();
    }
  };

  onBack = () => {
    if (this.state.isChanged) {
      this.showWarningConfirmModal({
        title: "Are you sure want to quit? Your data will not be saved",
        onOk: () => {
          this.props.history.push(this.getListUrl);
        },
      });
    } else {
      this.props.history.push(this.getListUrl);
    }
  };

  prepareCreateData = (data) => {
    console.log("create data", data);
    return {
      categoryKind: categoryKinds.CATEGORY_KIND_DEPARTMENTS,
      status: 1,
      ...data,
    };
  };

  prepareUpdateData = (data) => {
    console.log("update data", data);
    return {
      ...data,
      categoryImage: data.categoryImage,
      id: this.dataDetail.id,
    };
  };

  onSaveCompleted = (responseData) => {
    this.setState({ isSubmitting: false });
    if (responseData?.data?.errors?.length) {
      this.onSaveError();
    } else {
      if (this.isEditing) {
        this.onUpdateCompleted(responseData);
      } else {
        this.onInsertCompleted(responseData);
      }
    }
  };

  render() {
    const { isGetDetailLoading, objectNotFound } = this.state;
    const { t, uploadFile } = this.props;
    if (objectNotFound) {
      return <ObjectNotFound />;
    }

    return (
      <LoadingWrapper loading={isGetDetailLoading}>
        <CategoryUpdateForm
          setIsChangedFormValues={this.setIsChangedFormValues}
          formId={this.getFormId()}
          onSubmit={this.onSave}
          dataDetail={this.isEditing ? this.dataDetail : {}}
          isEditing={this.isEditing}
          isLoadingAttribute={this.props.loading}
          actions={this.renderActions()}
          handleRemoveImage={this.handleRemoveImageField}
          handleUploadImage={this.handleUploadImageField}
          uploadFile={uploadFile}
          t={t}
        />
      </LoadingWrapper>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getDataById: (payload) => dispatch(actions.getCategoryById(payload)),
  createData: (payload) => dispatch(actions.createCategory(payload)),
  updateData: (payload) => dispatch(actions.updateCategory(payload)),
  deleteData: (payload) => dispatch(actions.deleteCategory(payload)),
  uploadFile: (payload) => dispatch(actions.uploadFile(payload)),
});

const mapStateToProps = (state) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation(["categoryListPage", "listBasePage"])(CategoryDepartmentsUpdate));