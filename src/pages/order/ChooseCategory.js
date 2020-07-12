import React, { Component } from "react";
import { Table, Button } from "antd";
import { actions } from "../Category/store";
import { connect } from "react-redux";

class ChooseCategory extends Component {
  componentDidMount() {
    const { loadCategoriesList, isButtonDisable } = this.props;
    loadCategoriesList();
    isButtonDisable(true);
  }
  render() {
    const { categoriesList, onSelect, isButtonDisable } = this.props;
    console.log("categoriesList in [ChooseCategory page]", categoriesList);
    const columns = [
      {
        title: "Service",
        dataIndex: "serviceName",
        key: "serviceName",
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
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
