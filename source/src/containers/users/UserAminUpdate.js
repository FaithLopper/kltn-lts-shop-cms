import React from 'react';
// import ECatalogueLevel1Form from '../../components/eCatalogue/ECatalogueLevel1Form';
import AdminLevel1Form from '../../compoments/user/AdminLevel1Form';
import SaveBasePage from "../SaveBasePage";
import LoadingWrapper from '../../compoments/common/elements/LoadingWrapper';
import { connect } from 'react-redux';
// import { eCatalogueActions } from '../../redux/actions';
import { actions } from "../../actions";
import { convertUtcToLocalTime } from '../../utils/datetimeHelper';
import { showErrorMessage, showSucsessMessage } from "../../services/notifyService";
// import { siteConfig } from "../../constants/siteConfig";
import { sitePathConfig } from '../../constants/sitePathConfig';
// import ObjectNotFound from "../../components/common/ObjectNotFound";
import ObjectNotFound from '../../compoments/common/ObjectNotFound';
import { withTranslation } from "react-i18next";
import { UserTypes } from '../../constants';
class UserAminUpdate extends SaveBasePage {

    constructor(props) {
        super(props);
        this.objectName = 'userAdminForm';
        this.getListUrl = sitePathConfig.admin.path;
        const { t } = this.props;
        this.breadcrumbs = [
            {
                name:  t("breadcrumbs.currentPage"),
                path:`${sitePathConfig.admin.path}`
            },
            {
                name:  this.isEditing? `${t("breadcrumbsUpdatePage.currentPage")}`:`${t("breadcrumbsCreatePage.currentPage")}`,
            },
        ];
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id && nextProps.match.params.id !== this.props.match.params.id) {
            this.getDetail(nextProps.match.params.id);
        }
    }

    getDataDetailMapping = (data) => {
        const adminUserData = data

        if (!adminUserData) {
            this.setState({ objectNotFound: true });
            return
        }

        return {
            ...adminUserData,
        }
    }

    onGetDetailCompleted = ({ data }) => {
        this.dataDetail = this.getDataDetailMapping(data);
        this.setState({ isGetDetailLoading: false });
    }

    onInsertCompleted = (res) => {
        const { history } = this.props
        this.setIsChangedFormValues(false);
        if (res?.result) {
            this.showSuccessConfirmModal({
                onContinueEdit: () => {
                    history.push(sitePathConfig.adminUpdate.path.replace(':id', res.id))
                }
            })
        } else if (res?.Code === '-1' && (res?.Status || res?.status)) {
            this.showFailedConfirmModal({
                title: res?.Status || res?.status
            })

        } else {
            this.showFailedConfirmModal()
        }
    }

    onUpdateCompleted = (res) => {
        this.setIsChangedFormValues(false);
        if (res.result) {
            this.getDetail(this.dataId)
            this.showSuccessConfirmModal()
        } else if (res?.result === false) {
            this.showFailedConfirmModal({
                title: res?.message
            })

        } else {
            this.showFailedConfirmModal()
        }
    }

    handleRemoveImageField = (fieldName, onCompleted, onError) => {
        const { deleteBanner } = this.props
        const cataId = this.props.match.params.id
        const params = { imageField: fieldName, catId: cataId }
        deleteBanner({
            params,
            onCompleted: (res) => {
                showSucsessMessage(`${fieldName} had deleted successful!`)
                !!onCompleted && onCompleted(res)
            },
            onError: (res) => {
                showErrorMessage(`Deleting ${fieldName} failed. Please try again !`)
                !!onError && onError()
            },
        })
    }

    handleUploadImageField = (fieldName, file, onCompleted, onError) => {
        const { uploadBanner } = this.props
        const catId = this.props.match.params.id
        const fileObjects = {
            uploadFile: file
        }

        const params = { imageField: fieldName, catId, fileObjects }
        uploadBanner({
            params,
            onCompleted: (res) => {
                showSucsessMessage(`${fieldName} had uploaded successful!`)
                !!onCompleted && onCompleted(res)
            },
            onError: (res) => {
                showErrorMessage(`Upload ${fieldName} failed. Please try again !`)
                !!onError && onError()
            },
        })
    }

    onSaveError = (res) => {
        // Show error messages from API response
        if (res?.Code === '-1' && (res?.Status || res?.status)) {
            this.showFailedConfirmModal({
                title: res?.Status || res?.status
            })
        } else {
            this.showFailedConfirmModal()
        }

        this.setState({ isSubmitting: false })
    }

    onBack = () => {
        if (this.state.isChanged) {
            this.showWarningConfirmModal({
                title: "Are you sure want to quit? Your data will not be saved",
                onOk: () => {
                    this.props.history.push(this.getListUrl)
                }
            });
        } else {
            this.props.history.push(this.getListUrl)
        }
    }

    prepareCreateData = (data) => {
        return {
            ...data,
            kind:UserTypes.ADMIN
        };
    }

    prepareUpdateData = (data) => {
        return {
            ...data,
            kind:UserTypes.ADMIN,
            id: this.dataDetail.id
        };
    }

    onSaveCompleted = (responseData) => {
        this.setState({ isSubmitting: false });
        if (responseData?.data?.errors?.length) {
            this.onSaveError();
        }
        else {
            if (this.isEditing) {
                this.onUpdateCompleted(responseData);
            }
            else {
                this.onInsertCompleted(responseData);
            }
        }
    }

    render() {
        const { isGetDetailLoading, objectNotFound,  } = this.state
        const {t,uploadFile}= this.props
        if (objectNotFound) {
            console.log(objectNotFound)
            return <ObjectNotFound />
        }

        return (
            <LoadingWrapper loading={isGetDetailLoading}>
                <AdminLevel1Form
                    setIsChangedFormValues={this.setIsChangedFormValues}
                    formId={this.getFormId()}
                    onSubmit={this.onSave}
                    dataDetail={this.dataDetail}
                    isEditing={this.isEditing}
                    isLoadingAttribute={this.props.loading}
                    actions={this.renderActions()}
                    handleRemoveImage={this.handleRemoveImageField}
                    handleUploadImage={this.handleUploadImageField}
                    uploadFile={uploadFile}
                    t={t}
                />
            </LoadingWrapper>
        )
    }
}

const mapDispatchToProps = dispatch => ({
  getDataList: (payload) => dispatch(actions.getUserAdminList(payload)),
  getDataById: (payload) => dispatch(actions.getUserById(payload)),
  createData: (payload) => dispatch(actions.createUser(payload)),
  updateData: (payload) => dispatch(actions.updateUser(payload)),
  deleteData: (payload) => dispatch(actions.deleteAdmin(payload)),
  uploadFile: (payload) => dispatch(actions.uploadFile(payload)),
    // deleteBanner: payload => dispatch(eCatalogueActions.deleteBanner(payload)),
    // uploadBanner: payload => dispatch(eCatalogueActions.uploadBanner(payload))
})

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['userAdminListPage','listBasePage'])(UserAminUpdate));