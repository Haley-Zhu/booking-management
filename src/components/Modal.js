import React, { Component } from "react";
import { Modal, Form } from "antd";
import _ from "lodash";

class InfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ModalText: "Content of the modal",
      confirmLoading: false,
      modalKeys: [],
    };
  }

  handleOk = () => {
    this.setState({
      ModalText: "The modal will be closed after two seconds",
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel = () => {
    console.log("Clicked cancel button");
    this.setState({
      visible: false,
    });
  };

  render() {
    const { confirmLoading, ModalText, modalKeys } = this.state;
    const { visible, data, type } = this.props;
    console.log("qwert", visible, data, type);
    return (
      <Modal
        title="Title"
        visible={visible}
        onOk={this.handleOk}
        confirmLoading={confirmLoading}
        onCancel={this.handleCancel}
      >
        <Form>
          {_.map(data, (item, key) => (
            <Form.Item>
              <span>{key}:</span>
              <span>{item}</span>
            </Form.Item>
          ))}
        </Form>
      </Modal>
    );
  }
}

export default InfoModal;
