import React, { Component } from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
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
        >
          <div className="global-layout-logo">
            <img src={logo} alt="logo" />
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
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
          <Content className="global-layout-background global-layout__content">
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
