import React from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Typography, Button } from 'antd';
import 'antd/dist/antd.css';

import PageContent from '../../components/PageContent/PageContent';
import Footer from '../../components/Footer/Footer';

const HomePage = ({ history }) => {
  const { Title } = Typography;

  const clickHandler = path => history.push(`/${path}`);

  return (
    <Layout.Content style={{ padding: '20px' }}>
      <Title level={2}>首頁</Title>
      <PageContent>
        <Title level={3} style={{ textAlign: 'center' }} underline>
          歡迎使用智慧宅 KIOSK 管理系統
        </Title>
        <Title level={4} style={{ textAlign: 'center' }}>
          首頁輪播管理相關操作請前往
          <Button
            type="primary"
            shape="round"
            size="large"
            style={{ marginLeft: '10px' }}
            onClick={() => clickHandler('carousel')}
          >
            首頁輪播管理
          </Button>
        </Title>
        <Title level={4} style={{ textAlign: 'center' }}>
          公告管理相關操作請前往
          <Button
            type="primary"
            shape="round"
            size="large"
            style={{ marginLeft: '10px' }}
            onClick={() => clickHandler('announcement')}
          >
            公告管理
          </Button>
        </Title>
      </PageContent>
      <Footer />
    </Layout.Content>
  );
};

export default withRouter(HomePage);
