import { Form, Select } from 'antd';
import React from 'react';
import BaseField from './BaseField';
const { Option } = Select;
const children = [
    {key:0,value:'ao'},
    {key:1,value:'quan'},
    {key:2,value:'aothun'},
    {key:3,value:'aophong'},
    {key:4,value:'aosomi'},
];

const handleChange = (value) => {
  console.log(`selected ${value}`);
};
class TagField extends BaseField {
    constructor(props) {
        super(props);
    }

    render(){
        const {label,fieldName,allowClear}= this.props;
        return( 
            <Form.Item label={label}
            name={fieldName}
            rules={this.getRules()}
            shouldUpdate={false}
            // noStyle={noStyle}
        >
          <Select
            mode="tags"
            allowClear={allowClear}
            placeholder={this.getPlaceHolder()}
            style={{
                width: '100%',
            }}
            onChange={handleChange}
            >
            {children.map(item =>  <Select.Option key={item.key} value={item.value}>{item.value} </Select.Option>)}
          </Select>
        </Form.Item>
        )
    }
}
export default TagField;