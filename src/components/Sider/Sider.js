import React, { useState } from 'react';
import { Layout } from 'antd';

import Logo from '../Logo/Logo';
import MainMenu from '../MainMenu/MainMenu';
import styles from './Sider.module.scss';

const Sider = ({ username }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = isCollapsed => setCollapsed(isCollapsed);

  return (
    <Layout.Sider
      className={styles.sider}
      collapsible
      collapsed={collapsed}
      onCollapse={handleCollapse}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0
      }}
    >
      <Logo />
      <MainMenu username={username} />
    </Layout.Sider>
  );
};

export default Sider;
