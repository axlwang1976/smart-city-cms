import React from 'react';
import { Layout, Breadcrumb, Divider, Typography } from 'antd';
import 'antd/dist/antd.css';

import PageContent from '../../components/PageContent/PageContent';
import Footer from '../../components/Footer/Footer';

const HomePage = () => (
  <Layout.Content style={{ padding: '20px' }}>
    <Breadcrumb>
      <Breadcrumb.Item>首頁</Breadcrumb.Item>
    </Breadcrumb>
    <Divider />
    <Typography.Title level={2}>首頁</Typography.Title>
    <PageContent>home page content here</PageContent>
    <Footer />
  </Layout.Content>
);

export default HomePage;
