import React from 'react';
import { Button } from 'antd';
import Axios from 'axios';

const ActionButton = ({ record, source }) => {
  const deleteHandler = async () => {
    await Axios.delete(`http://localhost:5000/${source}/${record.id}`);
    alert('刪除成功');
    window.location.reload(true);
  };

  return (
    <>
      <Button
        type="primary"
        size="middle"
        style={{ marginRight: 10 }}
        shape="round"
      >
        編輯
      </Button>
      <Button type="danger" size="middle" shape="round" onClick={deleteHandler}>
        刪除
      </Button>
    </>
  );
};

export default ActionButton;
