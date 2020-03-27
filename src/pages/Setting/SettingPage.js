import React from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Typography } from 'antd';

import PageContent from '../../components/PageContent/PageContent';
import Footer from '../../components/Footer/Footer';

const SettingPage = ({ history }) => {
  const { Content } = Layout;
  const { Title } = Typography;

  return (
    <Content style={{ padding: '20px 20px 20px 220px', minHeight: '100vh' }}>
      <Title level={2}>系統設定頁</Title>
      <PageContent>系統設定頁</PageContent>
      <Footer />
    </Content>
  );
};

export default withRouter(SettingPage);
