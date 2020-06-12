import React, { Component } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { actions } from './store'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }
  handleFinish = (values) => {
    this.props.saveLoginInfo(values);
  };
  onFinishFailed = (errorInfo) => {
    console.log("errorInfo", errorInfo);
  };
  render() {
    return (
      <Form
        onFinish={this.handleFinish}
        onFinishFailed={this.onFinishFailed}
        id="login-form"
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="login-form-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="login-form-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Link className="login-form-forgot">Forgot password</Link>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <Link href="">register now!</Link>
        </Form.Item>
      </Form>
    );
  }
}

const mapDispatch = (dispatch) => ({
  saveLoginInfo: (loginInfo) => {
      dispatch(actions.saveLoginInfo(loginInfo));
  }
});

export default connect(null, mapDispatch)(Login)
