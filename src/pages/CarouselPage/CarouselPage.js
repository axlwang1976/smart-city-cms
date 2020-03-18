import React from 'react';
import { Layout, Typography, Button } from 'antd';
import 'antd/dist/antd.css';

import PageContent from '../../components/PageContent/PageContent';
import Footer from '../../components/Footer/Footer';

const CarouselPage = () => {
  const { Title } = Typography;

  return (
    <Layout.Content style={{ padding: '20px' }}>
      <Title level={2}>首頁輪播管理</Title>
      <PageContent>
        <Button type="primary" shape="round" size="large">
          新增輪播內容
        </Button>
      </PageContent>
      <Footer />
    </Layout.Content>
  );
};

export default CarouselPage;
