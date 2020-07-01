import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  TeamOutlined,
  ShopOutlined,
  ProfileOutlined,
  SwitcherOutlined,
} from "@ant-design/icons";
import logo from "../assets/icons/logo-text.png";
import HeaderRight from "./HeaderRight";

const { Header, Sider, Content, Footer } = Layout;

class GlobalLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout id="global-layout">
        <Sider
          className="global-layout__sider"
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          breakpoint="lg"
          onBreakpoint={this.toggle}
          // collapsedWidth="0"
        >
          <div className="global-layout-logo">
            <img src={logo} alt="logo" />
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="home" icon={<HomeOutlined />}>
              <Link to="/home">Home</Link>
            </Menu.Item>
            <Menu.Item key="customers" icon={<TeamOutlined />}>
              <Link to="/customers">Customer</Link>
            </Menu.Item>
            <Menu.Item key="businesses" icon={<ShopOutlined />}>
              <Link to="/businesses">Business</Link>
            </Menu.Item>
            <Menu.Item key="Categories" icon={<SwitcherOutlined />}>
              <Link to="/Categories">Category</Link>
            </Menu.Item>
            <Menu.Item key="orders" icon={<ProfileOutlined />}>
              <Link to="/orders">Order</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className="global-layout-background global-layout__header">
            {this.state.collapsed ? (
              <MenuUnfoldOutlined className="trigger" onClick={this.toggle} />
            ) : (
              <MenuFoldOutlined className="trigger" onClick={this.toggle} />
            )}
            <div className="header--right">
              <HeaderRight />
            </div>
          </Header>
          <Content className="global-layout__content">
            {this.props.children}
          </Content>
          <Footer className="global-layout__footer">
            Booking System by ZHU
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default GlobalLayout;
