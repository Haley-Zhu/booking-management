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
  const [form] = Form.useForm();
  return (
    <Modal
      title={`${type} ${field}`}
      visible={visible}
      onOk={() => {
        form.validateFields().then((values) => {
          return onSubmit(values);
        });
      }}
      okText={type}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
    >
      <Form form={form}>
        {_.map(data, (value, key) => {
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
