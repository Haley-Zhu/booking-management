import React, { Component } from "react";
import { Table, Button } from "antd";
import { actions } from "../Category/store";
import { connect } from "react-redux";

class ChooseCategory extends Component {
  componentDidMount() {
    this.props.loadCategoriesList();
  }
  render() {
    const { categoriesList, onSelect } = this.props;
    console.log("categoriesList in [ChooseCategory page]", categoriesList);
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
    const data = categoriesList.map((category) => ({
      key: category._id,
      id: category._id,
      ...category,
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
        const selectedItem = { categoryId: selectedRowKeys[0]}
        console.log(`selectedItem:`, selectedItem )
        onSelect(selectedItem);
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
  categoriesList: state.categoryReducer.categoriesList,
});

const mapDispatch = (dispatch) => ({
  loadCategoriesList: (categories) => {
    dispatch(actions.loadCategoriesList(categories));
  },
  searchByFilterAsync: (condition) => {
    dispatch(actions.searchByFilterAsync(condition));
  },
});

export default connect(mapState, mapDispatch)(ChooseCategory);
