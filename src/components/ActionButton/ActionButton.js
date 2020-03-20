import React from 'react';
import { Button } from 'antd';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const ActionButton = ({ record, history, type }) => {
  const deleteHandler = async () => {
    const res = await axios.get(`http://localhost:5000/contents/${type}`);
    const updatedData = res.data.data.filter(el => el.id !== record.id);
    console.log(updatedData);
    await axios.patch(`http://localhost:5000/contents/${type}`, {
      data: updatedData
    });
    window.location.reload(true);
  };

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
      <Button type="danger" size="middle" shape="round" onClick={deleteHandler}>
        刪除
      </Button>
    </>
  );
};

export default withRouter(ActionButton);
