import React, { Component, Fragment } from "react";
import { DeleteButton, EditButton } from "../../components/Button";
import PageTopBar from "../../components/PageTopBar";
import InfoModal from "../../components/Modal";
import { actions } from "./store";
import { connect } from "react-redux";
import { Table, Space, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { SEARCH_ALL, CATEGORY_SEARCH_LIST } from "../../utils/constants";

class Category extends Component {
  constructor() {
    super();
    this.state = {
      modalInfo: {},
      modalType: "",
      selectedCategoryId: "",
      searchField: SEARCH_ALL,
    };
  }

  componentDidMount() {
    this.props.loadCategorysList();
  }

  handleEdit = (text) => {
    console.log("--------------text", text);
    const { serviceName, description } = text;
    this.setState({
      modalType: "update",
      modalInfo: { serviceName, description },
      selectedCategoryId: text.id,
    });
    this.props.setIsShowModal(true);
  };

  handleCreate = () => {
    this.setState({
      modalType: "create",
      // todo: about the keys
      modalInfo: {
        serviceName: "",
        description: "",
      },
    });
    this.props.setIsShowModal(true);
  };

  handleDelete = (id) => {
    const { deleteCategoryAsync } = this.props;
    Modal.confirm({
      title: "Are you sure Delete this item?",
      icon: <ExclamationCircleOutlined />,
      // content: 'Bla bla ...',
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteCategoryAsync(id);
      },
      onCancel() {},
    });
  };

  handleSubmitModal = (values) => {
    console.log("--------------handleSubmitModal");
    const { modalType, selectedCategoryId } = this.state;
    if (modalType === "update") {
      console.log("--------------update", selectedCategoryId, values);
      this.props.updateCategoryAsync(selectedCategoryId, values);
      return;
    }
    this.props.createCategoryAsync(values);
  };

  handleCancelModal = () => {
    this.props.setIsShowModal(false);
  };

  handleSearch = (value) => {
    console.log("--------------handleSearch", value);
    const { searchField } = this.state;
    this.props.searchByFilterAsync({ searchValue: value, searchField });
  };

  handleSelectChange = (value) => {
    console.log("--------------handleSelectChange", value);
    this.setState({
      searchField: value,
    });
  };

  onValuesChange = (changedValue) => {
    console.log("--------------onValuesChange", changedValue);
    this.setState({
      modalInfo: { ...this.state.modalInfo, ...changedValue },
    });
  };

  render() {
    const {
      modalInfo,
      modalType,
      // modalVisible,
      // modalConfirmLoading,
      // pageSize,
    } = this.state;
    // todo: add field for display in backend
    const { modalVisible, modalConfirmLoading, categoriesList } = this.props;
    // console.log('categories111', categories);
    console.log("categoriesList in [Category page]", categoriesList);
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

    return (
      <Fragment>
        <PageTopBar
          field="Category"
          onCreate={this.handleCreate}
          onSearch={this.handleSearch}
          onSelectChange={this.handleSelectChange}
          searchList={CATEGORY_SEARCH_LIST}
        />
        <Table
          columns={columns}
          dataSource={data}
          pagination={paginationProps}
        />
        <InfoModal
          field="Category"
          data={modalInfo}
          type={modalType}
          visible={modalVisible}
          onSubmit={(values) => this.handleSubmitModal(values)}
          onCancel={this.handleCancelModal}
          confirmLoading={modalConfirmLoading}
          onValuesChange={this.onValuesChange}
        />
        {/* <DeleteModal /> */}
      </Fragment>
    );
  }
}

const mapState = (state) => ({
  modalVisible: state.categoryReducer.modalVisible,
  modalConfirmLoading: state.categoryReducer.isLoading,
  categoriesList: state.categoryReducer.categoriesList,
});

const mapDispatch = (dispatch) => ({
  setIsShowModal: (isShow) => {
    dispatch(actions.setIsShowModal(isShow));
  },
  createCategoryAsync: (category) => {
    dispatch(actions.createCategoryAsync(category));
  },
  updateCategoryAsync: (id, category) => {
    dispatch(actions.updateCategoryAsync(id, category));
  },
  deleteCategoryAsync: (id) => {
    dispatch(actions.deleteCategoryAsync(id));
  },
  loadCategorysList: (categories) => {
    dispatch(actions.loadCategorysList(categories));
  },
  searchByFilterAsync: (condition) => {
    dispatch(actions.searchByFilterAsync(condition));
  },
});

export default connect(mapState, mapDispatch)(Category);
