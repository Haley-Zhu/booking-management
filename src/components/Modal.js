import React from "react";
import { Modal, Form, Input, Select } from "antd";
import { fetchCategories } from "../api/category";
import { fetchBusinesses } from "../api/business";
import _ from "lodash";

const { Option } = Select;
const selectOption = (field) => {
  let arrayOption = [];
  if (field === "Business") {
    fetchCategories().then((data) => {
     arrayOption = data.map(item => {
        const { serviceName } = item;
        console.log('11111111111111selectOption, field:', field,"serviceName: ", serviceName);
        return<Option key={serviceName}>{serviceName}</Option>;
      })
    });
    console.log('111111111111111selectOption arrayOption, field:', field,"arrayOption: ", arrayOption);
    return arrayOption;
  } else if (field === "Category") {
    fetchBusinesses().then((data) => {
      arrayOption = data.map(item => {
        const { name } = item;
        console.log('2222222222222selectOption, field:', field,"name: ", name);
        return<Option key={name}>{name}</Option>;
      })
    });
    console.log('2222222222222selectOption arrayOption, field:', field,"arrayOption: ", arrayOption);
    return arrayOption;
  }
  console.log('33333333333 selectOption arrayOption, field:', field,"arrayOption: ", arrayOption);
  return arrayOption;
};
const getRefField = (field) => {
  console.log('!!!!!!!!!!!!!getRefField:', field);
  if (field === "Business") {
    return "Category";
  } else {
    return "Cusiness";
  }
};
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
  const regField = getRefField(field);
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
            typeof value
          );
          form.setFieldsValue({
            [key]: value,
          });
          return (
            <Form.Item key={key} name={key} label={key}>
              <Input />
            </Form.Item>
          );
        })}
        {selectOption(field).length !== 0 && (
          <Form.Item key={regField} name={regField} label={regField}>
            <Select>selectOption(field)</Select>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
}

export default InfoModal;
