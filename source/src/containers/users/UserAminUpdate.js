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
        const { t } = this.props;
        this.objectName =  t("objectName");
        this.getListUrl = sitePathConfig.admin.path;
        this.breadcrumbs = [
            {
                name:  t("breadcrumbs.parentPage"),
                path:`${sitePathConfig.admin.path}`
            },
            {
                name:  this.isEditing? `${t(`listBasePage:${"update"}`)} ${this.objectName}` :`${t(`listBasePage:${"create"}`)} ${this.objectName}`,
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
        console.log(res)
        this.setIsChangedFormValues(false);
        if (res?.result) {
            this.showSuccessConfirmModal({
                onContinueEdit: () => {
                    history.push(sitePathConfig.adminUpdate.path.replace(':id', res.id))
                }
            })
        } else if (res?.result===false) {
            this.showFailedConfirmModal({
                title: res?.message
            })

        } else {
            this.showFailedConfirmModal()
        }
    }

    onUpdateCompleted = (res) => {
        console.log("here")
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
            kind:UserTypes.ADMIN,
            avatarPath: data.avatar,
            status: 1,
            ...data,
        };
    }

    prepareUpdateData = (data) => {
        return {
            ...data,
            kind:UserTypes.ADMIN,
            avatarPath: data.avatar,
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
                console.log("object");
                this.onUpdateCompleted(responseData);
            }
            else {
                console.log("object2");

                this.onInsertCompleted(responseData);
            }
        }
    }

    render() {
        const { isGetDetailLoading, objectNotFound,  } = this.state
        const {t,uploadFile}= this.props
        if (objectNotFound) {
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
})

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['userAdminUpdatePage','listBasePage'])(UserAminUpdate));