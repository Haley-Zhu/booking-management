import React, { Component, Fragment } from "react";
import * as customerAPI from "../../api/customer";
import { DeleteButton, EditButton } from "../../components/Button";
import InfoModal from "../../components/Modal";
import { Table, Space, Button } from "antd";

class Customer extends Component {
  constructor() {
    super();
    this.state = {
      customers: [],
      modalInfo: {},
      modalType: "",
      modalVisible: false,
    };
  }

  componentDidMount() {
    customerAPI.fetchCustomers().then((date) =>
      this.setState({
        customers: date,
      })
    );
  }

  handleEdit = (text) => {
    const { name, email, phone } = text;
    this.setState({
      modalType: "update",
      modalInfo: { name, email, phone },
      modalVisible: true,
    });
  };

  handleDelete = (id) => {
    this.setState({
      modalType: "delete",
      modalVisible: true,
    });
  };

  render() {
    const { customers, modalVisible, modalInfo, modalType } = this.state;
    // todo: add field for display in backend
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: "Operation",
        key: "operation",
        render: (text) => (
          <Space size="small">
            <EditButton onClick={() => this.handleEdit(text)} />
            <DeleteButton onClick={() => this.handleDelete(text.id)} />
          </Space>
        ),
      },
    ];

    const data = customers.map((customer) => ({
      key: customer._id,
      id: customer._id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
    }));

    return (
      <Fragment>
        <Table columns={columns} dataSource={data} />
        <InfoModal data={modalInfo} visible={modalVisible} type={modalType} />
      </Fragment>
    );
  }
}

export default Customer;
