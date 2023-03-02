import { Form, Select } from 'antd';
import React from 'react';
import BaseField from './BaseField';
import Utils from '../../../utils';
const { generateString } = Utils;
const handleChange = (value) => {
};
class TagField extends BaseField {
    // constructor(props) {
    //     super(props);
    // }

    render(){
        const {label,fieldName,allowClear,options}= this.props;
        return( 
            <Form.Item label={label}
            name={fieldName}
            rules={this.getRules()}
            shouldUpdate={false}
            // noStyle={noStyle}
        >
          <Select
            mode="multiple"
            allowClear={allowClear}
            placeholder={this.getPlaceHolder()}
            style={{
                width: '100%',
            }}
            onChange={handleChange}
            >
            {options.map((item, index) =>  <Select.Option key={index + item.value + generateString(5)} value={item.value}>{item.value} </Select.Option>)}
          </Select>
        </Form.Item>
        )
    }
}
export default TagField;