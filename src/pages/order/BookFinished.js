import React, { Component } from 'react';
import { Descriptions, Spin } from 'antd';
import { fetchBusinessById } from '../../api/business';
import { fetchCustomerById } from '../../api/customer';
import { fetchCategoryById } from '../../api/category';

class BookFinished extends Component {
  constructor() {
    super();
    this.state = {
      customer: {},
      business: {},
      category: {},
    }
  }

  componentDidMount() {
    const { selectedSet } = this.props;
    const { customerId, businessId, categoryId } = selectedSet;
    fetchCustomerById(customerId).then(data => {
      console.log('@@@@@@@@@@@ customer', data)
      this.setState({
        customer: data
      })
    })
    fetchCategoryById(categoryId).then(data => {
      console.log('@@@@@@@@@@@ category', data)
      this.setState({
        category: data
      })
    })
    fetchBusinessById(businessId).then(data => {
      console.log('@@@@@@@@@@@ business', data)
      this.setState({
        business: data
      })
    })
  }
  render() {
    const { customer, business, category } = this.state;
    console.log('-----BookFinished------ customer:', customer, 'business:', business, 'category:', category)
    console.log('############### business name:', business.name);
    if (!customer || !business || !category) return <Spin size="large" tip="Loading..."/>
    return(
      <Descriptions title="Order Info" bordered>
        <Descriptions.Item label="Customer" span={3}>{customer.name}</Descriptions.Item>
        <Descriptions.Item label="Service" span={3}>{category.serviceName}</Descriptions.Item>
        <Descriptions.Item label="Business" span={3}>{business.name}</Descriptions.Item>
      </Descriptions>
    )
  }
}

export default BookFinished;