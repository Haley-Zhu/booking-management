import React, { Component, Fragment } from "react";
import { DeleteButton, EditButton } from "../../components/Button";
import PageTopBar from "../../components/PageTopBar";
import InfoModal from "../../components/Modal";
import { actions } from "./store";
import { connect } from "react-redux";
import { Table, Space, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { SEARCH_ALL, ORDER_SEARCH_LIST } from "../../utils/constants";
import { getLocalDateAndTime } from '../../utils/dateTransform';

class Order extends Component {
  constructor() {
    super();
    this.state = {
      modalInfo: {},
      modalType: "",
      selectedOrderId: "",
      searchField: SEARCH_ALL,
    };
  }

  componentDidMount() {
    this.props.loadOrdersList();
  }

  handleEdit = (text) => {
    console.log("--------------text", text);
    const { date, customer, business, category } = text;
    this.setState({
      modalType: "update",
      modalInfo: { date, customer, business, category },
      selectedOrderId: text.id,
    });
    this.props.setIsShowModal(true);
  };

  handleCreate = () => {
    const { history } = this.props;
    history.push('/orders/create');
  };

  handleDelete = (id) => {
    const { deleteOrderAsync } = this.props;
    Modal.confirm({
      title: "Are you sure Delete this item?",
      icon: <ExclamationCircleOutlined />,
      // content: 'Bla bla ...',
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteOrderAsync(id);
      },
      onCancel() {},
    });
  };

  handleSubmitModal = (values) => {
    console.log("--------------handleSubmitModal");
    const { modalType, selectedOrderId } = this.state;
    if (modalType === "update") {
      console.log("--------------update", selectedOrderId, values);
      this.props.updateOrderAsync(selectedOrderId, values);
      return;
    }
    this.props.createOrderAsync(values);
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
    const { modalVisible, modalConfirmLoading, ordersList } = this.props;
    // console.log('orders111', orders);
    console.log("ordersList in [Order page]", ordersList);
    const columns = [
      {
        title: "Order Date",
        dataIndex: "date",
        key: "date",
      },
      {
        title: "Customer",
        dataIndex: "customer",
        key: "customer",
      },
      {
        title: "Business",
        dataIndex: "business",
        key: "business",
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
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

    const data = ordersList.map((order) => {
      console.log('~~~~~~~~~~~~~~item:~~~~~~~~~~', order);
      console.log('~~~~~~~~~~~~~~item:~~~ customer', order.customer.name);
      console.log('~~~~~~~~~~~~~~item:~~~ business', order.business.name);
      console.log('~~~~~~~~~~~~~~item:~~~ category', order.category.serviceName);
      return ({
        ...order,
        key: order._id,
        id: order._id,
        customer: order.customer.name,
        business: order.business.name,
        category: order.category.serviceName,
        date: getLocalDateAndTime(order.createdAt),
      })
    });

    const paginationProps = {
      defaultPageSize: 5,
      showSizeChanger: true,
      showQuickJumper: true,
      pageSizeOptions: ["5", "10", "20"],
    };

    return (
      <Fragment>
        <PageTopBar
          field="Order"
          onCreate={this.handleCreate}
          onSearch={this.handleSearch}
          onSelectChange={this.handleSelectChange}
          searchList={ORDER_SEARCH_LIST}
        />
        <Table
          columns={columns}
          dataSource={data}
          pagination={paginationProps}
        />
        <InfoModal
          field="Order"
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
  modalVisible: state.orderReducer.modalVisible,
  modalConfirmLoading: state.orderReducer.isLoading,
  ordersList: state.orderReducer.ordersList,
});

const mapDispatch = (dispatch) => ({
  setIsShowModal: (isShow) => {
    dispatch(actions.setIsShowModal(isShow));
  },
  createOrderAsync: (order) => {
    dispatch(actions.createOrderAsync(order));
  },
  updateOrderAsync: (id, order) => {
    dispatch(actions.updateOrderAsync(id, order));
  },
  deleteOrderAsync: (id) => {
    dispatch(actions.deleteOrderAsync(id));
  },
  loadOrdersList: (orders) => {
    dispatch(actions.loadOrdersList(orders));
  },
  searchByFilterAsync: (condition) => {
    dispatch(actions.searchByFilterAsync(condition));
  },
});

export default connect(mapState, mapDispatch)(Order);
