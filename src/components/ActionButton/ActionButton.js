import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const ActionButton = ({ record, history, type }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);

  const handleOk = async () => {
    const res = await axios.get(`http://localhost:5000/contents/${type}`);
    const updatedData = res.data.data.filter(el => el.id !== record.id);

    await axios.patch(`http://localhost:5000/contents/${type}`, {
      data: updatedData
    });

    window.location.reload(true);
  };

  const handleCancel = () => setVisible(false);

  const editHandler = () => {
    history.push(`/${type}/${record.id}`);
  };

  return (
    <>
      <Button
        type="primary"
        size="middle"
        style={{ marginRight: 10 }}
        shape="round"
        onClick={editHandler}
      >
        編輯
      </Button>
      <Button type="danger" size="middle" shape="round" onClick={showModal}>
        刪除
      </Button>
      <Modal
        title="刪除資料"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>是否確認刪除此筆資料？</p>
      </Modal>
    </>
  );
};

export default withRouter(ActionButton);
