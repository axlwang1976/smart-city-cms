import React, { useState } from 'react';
import {
  Layout,
  Typography,
  Form,
  Input,
  DatePicker,
  Upload,
  message,
  Button,
  InputNumber
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import PageContent from '../../components/PageContent/PageContent';
import Footer from '../../components/Footer/Footer';
import FormButton from '../../components/FormButton/FormButton';

const CarouselNewPage = ({ history }) => {
  const [fileList, setFileList] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const { Content } = Layout;
  const { Title } = Typography;
  const { Item } = Form;
  const tailLayout = {
    wrapperCol: { offset: 14, span: 18 }
  };
  const fileProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text'
    },
    onChange(info) {
      if (
        info.file.size > 1048576 &&
        info.file.type.split('/')[0] === 'image'
      ) {
        message.error('檔案過大，請重新選擇');
        return false;
      }

      if (
        info.file.size > 524288000 &&
        info.file.type.split('/')[0] === 'video'
      ) {
        message.error('檔案過大，請重新選擇');
        return false;
      }

      if (
        info.file.type.split('/')[0] !== 'video' &&
        info.file.type.split('/')[0] !== 'image'
      ) {
        message.error('不支援此類型檔案，請重新選擇');
        return false;
      }

      let fileList = [...info.fileList];
      fileList = fileList.slice(-1);
      setFileList(fileList);

      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上傳成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上傳失敗`);
      }
    }
  };

  const submitHandler = async ({
    title,
    startDate,
    endDate,
    file,
    duration
  }) => {
    setIsloading(true);

    const type = file.file.type.split('/')[0] === 'image' ? '圖片' : '影片';
    const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    const id = uuidv4();
    const res = await axios.get('http://localhost:5000/contents/carousel');
    const data = res.data.data;
    const newData = {
      id,
      key: id,
      title,
      type,
      file: file.file.name,
      duration,
      startDate: startDate.format('YYYY-MM-DD HH:mm:ss'),
      endDate: endDate.format('YYYY-MM-DD HH:mm:ss'),
      isActive: true,
      createdAt
    };
    const newDataArr = [...data, newData];

    await axios.patch('http://localhost:5000/contents/carousel', {
      data: newDataArr
    });

    setIsloading(false);

    history.push('/carousel');
  };

  return (
    <Content style={{ padding: '20px' }}>
      <Title level={2}>新增首頁輪播內容</Title>
      <PageContent>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          size="large"
          onFinish={vals => submitHandler(vals)}
          onFinishFailed={err => message.error('表單驗證錯誤，請重新確認')}
        >
          <Item
            label="名稱"
            name="title"
            rules={[{ required: true, message: '名稱為必填欄位' }]}
          >
            <Input />
          </Item>
          <Item
            label="播放時間(秒)"
            name="duration"
            rules={[{ required: true, message: '播放時間為必填欄位' }]}
          >
            <InputNumber min={1} />
          </Item>
          <Item
            name="startDate"
            label="開始時間"
            rules={[{ required: true, message: '開始時間為必填欄位' }]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          </Item>
          <Item
            name="endDate"
            label="結束時間"
            rules={[{ required: true, message: '結束時間為必填欄位' }]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          </Item>
          <Item
            label="上傳檔案"
            name="file"
            rules={[{ required: true, message: '必須選擇檔案' }]}
          >
            <Upload {...fileProps} fileList={fileList}>
              <Button>
                <UploadOutlined /> 選擇檔案
              </Button>
            </Upload>
          </Item>
          <Item {...tailLayout}>
            <FormButton path="carousel" isLoading={isLoading} />
          </Item>
        </Form>
      </PageContent>
      <Footer />
    </Content>
  );
};

export default withRouter(CarouselNewPage);
