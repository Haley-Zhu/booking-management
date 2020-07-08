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
    const { onSearch, onChange, searchList } = this.props;
    return (
      <div className="search-container">
        <Input.Group compact>
          <Select
            className="select"
            defaultValue="Search All"
            onChange={(value) => onChange(value)}
          >
            <Option value="searchAll">Search All</Option>
            {searchList &&
              searchList.map((item) => (
                <Option key={item} value={item}>
                  Search by {item}
                </Option>
              ))}
          </Select>
          <Input.Search
            className="search"
            placeholder="Input keyword"
            onSearch={(value) => onSearch(value)}
          />
        </Input.Group>
      </div>
    );
  }
}

export default SearchWithType;
