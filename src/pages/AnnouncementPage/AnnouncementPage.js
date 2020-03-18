import React from 'react';
import { Layout, Typography } from 'antd';
import 'antd/dist/antd.css';

import PageContent from '../../components/PageContent/PageContent';
import Footer from '../../components/Footer/Footer';

const AnnouncementPage = () => {
  const { Content } = Layout;
  const { Title } = Typography;

  return (
    <Content style={{ padding: '20px' }}>
      <Title level={2}>公告管理</Title>
      <PageContent>公告管理內容</PageContent>
      <Footer />
    </Content>
  );
};

export default AnnouncementPage;
