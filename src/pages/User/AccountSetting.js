import React, { Component }  from 'react';
import { Form, Input, Button } from "antd";


class AccountSetting extends Component {

  render() {
    return(
      <Form
        onFinish={this.handleFinish}
        onFinishFailed={this.onFinishFailed}
        id="account-setting-form"
      >
        <Form.Item
          name="email"
          label="Email"
        >
          <Input
            disabled
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="username"
          label="username"
        >
          <Input
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="password"
        >
          <Input
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="account-setting-form-button"
          >
            Update
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default AccountSetting;