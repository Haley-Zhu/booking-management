import React, { Component, Fragment } from "react";
import { DeleteButton, EditButton } from "../../components/Button";
import PageTopBar from "../../components/PageTopBar";
import InfoModal from "../../components/Modal";
import { actions } from "./store";
import { connect } from "react-redux";
import { Table, Space, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { SEARCH_ALL, BUSINESS_SEARCH_LIST } from "../../utils/constants";

class Business extends Component {
  constructor() {
    super();
    this.state = {
      modalInfo: {},
      modalType: "",
      selectedBusinessId: "",
      searchField: SEARCH_ALL,
    };
  }

  componentDidMount() {
    this.props.loadBusinessesList();
  }

  handleEdit = (text) => {
    console.log("--------------text", text);
    const { name, email, phone, streeAddress, ABN, postcode, state } = text;
    this.setState({
      modalType: "update",
      modalInfo: { name, email, phone, streeAddress, ABN, postcode, state },
      selectedBusinessId: text.id,
    });
    this.props.setIsShowModal(true);
  };

  handleCreate = () => {
    this.setState({
      modalType: "create",
      // todo: about the keys
      modalInfo: {
        name: "",
        email: "",
        phone: "",
        streeAddress: "",
        ABN: "",
        postcode: "",
        state: "",
      },
    });
    this.props.setIsShowModal(true);
  };

  handleDelete = (id) => {
    const { deleteBusinessAsync } = this.props;
    Modal.confirm({
      title: "Are you sure Delete this item?",
      icon: <ExclamationCircleOutlined />,
      // content: 'Bla bla ...',
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteBusinessAsync(id);
      },
      onCancel() {},
    });
  };

  handleSubmitModal = (values) => {
    console.log("--------------handleSubmitModal");
    const { modalType, selectedBusinessId } = this.state;
    if (modalType === "update") {
      console.log("--------------update", selectedBusinessId, values);
      this.props.updateBusinessAsync(selectedBusinessId, values);
      return;
    }
    this.props.createBusinessAsync(values);
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
    } = this.state;
    // todo: add field for display in backend
    const { modalVisible, modalConfirmLoading, businessesList } = this.props;
    // console.log('businesses111', businesses);
    console.log("businessesList in [Business page]", businessesList);
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

    return (
      <Fragment>
        <PageTopBar
          field="Business"
          onCreate={this.handleCreate}
          onSearch={this.handleSearch}
          onSelectChange={this.handleSelectChange}
          searchList={BUSINESS_SEARCH_LIST}
        />
        <Table
          columns={columns}
          dataSource={data}
          pagination={paginationProps}
        />
        <InfoModal
          field="Business"
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
  modalVisible: state.businessReducer.modalVisible,
  modalConfirmLoading: state.businessReducer.isLoading,
  businessesList: state.businessReducer.businessesList,
});

const mapDispatch = (dispatch) => ({
  setIsShowModal: (isShow) => {
    dispatch(actions.setIsShowModal(isShow));
  },
  createBusinessAsync: (business) => {
    dispatch(actions.createBusinessAsync(business));
  },
  updateBusinessAsync: (id, business) => {
    dispatch(actions.updateBusinessAsync(id, business));
  },
  deleteBusinessAsync: (id) => {
    dispatch(actions.deleteBusinessAsync(id));
  },
  loadBusinessesList: (businesses) => {
    dispatch(actions.loadBusinessesList(businesses));
  },
  searchByFilterAsync: (condition) => {
    dispatch(actions.searchByFilterAsync(condition));
  },
});

export default connect(mapState, mapDispatch)(Business);
