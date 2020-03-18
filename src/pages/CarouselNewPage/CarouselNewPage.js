import React from 'react';
import { Layout, Typography } from 'antd';

import PageContent from '../../components/PageContent/PageContent';
import Footer from '../../components/Footer/Footer';

const CarouselNewPage = () => {
  const { Content } = Layout;
  const { Title } = Typography;

  return (
    <Content style={{ padding: '20px' }}>
      <Title level={2}>新增首頁輪播內容</Title>
      <PageContent>內容</PageContent>
      <Footer />
    </Content>
  );
};

export default CarouselNewPage;
