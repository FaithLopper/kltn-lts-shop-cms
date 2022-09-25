import React, { Component } from 'react';
import { Button, Col, Modal, Row } from 'antd';
import i18next from 'i18next';
import {
    CloseCircleFilled,
    CheckCircleFilled,
    SaveOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons';
import { showErrorMessage } from '../services/notifyService';
import Utils from '../utils';
const {changeCase} =Utils
const { confirm } = Modal;
class SaveBasePage extends Component {

    getIsEditing(props) {
        return props.match?.params.id !== 'create';
    }

    constructor(props) {
        super(props);
        this.state = {
            isGetDetailLoading: false,
            isSubmitting: false,
            isChanged: false
        }
        this.dataId = (props.match?.params.id || '').replace(/\?.*/, '');
        this.objectName = '';
        this.getListUrl = '';
        this.isEditing = this.getIsEditing(props);
        this.dataDetail = {};
        this.breadcrumbs = [];
        this.warningOnBack = false;
    }

    componentWillMount() {
        const { changeBreadcrumb } = this.props;
        if (this.isEditing) {
            this.getDetail(this.dataId);
        }
        if(this.breadcrumbs.length > 0) {
            changeBreadcrumb(this.breadcrumbs);
        }
    }

    setIsChangedFormValues = (flag) => {
        const { isChanged } = this.state;
        if (flag !== isChanged) {
            this.setState({ isChanged: flag });
        }
    }

    getActionName = () => {
        return this.isEditing ? 'Update' : 'Create';
    }

    getFormId = () => {
        return `form-${this.objectName}`;
    }

    getDetail = (id) => {
        const { getDataById } = this.props;
        const params = { id };
        this.isEditing = true;
        this.setState({ isGetDetailLoading: true });
        getDataById({
            params,
            onCompleted: this.onGetDetailCompleted,
            onError: (err) => {
                if (err && err.message)
                    showErrorMessage(err.message);
                else
                    showErrorMessage(`Get ${this.objectName} failed. Please try again!`);
                this.setState({ isGetDetailLoading: false });
            }
        });
    }

    onGetDetailCompleted = ({ data }) => {
        this.dataDetail = this.getDataDetailMapping(data);
        this.setState({ isGetDetailLoading: false });
    }

    getDataDetailMapping = (data) => {
        return data;
    }

    prepareCreateData = (data) => {
        return data;
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

    onUpdateCompleted = (responseData) => {

    }

    onInsertCompleted = (responseData) => {

    }

    onSaveError = (err) => {
        if (err && err.message)
            showErrorMessage(err.message);
        else
            showErrorMessage(`${this.getActionName()} ${this.objectName} failed. Please try again!`);
        this.setState({ isSubmitting: false });
    }

    onSave = (values) => {
        const { createData, updateData } = this.props;
        this.setState({ isSubmitting: true });
        if (this.isEditing) {
            updateData({
                params: this.prepareUpdateData(values),
                onCompleted: this.onSaveCompleted,
                onError: this.onSaveError
            });
        }
        else {
            createData({
                params: this.prepareCreateData(values),
                onCompleted: this.onSaveCompleted,
                onError: this.onSaveError
            });
        }
    }

    onBack = () => {
        const doBack = () => {
            const { history: { goBack, push, location } } = this.props;
            if (location?.state?.prevPath === this.getListUrl) {
                goBack();
            } else {
                push(this.getListUrl);
            }
        }

        if (this.warningOnBack && this.state.isChanged) {
            this.showWarningConfirmModal({
                title: "Are you sure want to quit? Your data will not be saved",
                onOk: doBack,
            });
        } else {
            doBack();
        }
    }

    showSuccessConfirmModal({ onContinueEdit, title = null, ...rest } = {}) {
        const { t } = this.props;
        const defaultTitle = `${t(`constants:${"Successfully"}`)} ${this.isEditing ? t(`basicSavePage:${"updateMessage"}`):t(`basicSavePage:${"createMessage"}`)}   ${this.objectName}`
        let prepareComfirm={
            title: title || defaultTitle,
            okText: t(`basicSavePage:${"okText"}`),
            width: 475,
            centered: true,
            cancelText: `${t(`basicSavePage:${"Continue"}`)} ${this.isEditing ? t(`basicSavePage:${"updateMessage"}`) : t(`basicSavePage:${"createMessage"}`)}  ${this.objectName}`,
            className: "custom-confirm-modal success",
            icon: <CheckCircleFilled style={{"color":"green"}}/>,
            onOk: this.onBack,
            // onCancel: onContinueEdit,
            ...rest
        }
        if(!this.isEditing)
            delete prepareComfirm.cancelText
        confirm(prepareComfirm)
    }

    showFailedConfirmModal({ onContinueEdit, title = null, ...rest } = {}) {
        const { t } = this.props;
        const defaultTitle = `${t(`constants:${"Failed"}`)} ${this.isEditing ? t(`basicSavePage:${"updateMessage"}`):t(`basicSavePage:${"createMessage"}`)}   ${this.objectName}`    
        confirm({
            title: title || defaultTitle,
            okText: `${t(`basicSavePage:${"Continue"}`)} ${this.isEditing ? t(`basicSavePage:${"updateMessage"}`) : t(`basicSavePage:${"createMessage"}`)}  ${this.objectName}`,
            centered: true,
            width: 475,
            cancelText: t(`basicSavePage:${"okText"}`),
            className: "custom-confirm-modal failed",
            icon: <CloseCircleFilled style={{"color":"red"}}/>,
            onCancel: this.onBack,
            onOk: onContinueEdit,
            ...rest
        })
    }

    showWarningConfirmModal({ onOk, title = null, ...rest } = {}) {
        confirm({
            title: title,
            centered: true,
            width: 475,
            okType: 'danger',
            className: "custom-confirm-modal warning",
            icon: <ExclamationCircleOutlined />,
            onOk: onOk,
            ...rest
        })
    }

    renderActions = (customDisabledSubmitValue) => {
        const { isSubmitting, isChanged } = this.state;
        const {t}= this.props

        const disabledSubmit = customDisabledSubmitValue !== undefined ? customDisabledSubmitValue : !isChanged;
        return (<Row gutter={16}>
            <Col span={14}>
            <Button key="cancel" onClick={this.onBack}> {t(`basicSavePage:${"cancelButton"}`) }</Button>
            </Col>
            <Col span={1}>
            <Button
                key="submit"
                htmlType="submit"
                type="primary"
                form={this.getFormId()}
                loading={isSubmitting}
                disabled={disabledSubmit}
                icon={<SaveOutlined />}
                
                >
                {this.isEditing ? t(`basicSavePage:${"updateButton"}`) : t(`basicSavePage:${"saveButton"}`)}
            </Button>
                </Col>
        </Row>);
    }

}

export default SaveBasePage;