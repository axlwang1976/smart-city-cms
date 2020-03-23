/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  Layout,
  Typography,
  Form,
  Input,
  DatePicker,
  message,
  InputNumber
} from 'antd';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import PageContent from '../../components/PageContent/PageContent';
import Footer from '../../components/Footer/Footer';
import FormButton from '../../components/FormButton/FormButton';

const CarouselEditPage = ({ history, match }) => {
  const [isLoading, setIsloading] = useState(false);
  const [dataArr, setDataArr] = useState([]);
  const [data, setData] = useState(null);
  const { Content } = Layout;
  const { Title } = Typography;
  const { Item } = Form;
  const tailLayout = {
    wrapperCol: { offset: 14, span: 18 }
  };

  useEffect(() => {
    async function getData() {
      const res = await axios.get(`http://localhost:5000/contents/carousel`);
      const dataArr = res.data.data;
      const data = dataArr.filter(el => el.id === match.params.id)[0];
      setDataArr(dataArr);
      setData(data);
    }
    getData();
  }, []);

  const submitHandler = async ({ title, startDate, endDate, duration }) => {
    setIsloading(true);
    console.log(data);
    const updatedData = {
      id: data.id,
      key: data.key,
      title,
      type: data.type,
      duration,
      startDate: startDate
        ? startDate.format('YYYY-MM-DD HH:mm:ss')
        : data.startDate,
      endDate: endDate ? endDate.format('YYYY-MM-DD HH:mm:ss') : data.endDate,
      isActive: data.isActive,
      createdAt: data.createdAt
    };
    const updatedDataArr = dataArr.map(el => {
      if (el.id !== match.params.id) {
        return el;
      }
      return updatedData;
    });
    await axios.patch(`http://localhost:5000/contents/carousel`, {
      data: updatedDataArr
    });
    setIsloading(false);
    history.push('/carousel');
  };

  return (
    data && (
      <Content style={{ padding: '20px' }}>
        <Title level={2}>編輯首頁輪播內容</Title>
        <PageContent>
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            size="large"
            onFinish={vals => submitHandler(vals)}
            onFinishFailed={err => message.error('表單驗證錯誤，請重新確認')}
            initialValues={{
              title: data.title,
              duration: data.duration,
              file: data.file
            }}
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
            <Item name="startDate" label="開始時間">
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                placeholder={data.startDate}
              />
            </Item>
            <Item name="endDate" label="結束時間">
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                placeholder={data.endDate}
              />
            </Item>
            <Item label="上傳檔案" name="file">
              <Input disabled />
            </Item>
            <Item {...tailLayout}>
              <FormButton path="carousel" isLoading={isLoading} />
            </Item>
          </Form>
        </PageContent>
        <Footer />
      </Content>
    )
  );
};

export default withRouter(CarouselEditPage);
