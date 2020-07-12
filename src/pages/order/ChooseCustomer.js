import React, { Component } from "react";
import { Table, Button } from "antd";
import { actions } from "../Customer/store";
import { connect } from "react-redux";

class ChooseCustomer extends Component {
  componentDidMount() {
    const { loadCustomersList, isButtonDisable } = this.props;
    loadCustomersList();
    isButtonDisable(true);
  }
  render() {
    const { customersList, onSelect, isButtonDisable } = this.props;
    console.log("customersList in [ChooseCustomer page]", customersList);
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
    ];
    const data = customersList.map((customer) => ({
      key: customer._id,
      id: customer._id,
      ...customer,
    }));
    const paginationProps = {
      defaultPageSize: 5,
      showSizeChanger: true,
      showQuickJumper: true,
      pageSizeOptions: ["5", "10", "20"],
    };

    const rowSelection = {
      type: 'radio',
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'typeof: ', typeof(selectedRowKeys[0]));
        const selectedItem = { customerId: selectedRowKeys[0]}
        console.log(`selectedItem:`, selectedItem )
        onSelect(selectedItem);
        isButtonDisable(!selectedItem);
      },
      // getCheckboxProps: record => ({
      //   disabled: record.name === 'Disabled User',
      //   name: record.name,
      // }),
    }
    return (
      <Table columns={columns} dataSource={data} pagination={paginationProps} rowSelection={rowSelection}/>
    );
  }
}

const mapState = (state) => ({
  customersList: state.customerReducer.customersList,
});

const mapDispatch = (dispatch) => ({
  loadCustomersList: (customers) => {
    dispatch(actions.loadCustomersList(customers));
  },
  searchByFilterAsync: (condition) => {
    dispatch(actions.searchByFilterAsync(condition));
  },
});

export default connect(mapState, mapDispatch)(ChooseCustomer);
