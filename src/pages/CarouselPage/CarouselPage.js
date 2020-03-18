import React, { Component } from 'react';
import { Layout, Typography, Button, Table } from 'antd';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import 'antd/dist/antd.css';

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
    title: '狀態',
    dataIndex: 'isActive',
    key: 'isActive'
  },
  {
    title: '動作',
    key: 'action',
    render: (text, record) => <ActionButton />
  }
];

class CarouselPage extends Component {
  state = {
    data: [
      { key: '1', title: 'test1' },
      { key: '2', title: 'test2' },
      { key: '3', title: 'test3' }
    ]
  };

  components = {
    body: {
      row: DragableBodyRow
    }
  };

  componentDidUpdate() {
    console.log(this.state.data);
  }

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
          <Button
            type="primary"
            shape="round"
            size="large"
            style={{ marginBottom: '40px' }}
          >
            新增輪播內容
          </Button>
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
