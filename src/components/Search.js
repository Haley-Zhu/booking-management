import React, { Component } from "react";
import { Input, Select } from "antd";

// const { Search } = Input;
const { Option } = Select;
const options = [
  { value: "searchAll", label: "Search All" },
  { value: "option2", label: "Search by" },
];
class SearchWithType extends Component {
  render() {
    return (
      <div className="search-container">
        <Input.Group compact>
          <Select className="select" defaultValue="test1">
            <Option value="test1">Test1</Option>
            <Option value="test2">Test2</Option>
          </Select>
          <Input.Search className="search" placeholder="Input keyword" />
        </Input.Group>
      </div>
    );
  }
}

export default SearchWithType;
