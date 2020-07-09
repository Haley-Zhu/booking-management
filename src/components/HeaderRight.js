import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Avatar } from "antd";
import { SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import defaultAvatarSrc from "../assets/icons/default_avatar.svg";
import { logout } from '../api/auth';

class HeaderRight extends Component {
  // constructor(props) {
  //   super(props);
  // }

  handleLogout = () => {
    logout();
  };

  render() {
    const menu = (
      <Menu>
        <Menu.Item key="userinfo" icon={<SettingOutlined />}>
          <Link to='/account/setting/base'>Account Setting</Link>
        </Menu.Item>
        <Menu.Item key="changepassword" icon={<SettingOutlined />}>
          <Link to='/account/setting/security'>Change Password</Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          key="logout"
          icon={<LogoutOutlined />}
          onClick={this.handleLogout}
        >
          Logout
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menu} className="header-username">
        <Link>
          <Avatar size="small" src={defaultAvatarSrc} alt="avatar" />
          <span>username</span>
        </Link>
      </Dropdown>
    );
  }
}

export default HeaderRight;
