import React, { Component }  from 'react';
import { Form, Input, Button } from "antd";


class PasswordSetting extends Component {

  render() {
    return(
      <Form
        onFinish={this.handleFinish}
        onFinishFailed={this.onFinishFailed}
        id="password-form"
      >
        <Form.Item
          name="old-password"
          label="Old Password"
          rules={[
            {
              required: true,
              message: "Please input your Old password!",
            },
          ]}
        >
          <Input.Password
            placeholder="Old Password"
          />
        </Form.Item>
        <Form.Item
          name="new-password"
          label="New Password"
          rules={[
            {
              required: true,
              message: "Please input your New password!",
            },
          ]}
        >
          <Input.Password
            placeholder="New Password"
          />
        </Form.Item>
        <Form.Item
          name="confirm-password"
          label="Confirm Password"
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
          ]}
        >
          <Input.Password
            placeholder="Confirm Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="password-form-button"
          >
            Submit
          </Button>
          <Button htmlType="button" onClick={this.onCancel}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default PasswordSetting;