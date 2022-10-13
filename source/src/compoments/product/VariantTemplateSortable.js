import React, { Component } from "react";
import { render } from "react-dom";
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from "react-sortable-hoc";
import arrayMove from "array-move";
import { MenuOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Col, Form, Input, InputNumber, Row } from "antd";
import CropImageFiled from "../common/entryForm/CropImageFiled";
import IconImageFiled from "./IconImageFiled";
import NumericField from "../common/entryForm/NumericField";
import Utils from "../../utils";
import { UploadFileTypes } from "../../constants";
import { showErrorMessage } from "../../services/notifyService";

const DragHandle = sortableHandle(() => (
  <MenuOutlined
    style={{ cursor: "pointer", fontSize: "19px", "margin-top": "5px" }}
  />
));

const SortableItem = sortableElement(
  ({
    uploading,
    value,
    removeVariantItem,
    id,
    uploadFileLogo,
    handleChangeLogo,
    changeVariant,
  }) => {
    return (
      <Row gutter={[8, 0]}>
        <Col span={2}>
          <IconImageFiled
            index= {value.id}
            aspect={1.5}
            fieldName="image"
            loading={uploading}
            // label={t("form.label.image")}
            imageUrl={value.image}
            onChange={handleChangeLogo}
            uploadFile={uploadFileLogo}
            // disabled={loadingSave}
          />
        </Col>
        <Col span={2}>
          <DragHandle />
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input value={value.name} onChange={e => changeVariant(e.target.value,id,value.id,1)}/>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item>
            <InputNumber
              max={Infinity}
              value={value.price}
              onChange={e => changeVariant(e,id,value.id,2)}
              min={0}
              style={{ width: "100%" }}
              parser={(value) => Utils.formatIntegerNumber(value)}
            />
          </Form.Item>
        </Col>
        <Col span={2}>
          <MinusCircleOutlined
            style={{ fontSize: "19px", marginTop: "5px", marginLeft: "9px" }}
            onClick={(e) => {
              removeVariantItem(value, value.id, id);
            }}
          />
        </Col>
      </Row>
    );
  }
);

const SortableContainer = sortableContainer(({ children }) => {
  return <Col span={24}>{children}</Col>;
});

class VariantTemplateSortable extends Component {
  constructor(props) {
    super(props);
    this.handleSort = this.handleSort.bind(this);
    this.state = {
      imageArray: [],
      uploading: false,
    };
  }

  uploadFileLogo = (file, onSuccess,index) => {
    const { uploadFile } = this.props;
    const { imageArray } = this.state;
    this.setState({ uploading: true });
    uploadFile({
      params: { fileObjects: { file }, type: UploadFileTypes.AVATAR },
      onCompleted: (result) => {
        this.props.addImageVariant(result.data.filePath,index,this.props.id)
        onSuccess();
      },
      onError: (err) => {
        if (err && err.message) {
          showErrorMessage(err.message);
          this.setState({ uploading: false });
        }
      },
    });
  };

  handleChangeLogo = (info) => {
    if (info.file.status === "done") {
      Utils.getBase64(info.file.originFileObj, (logo) => {
        this.setState({ image: logo, isUpdateLogo: true });
      });
    }
  };

  handleSort({ oldIndex, newIndex }) {
    const { onSortEnd, data, id } = this.props;
    onSortEnd({ oldIndex, newIndex, data, id });
  }

  render() {
    const {
      data,
      uploadFile,
      removeVariantItem,
      id,
      onSortEnd,
      handleChangeLogo,
      uploadFileLogo,
      changeVariant
    } = this.props;
    const { uploading, } = this.state;
    console.log(data);
    return (
      <SortableContainer onSortEnd={this.handleSort} useDragHandle>
        {data.map((value, index) => (
          <SortableItem
            uploadFile={uploadFile}
            removeVariantItem={removeVariantItem}
            id={id}
            key={`item-${value}`}
            index={index}
            changeVariant={changeVariant}
            value={value}
            handleChangeLogo={this.handleChangeLogo}
            uploadFileLogo={this.uploadFileLogo}
            uploading={uploading}
          />
        ))}
      </SortableContainer>
    );
  }
}

export default VariantTemplateSortable;
