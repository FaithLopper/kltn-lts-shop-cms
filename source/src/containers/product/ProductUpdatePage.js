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
import ProductUpdateForm from '../../compoments/product/ProductUpdateForm';
import qs from "query-string";
class ProductUpdatePage extends SaveBasePage {

    constructor(props) {
        super(props);
        const { t } = this.props;
        this.objectName =  t("objectName");
        this.getListUrl = sitePathConfig.product.path;
        this.actionFooter= false
        const {
            location: { search },
          } = this.props;
          const { parentProduct } = qs.parse(search);
        this.parentProduct= parentProduct
        this.breadcrumbs = [
            {
                name:  t("breadcrumbs.parentPage"),
                path:`${sitePathConfig.variant.path}`
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

    componentWillMount(){
        const { changeBreadcrumb,onReturn, onGetFormID,detectActionRenderType,getProductCategoryCombobox} = this.props;
        if (this.isEditing) {
            this.getDetail(this.dataId);
        }
        if(this.breadcrumbs.length > 0) {
            changeBreadcrumb(this.breadcrumbs);
        }
        onReturn(this.onBack)
        onGetFormID(this.getFormId)
        detectActionRenderType(this.actionFooter)
        getProductCategoryCombobox({
            params: {},
            onCompleted: (responseData)=>{
                const {result,data}= responseData
                if(result){
                    this.setState({
                        categoryId:data.data?.map(item =>{
                            return {value:item.id,label:item.name}
                        })
                    })
                }
            },
            onError: this.onSaveError
        })
    }

    getDataDetailMapping = (data) => {
        const productData = data
        if (!productData) {
            this.setState({ objectNotFound: true });
            return
        }
        let tags= []
        if(productData.tags){
            let currentIndex= 1
            let objectArray= productData.tags.match(new RegExp("#", "g")) || []
            Object.keys(objectArray).map((item,index) =>{
                console.log(productData.tags.length);
                if(index !== objectArray.length -1){
                    tags.push(productData.tags.slice(currentIndex,productData.tags.indexOf("#",currentIndex)-1))
                    currentIndex= productData.tags.indexOf("#",currentIndex)+1
                }
                else{
                    tags.push(productData.tags.slice(currentIndex))
                }
            })
        }
        const dataConfig= {
            ...productData,
            categoryId:productData.productCategoryId,
            tags,
            // tags:productData.tags ? 
            variantConfigs:productData.productConfigs? productData.productConfigs.map(item =>{
                return {
                    ...item,
                    variantIds:item.variants,
                    index:item.id
                }
            }): []
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
                    history.push(sitePathConfig.productUpdate.path.replace(':id', res.id))
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
        let temp= data.productConfigs.map(item =>{
            return {
                ...item,
                variants:item.variantIds.map((variant,index) =>{
                    return {
                        ...variant,
                        orderSort:index
                    }
                }),
            }
        })
        let tempData= data
        if(data.tags===""){
            delete tempData.tags
        }
        console.log(this.parentProduct)
        return {
            ...tempData,
            kind:this.parentProduct? 2:tempData.kind,
            productParentId:this.parentProduct ?parseInt(this.parentProduct) :null,
            productConfigs:temp
        };
    }

    prepareUpdateData = (data) => {
        let temp= data.productConfigs.map(item =>{
            return {
                ...item,
                variants:item.variantIds.map((variant,index) =>{
                    return {
                        ...variant,
                        orderSort:index
                    }
                }),
            }
        })
        let tempData= data
        if(data.tags===""){
            delete tempData.tags
        }
        return {
            ...tempData,
            productConfigs:temp
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
        const { isGetDetailLoading, objectNotFound, categoryId } = this.state
        const {t,uploadFile}= this.props
        if (objectNotFound) {
            return <ObjectNotFound />
        }
        return (
            <LoadingWrapper loading={isGetDetailLoading}>
                <ProductUpdateForm
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
                    categoryId={categoryId || []}
                    getList={this.props.getDataList}
                    getListTemplate={this.props.getDataListVariantTemplate}
                    getTemplate={this.props.getTemplate}
                    parentProduct= {this.parentProduct}
                    t={t}
                    />
            </LoadingWrapper>
        )
    }
}

const mapDispatchToProps = dispatch => ({
  getDataById: (payload) => dispatch(actions.getProductById(payload)),
  getTemplate: (payload) => dispatch(actions.getVariantTemplateById(payload)),
  createData: (payload) => dispatch(actions.createProduct(payload)),
  updateData: (payload) => dispatch(actions.updateProduct(payload)),
  uploadFile: (payload) => dispatch(actions.uploadFile(payload)),
  getProductCategoryCombobox:(payload)=> dispatch(actions.getProductCategoryCombobox(payload)),
  getDataList: (payload) => dispatch(actions.getVariantListModal(payload)),
  getDataListVariantTemplate: (payload) => dispatch(actions.getVariantTemplateListModal(payload)),
})

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['productUpdatePage','listBasePage'])(ProductUpdatePage));