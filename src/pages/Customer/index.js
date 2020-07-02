import React, { Component, Fragment } from "react";
import * as customerAPI from "../../api/customer";
import { DeleteButton, EditButton } from "../../components/Button";
import PageTopBar from "../../components/PageTopBar";
import InfoModal from "../../components/Modal";
import { actions } from "./store";
import { connect } from "react-redux";
import { Table, Space, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

class Customer extends Component {
  constructor() {
    super();
    this.state = {
      modalInfo: {},
      modalType: "",
      selectedCustomerId: ""
    };
  }

  componentDidMount() {
    this.props.loadCustomersList();
  }

  handleEdit = (text) => {
    console.log('--------------text', text);
    const { name, email, phone } = text;
    this.setState({
      modalType: "update",
      modalInfo: { name, email, phone },
      selectedCustomerId: text.id
    });
    this.props.setIsShowModal(true);
  };

  handleCreate = () => {
    this.setState({
      modalType: "create",
      // todo: about the keys
      modalInfo: { name: "", email: "", phone: "" },
    });
    this.props.setIsShowModal(true);
  };

  handleDelete = (id) => {
    const { deleteCustomerAsync } = this.props;
    Modal.confirm({
      title: "Are you sure Delete this item?",
      icon: <ExclamationCircleOutlined />,
      // content: 'Bla bla ...',
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteCustomerAsync(id);
      },
      onCancel() {
      },
    });
  };

  handleSubmitModal = (values) => {
    console.log('--------------handleSubmitModal');
    const { modalType, selectedCustomerId } = this.state;
    if (modalType === "update") {
      console.log('--------------update', selectedCustomerId, values);
      this.props.updateCustomerAsync(selectedCustomerId, values);
      return;
    }
    this.props.createCustomerAsync(values);
  };

  handleCancelModal = () => {
    this.props.setIsShowModal(false);
  };

  render() {
    const {
      modalInfo,
      modalType,
      // modalVisible,
      // modalConfirmLoading,
    } = this.state;
    // todo: add field for display in backend
    const { modalVisible, modalConfirmLoading, customersList } = this.props;
    // console.log('customers111', customers);
    console.log("customersList in [Customer page]", customersList);
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

    const data = customersList.map((customer) => ({
      key: customer._id,
      id: customer._id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
    }));

    return (
      <Fragment>
        <PageTopBar field="Customer" onCreate={this.handleCreate} />
        <Table columns={columns} dataSource={data} />
        <InfoModal
          field="Customer"
          data={modalInfo}
          type={modalType}
          visible={modalVisible}
          onSubmit={(values) => this.handleSubmitModal(values)}
          onCancel={this.handleCancelModal}
          confirmLoading={modalConfirmLoading}
        />
        {/* <DeleteModal /> */}
      </Fragment>
    );
  }
}

const mapState = (state) => ({
  modalVisible: state.customerReducer.modalVisible,
  modalConfirmLoading: state.customerReducer.isLoading,
  customersList: state.customerReducer.customersList,
});

const mapDispatch = (dispatch) => ({
  setIsShowModal: (isShow) => {
    dispatch(actions.setIsShowModal(isShow));
  },
  createCustomerAsync: (customer) => {
    dispatch(actions.createCustomerAsync(customer));
  },
  updateCustomerAsync: (id, customer) => {
    dispatch(actions.updateCustomerAsync(id, customer));
  },
  deleteCustomerAsync: (id) => {
    dispatch(actions.deleteCustomerAsync(id));
  },
  loadCustomersList: (customers) => {
    dispatch(actions.loadCustomersList(customers));
  },
});

export default connect(mapState, mapDispatch)(Customer);
