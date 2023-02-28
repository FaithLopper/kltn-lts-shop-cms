import React from 'react';
import SaveBasePage from "../SaveBasePage";
import LoadingWrapper from '../../compoments/common/elements/LoadingWrapper';
import { connect } from 'react-redux';
import { actions } from "../../actions";
import { sitePathConfig } from '../../constants/sitePathConfig';
import ObjectNotFound from '../../compoments/common/ObjectNotFound';
import { withTranslation } from "react-i18next";
import { ProvinceKinds } from '../../constants';
import AddressForm from '../../compoments/customer/AddressForm';
import qs from "query-string";
class AddressUpdatePage extends SaveBasePage {

    constructor(props) {
        super(props);
        const { t, location } = this.props;
        const {search} = location;
        const { customerId } = qs.parse(search);
        this.customerId = customerId;
        this.objectName =  t("objectName");
        this.getListUrl = sitePathConfig.address.path;
        this.actionFooter= false
        this.breadcrumbs = [
            {
                name:  t("breadcrumbs.parentPage"),
                path:`${sitePathConfig.customer.path}`
            },
            {
                name:  t("breadcrumbs.parentPage1"),
                path:`${sitePathConfig.address.path}?customerId=${this.customerId}`
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
        return {
            status: 1,
            ...data,
        };
    }

    prepareUpdateData = (data) => {
        return {
            ...data,
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

    handleLocation = (data)=>{
        if(data[0].kind===ProvinceKinds.province.level){
            this.provinceOption= data
        }
        else if(data[0].kind===ProvinceKinds.district.level){
            this.districtOption= data
        }
        else if(data[0].kind===ProvinceKinds.commune.level){
            this.communeOption= data
        }
    }

    render() {

        const { isGetDetailLoading, objectNotFound,  } = this.state
        const {t,uploadFile,getLocation,provinceList}= this.props
        if(provinceList.length!==0){
            this.handleLocation(provinceList.data)
        }
        if (objectNotFound) {
            return <ObjectNotFound />
        }
        // const province = provinceList.data || [];

        return (
            <LoadingWrapper loading={isGetDetailLoading}>
                <AddressForm
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
                    getLocation={getLocation}
                    provinceOption={this.provinceOption}
                    districtOption={this.districtOption}
                    communeOption={this.communeOption}
                    t={t}
                    />
                    
            </LoadingWrapper>
        )
    }
}

const mapDispatchToProps = dispatch => ({
  getDataById: (payload) => dispatch(actions.getAddressById(payload)),
  createData: (payload) => dispatch(actions.createAddress(payload)),
  updateData: (payload) => dispatch(actions.updateAddress(payload)),
  getLocation:(payload)=>dispatch(actions.getProvinceList(payload))
})

const mapStateToProps = state => ({
    provinceList:state.province.provinceData|| []
})

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['addressUpdatePage','listBasePage'])(AddressUpdatePage));