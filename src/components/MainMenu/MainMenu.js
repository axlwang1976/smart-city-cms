import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import {
  HomeOutlined,
  FileImageOutlined,
  NotificationOutlined
} from '@ant-design/icons';

import styles from './MainMenu.module.scss';

const MainMenu = () => (
  <Menu
    theme="dark"
    mode="inline"
    // openKeys={openKeys}
    className={styles.menu}
  >
    <Menu.Item key="1">
      <NavLink to="/">
        <HomeOutlined />
        <span>首頁</span>
      </NavLink>
    </Menu.Item>
    <Menu.Item key="2">
      <NavLink to="/carousel">
        <FileImageOutlined />
        <span>首頁輪播管理</span>
      </NavLink>
    </Menu.Item>
    <Menu.Item key="3">
      <NavLink to="/announcement">
        <NotificationOutlined />
        <span>公告管理</span>
      </NavLink>
    </Menu.Item>
  </Menu>
);

export default MainMenu;
