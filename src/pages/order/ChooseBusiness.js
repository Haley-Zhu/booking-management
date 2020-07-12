import React, { Component } from "react";
import { Table, Button } from "antd";
import { actions } from "../Business/store";
import { connect } from "react-redux";

class ChooseBusiness extends Component {
  componentDidMount() {
    const { loadBusinessesList, isButtonDisable } = this.props;
    loadBusinessesList();
    isButtonDisable(true);
  }
  render() {
    const { businessesList, onSelect, isButtonDisable } = this.props;
    console.log("businessesList in [ChooseBusiness page]", businessesList);
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
        title: "Postcode",
        dataIndex: "postcode",
        key: "postcode",
      },
    ];
    const data = businessesList.map((business) => ({
      key: business._id,
      id: business._id,
      ...business,
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
        const selectedItem = { businessId: selectedRowKeys[0]}
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
  businessesList: state.businessReducer.businessesList,
});

const mapDispatch = (dispatch) => ({
  loadBusinessesList: (businesses) => {
    dispatch(actions.loadBusinessesList(businesses));
  },
  searchByFilterAsync: (condition) => {
    dispatch(actions.searchByFilterAsync(condition));
  },
});

export default connect(mapState, mapDispatch)(ChooseBusiness);
