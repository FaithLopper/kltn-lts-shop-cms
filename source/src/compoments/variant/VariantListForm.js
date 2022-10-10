import React, { Component } from "react";
import { DEFAULT_TABLE_ITEM_SIZE, STATUS_ACTIVE } from "../../constants";
import BasicForm from "../common/entryForm/BasicForm";
import TextField from "../common/entryForm/TextField";
import { Form, Col, Row, Button } from "antd";
import BaseTable from "../common/table/BaseTable";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
class VariantListForm extends BasicForm {
  constructor(props) {
    super(props);
    // const {t} = this.props;
    this.pagination = { pageSize: DEFAULT_TABLE_ITEM_SIZE };
    this.columns = [
        { title:  "Tên thuộc tính", dataIndex: "name"},
        { title:  "Giá", dataIndex: "price"},
        this.renderActionColumn(),
      ];
  }

  renderActionColumn() {
    const {onVariantSelect}= this.props
    return {
        title:  'Hành động',
        width: '100px',
        align: 'center',
        render: (dataRow) => {
            return (
            <Button
            type="primary"
            onClick={e =>this.handleSelect(dataRow)}
            >
              Chọn
            </Button>)
        }
    }
}

  handleSelect(dataRow){
      this.props.onVariantSelect(dataRow)
  }


handleTableChange(pagination, filters, sorter) {
    const pager = { ...this.pagination };
    pager.current = pagination.current;
    this.pagination = pager;
}

  render() {
    const { formId,dataSource, loading } = this.props;
    return (
        <BaseTable
        loading={loading}
        columns={this.columns}
        rowKey={(record) => record.id}
        dataSource={dataSource}
        pagination={this.pagination}
        onChange={this.handleTableChange}
      />
    );
  }
}

export default VariantListForm
