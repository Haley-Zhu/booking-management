import React from "react";
import { Modal, Form, Input, Select } from "antd";
import _ from "lodash";

const { Option } = Select;
const selectOption = (refList) => {
  let arrayOption = refList.map(item => {
    const { serviceName } = item;
    console.log('11111111111111selectOption, serviceName: ', serviceName);
    return<Option key={item._id} value={item._id}>{serviceName}</Option>;
  })
  console.log('11111111111111selectOption, arrayOption: ', arrayOption);
  return arrayOption;
}

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
    refList
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
          if(key === "businesses" || key === "categories") {
            return (
              <Form.Item key={key} name={key} label={key}>
                <Select mode="multiple">{selectOption(refList)}</Select>
              </Form.Item>
            );
          }
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
