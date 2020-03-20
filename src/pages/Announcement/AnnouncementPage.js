import React, { Component } from 'react';
import { Layout, Typography, Button } from 'antd';
import { Link } from 'react-router-dom';

import PageContent from '../../components/PageContent/PageContent';
import Footer from '../../components/Footer/Footer';

class AnnouncementPage extends Component {
  render() {
    const { Content } = Layout;
    const { Title } = Typography;

    return (
      <Content style={{ padding: '20px' }}>
        <Title level={2}>公告管理</Title>
        <PageContent>
          <Link to="/announcement/new">
            <Button
              type="primary"
              shape="round"
              size="large"
              style={{ marginBottom: '40px' }}
            >
              新增公告
            </Button>
          </Link>
        </PageContent>
        <Footer />
      </Content>
    );
  }
}

export default AnnouncementPage;
