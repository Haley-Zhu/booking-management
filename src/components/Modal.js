import React from "react";
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
    onValuesChange,
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
      <Form
        className="modal-form"
        form={form}
        onValuesChange={(changedValue) => onValuesChange(changedValue)}
      >
        {_.map(data, (value, key) => {
          console.log(
            "----------------InfoModal key:",
            key,
            "value:",
            value,
            typeof value,
          );
          form.setFieldsValue({
            [key]: value,
          });
          return (
            <Form.Item key={key} name={key} label={key}>
              {<Input />}
            </Form.Item>
          );
        })}
      </Form>
    </Modal>
  );
}

export default InfoModal;
