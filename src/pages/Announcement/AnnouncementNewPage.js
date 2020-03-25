import React, { useState } from 'react';
import {
  Layout,
  Typography,
  Form,
  Input,
  DatePicker,
  message,
  Select,
  Button,
  Upload
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import PageContent from '../../components/PageContent/PageContent';
import Footer from '../../components/Footer/Footer';
import FormButton from '../../components/FormButton/FormButton';

const AnnouncementNewPage = ({ history }) => {
  const [fileList, setFileList] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const { Content } = Layout;
  const { Title } = Typography;
  const { Item } = Form;
  const { Option } = Select;
  const { TextArea } = Input;
  const tailLayout = {
    wrapperCol: { offset: 14, span: 18 }
  };
  const fileProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text'
    },
    multiple: true,
    onChange(info) {
      if (info.file.type.split('/')[0] !== 'image') {
        message.error('不支援此類型檔案，請重新選擇');
        return false;
      }

      const fileList = [...info.fileList];
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
    type,
    startDate,
    endDate,
    file,
    detailText
  }) => {
    setIsloading(true);

    const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    const id = uuidv4();
    const res = await axios.get('http://localhost:5000/contents/announcement');
    const data = res.data.data;
    const newData = {
      id,
      key: id,
      title,
      type,
      startDate: startDate.format('YYYY-MM-DD HH:mm:ss'),
      endDate: endDate.format('YYYY-MM-DD HH:mm:ss'),
      isActive: true,
      createdAt,
      playIndex: -99
    };

    if (file) {
      newData.file = file.fileList;
    }

    if (detailText) {
      newData.detailText = detailText;
    }

    const newDataArr = [...data, newData];

    await axios.patch('http://localhost:5000/contents/announcement', {
      data: newDataArr
    });

    setIsloading(false);

    history.push('/announcement');
  };

  return (
    <Content style={{ padding: '20px 20px 20px 220px', minHeight: '100vh' }}>
      <Title level={2}>新增公告內容</Title>
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
            label="標題"
            name="title"
            rules={[{ required: true, message: '標題為必填欄位' }]}
          >
            <Input />
          </Item>
          <Item
            label="類型"
            name="type"
            rules={[{ required: true, message: '類型為必填欄位' }]}
          >
            <Select>
              <Option value="社區公告">社區公告</Option>
              <Option value="活動通知">活動通知</Option>
              <Option value="生活快訊">生活快訊</Option>
            </Select>
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
          <Item label="上傳公告圖檔" name="file">
            <Upload {...fileProps} fileList={fileList}>
              <Button>
                <UploadOutlined /> 選擇檔案
              </Button>
            </Upload>
          </Item>
          <Item label="公告內容" name="detailText">
            <TextArea rows={8}></TextArea>
          </Item>
          <Item {...tailLayout}>
            <FormButton path="announcement" isLoading={isLoading} />
          </Item>
        </Form>
      </PageContent>
      <Footer />
    </Content>
  );
};

export default withRouter(AnnouncementNewPage);
