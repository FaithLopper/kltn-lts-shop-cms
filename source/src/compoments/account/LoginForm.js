import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined, HomeOutlined } from "@ant-design/icons";
import Utils from "../../utils";
import { Tabs } from "antd";
const FormItem = Form.Item;

const LoginForm = ({ loading, onLogin }) => {
  const handleSubmit = (values) => {
    onLogin(values);
  };

  return (
    <Tabs>
      <Tabs.TabPane tab="Chủ cửa hàng" key="item-1">
        <Form onFinish={handleSubmit} className="login-form">
          <FormItem
            name="username"
            rules={[
              { required: true, message: "Hãy nhập tên đăng nhập!" },
              { validator: Utils.validateUsernameForm },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              size="large"
              name="username"
              placeholder="Tên đăng nhập"
            />
          </FormItem>
          <FormItem
            name="password"
            rules={[{ required: true, message: "Hãy nhập mật khẩu!" }]}
          >
            <Input
              prefix={<LockOutlined />}
              size="large"
              name="password"
              type="password"
              placeholder="Mật khẩu"
            />
          </FormItem>
          <FormItem>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              size="large"
              className="login-form-button"
            >
              Đăng nhập
            </Button>
          </FormItem>
          <center className="s-mt4px">
            <small>Copyright © IService, All Rights Reserved.</small>
          </center>
        </Form>
      </Tabs.TabPane>
      <Tabs.TabPane tab="Nhân viên" key="item-2">
        <Form onFinish={handleSubmit} className="login-form">
          <FormItem
            name="tenantId"
            rules={[{ required: true, message: "Hãy nhập mã cửa hàng!" }]}
          >
            <Input
              prefix={<HomeOutlined />}
              size="large"
              name="tenantId"
              placeholder="Mã cửa hàng"
            />
          </FormItem>
          <FormItem
            name="username"
            rules={[
              { required: true, message: "Hãy nhập tên đăng nhập!" },
              { validator: Utils.validateUsernameForm },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              size="large"
              name="username"
              placeholder="Tên đăng nhập"
            />
          </FormItem>

          <FormItem
            name="password"
            rules={[{ required: true, message: "Hãy nhập mật khẩu!" }]}
          >
            <Input
              prefix={<LockOutlined />}
              size="large"
              name="password"
              type="password"
              placeholder="Mật khẩu"
            />
          </FormItem>
          <FormItem>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              size="large"
              className="login-form-button"
            >
              Đăng nhập
            </Button>
          </FormItem>
          <center className="s-mt4px">
            <small>Copyright © IService, All Rights Reserved.</small>
          </center>
        </Form>
      </Tabs.TabPane>
    </Tabs>
  );
};

export default LoginForm;
