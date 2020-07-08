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
    const { onSearch } = this.props;
    return (
      <div className="search-container">
        <Input.Group compact>
          <Select className="select" defaultValue="Search All">
            <Option value="searchAll">Search All</Option>
            <Option value="searchName">Search by name</Option>
          </Select>
          <Input.Search className="search" placeholder="Input keyword" onSearch={(value) => onSearch(value)} />
        </Input.Group>
      </div>
    );
  }
}

export default SearchWithType;
