import React, { Component } from "react";
import * as customerAPI from "../../api/customer";

class Customer extends Component {
  constructor() {
    super();
    this.state = {
      courses: [],
    };
  }

  componentDidMount() {
    customerAPI.fetchCustomers().then((date) =>
      this.setState({
        courses: date,
      })
    );
  }

  render() {
    const { courses } = this.state;
    console.log(courses);
    return <p>customer page</p>;
  }
}

export default Customer;
