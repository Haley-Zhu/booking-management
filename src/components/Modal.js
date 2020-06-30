import React, { Component } from "react";
import { Modal, Form, Input } from "antd";
import _ from "lodash";

function InfoModal(props) {
  const {
    data,
    type,
    field,
    visible,
    confirmLoading,
    onSubmit,
    onCancel,
  } = props;
  console.log("qwert", visible, data, type, confirmLoading);
  const [form] = Form.useForm();
  return (
    <Modal
      title={`${type} ${field}`}
      visible={visible}
      onOk={() => {
        form.validateFields().then((values) => {
          console.log("form value", values);
          return onSubmit(values);
        });
      }}
      okText={type}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
    >
      <Form form={form}>
        {_.map(data, (value, key) => {
          console.log("test2222222222", value, key);
          return (
            <Form.Item key={key} name={key} label={key}>
              <Input initialvalue={value} />
            </Form.Item>
          );
        })}
      </Form>
    </Modal>
  );
}

export default InfoModal;
