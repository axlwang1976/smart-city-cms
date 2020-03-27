/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import PageContent from '../../components/PageContent/PageContent';
import Footer from '../../components/Footer/Footer';
import FormButton from '../../components/FormButton/FormButton';

const AnnouncementEditPage = ({ history, match }) => {
  const [isLoading, setIsloading] = useState(false);
  const [dataArr, setDataArr] = useState([]);
  const [data, setData] = useState(null);
  const [fileList, setFileList] = useState([]);
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

  useEffect(() => {
    async function getData() {
      const res = await axios.get(
        `http://localhost:5000/contents/announcement`
      );
      const dataArr = res.data.data;
      const data = dataArr.filter(el => el.id === match.params.id)[0];
      setDataArr(dataArr);
      setData(data);
    }
    getData();
  }, []);

  const submitHandler = async ({
    title,
    startDate,
    endDate,
    type,
    files,
    detailText
  }) => {
    setIsloading(true);

    const updatedData = {
      id: data.id,
      key: data.key,
      title,
      type,
      startDate: startDate
        ? startDate.format('YYYY-MM-DD HH:mm:ss')
        : data.startDate,
      endDate: endDate ? endDate.format('YYYY-MM-DD HH:mm:ss') : data.endDate,
      isActive: data.isActive,
      createdAt: data.createdAt,
      playIndex: data.playIndex,
      file: files ? files.fileList : data.file,
      detailText: detailText ? detailText : data.detailText
    };

    if (detailText === '') {
      updatedData.detailText = undefined;
    }

    const updatedDataArr = dataArr.map(el => {
      if (el.id !== match.params.id) {
        return el;
      }
      return updatedData;
    });

    await axios.patch(`http://localhost:5000/contents/announcement`, {
      data: updatedDataArr
    });

    setIsloading(false);

    history.push('/announcement');
  };

  return (
    data && (
      <Content>
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
              type: data.type,
              file: data.file,
              detailText: data.detailText
            }}
          >
            <Item
              label="標題"
              name="title"
              rules={[{ required: true, message: '名稱為必填欄位' }]}
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
            <Item label="上傳公告圖檔" name="files">
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
    )
  );
};

export default withRouter(AnnouncementEditPage);
