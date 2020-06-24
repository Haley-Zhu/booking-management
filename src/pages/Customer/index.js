import React, { Component } from "react";
import * as customerAPI from "../../api/customer";
import { DeleteButton, EditButton } from "../../components/Button";
import { Table, Space } from "antd";

class Customer extends Component {
  constructor() {
    super();
    this.state = {
      customers: [],
    };
  }

  componentDidMount() {
    customerAPI.fetchCustomers().then((date) =>
      this.setState({
        customers: date,
      })
    );
  }

  render() {
    const { customers } = this.state;
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
        render: () => (
          <Space size="small">
            <EditButton />
            <DeleteButton />
          </Space>
        ),
      },
    ];

    const data = customers.map((customer) => ({
      key: customer._id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
    }));

    return <Table columns={columns} dataSource={data} />;
  }
}

export default Customer;
