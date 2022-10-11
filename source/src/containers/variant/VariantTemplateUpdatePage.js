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
import VariantUpdateForm from '../../compoments/variant/VariantUpdateForm';
import VariantTemplateForm from '../../compoments/variant/VariantTemplateForm';
class VariantTemplateUpdatePage extends SaveBasePage {

    constructor(props) {
        super(props);
        const { t } = this.props;
        this.objectName =  t("objectName");
        this.getListUrl = sitePathConfig.variantTemplate.path;
        this.actionFooter= false
        this.breadcrumbs = [
            {
                name:  t("breadcrumbs.parentPage"),
                path:`${sitePathConfig.variantTemplate.path}`
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
        const variantConfigData = data
        if (!variantConfigData) {
            this.setState({ objectNotFound: true });
            return
        }
        const dataConfig= {
            ...variantConfigData,
            variantConfigs:variantConfigData.variantConfigs.map(item =>{
                return {
                    ...item,
                    variantIds:item.variants,
                    index:item.id
                }
            })
        }
        return {
            ...dataConfig,
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
        } else if (res?.result===false) {
            this.showFailedConfirmModal({
                title: res?.message
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

    onBack = () => {
        if (this.state.isChanged) {
            const {t}= this.props
            this.showWarningConfirmModal({
                title: t("basicSavePage:onBack"),
                onOk: () => {
                    this.props.history.push(this.getListUrl)
                }
            });
        } else {
            this.props.history.push(this.getListUrl)
        }
    }

    prepareCreateData = (data) => {
        let temp= data.variantConfigs.map(item =>{
           return { ...item,
            variantIds: item.variantIds.map(variant=>variant.id
            )}
        })
        return {
            ...data,
            variantConfigs:temp,
        };
    }

    prepareUpdateData = (data) => {
        let temp= data.variantConfigs.map(item =>{
            return { ...item,
             variantIds: item.variantIds.map(variant=>variant.id
             )}
         })
        return {
            ...data,
            variantConfigs:temp,
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
            return <ObjectNotFound />
        }
        return (
            <LoadingWrapper loading={isGetDetailLoading}>
                <VariantTemplateForm
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
                    getList={this.props.getDataList}
                    />
            </LoadingWrapper>
        )
    }
}

const mapDispatchToProps = dispatch => ({
  getDataById: (payload) => dispatch(actions.getVariantTemplateById(payload)),
  createData: (payload) => dispatch(actions.createVariantTemplate(payload)),
  updateData: (payload) => dispatch(actions.updateVariantTemplate(payload)),
  getDataList: (payload) => dispatch(actions.getVariantListModal(payload)),
})

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['variantTemplateUpdatePage','listBasePage'])(VariantTemplateUpdatePage));