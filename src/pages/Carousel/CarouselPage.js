import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Typography, Button, Table } from 'antd';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import axios from 'axios';

import PageContent from '../../components/PageContent/PageContent';
import Footer from '../../components/Footer/Footer';
import ActionButton from '../../components/ActionButton/ActionButton';
import DragableBodyRow from '../../components/DragableBodyRow/DragableBodyRow';

const columns = [
  {
    title: '名稱',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '類型',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '播放時間(秒)',
    dataIndex: 'duration',
    key: 'duration'
  },
  {
    title: '起始時間',
    dataIndex: 'startDate',
    key: 'startDate'
  },
  {
    title: '結束時間',
    dataIndex: 'endDate',
    key: 'endDate'
  },
  {
    title: '動作',
    key: 'action',
    render: (text, record) => <ActionButton record={record} source="medias" />
  }
];

class CarouselPage extends Component {
  state = {
    data: []
  };

  async componentDidMount() {
    const res = await axios.get('http://localhost:5000/medias');
    this.setState({ data: res.data });
  }

  components = {
    body: {
      row: DragableBodyRow
    }
  };

  moveRow = (dragIndex, hoverIndex) => {
    const { data } = this.state;
    const dragRow = data[dragIndex];

    this.setState(
      update(this.state, {
        data: {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow]
          ]
        }
      })
    );
  };

  render() {
    const { Content } = Layout;
    const { Title } = Typography;
    const { data } = this.state;

    return (
      <Content style={{ padding: '20px' }}>
        <Title level={2}>首頁輪播管理</Title>
        <PageContent>
          <Link to="/carousel/new">
            <Button
              type="primary"
              shape="round"
              size="large"
              style={{ marginBottom: '40px' }}
            >
              新增輪播內容
            </Button>
          </Link>
          <DndProvider backend={HTML5Backend}>
            <Table
              columns={columns}
              dataSource={data}
              components={this.components}
              onRow={(record, index) => ({ index, moveRow: this.moveRow })}
              pagination={{ hideOnSinglePage: true, pageSize: 20 }}
            />
          </DndProvider>
        </PageContent>
        <Footer />
      </Content>
    );
  }
}

export default CarouselPage;
