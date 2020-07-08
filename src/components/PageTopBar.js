import React, { Component } from "react";
import { Card, Row, Col } from "antd";
import { CreateItemButton } from "./Button";
import SearchWithType from "./Search";

class PageTopBar extends Component {
  render() {
    const { field, onCreate, onSearch, onSelectChange, searchList } = this.props;
    return (
      <div className="page-topbar">
        <Row gutter={24}>
          <Col xl={6} lg={6} md={6} sm={24} xs={24}>
            <Card className="topbar-card">
              <CreateItemButton onClick={onCreate} field={field}/>
            </Card>
          </Col>
          <Col xl={18} lg={18} md={18} sm={24} xs={24}>
            <Card className="topbar-card">
              <SearchWithType onSearch={onSearch} onChange={onSelectChange} searchList={searchList}/>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PageTopBar;
