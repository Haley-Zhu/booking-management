import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Dropdown, Avatar } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import logo from "../assets/icons/logo-text.png";
import defaultAvatarSrc from "../assets/icons/default_avatar.svg";

const { Header, Sider, Content } = Layout;

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
    const menu = (
      <Menu>
        <Menu.Item key="userinfo" icon={<SettingOutlined />}>
          Account Setting
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout" icon={<LogoutOutlined />}>
          Logout
        </Menu.Item>
      </Menu>
    );
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
        <Layout className="global-layout__content">
          <Header className="global-layout-background" style={{ padding: 0 }}>
            {this.state.collapsed ? (
              <MenuUnfoldOutlined className="trigger" onClick={this.toggle} />
            ) : (
              <MenuFoldOutlined className="trigger" onClick={this.toggle} />
            )}
            <Dropdown overlay={menu}>
              <Link>
                <Avatar size="small" src={defaultAvatarSrc} alt="avatar" />
                <span>username</span>
              </Link>
            </Dropdown>
          </Header>
          <Content
            className="global-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default GlobalLayout;
