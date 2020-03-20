import React from 'react';
import { Button } from 'antd';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const ActionButton = ({ record, resource, history, type }) => {
  const deleteHandler = async () => {
    const res = await axios.get(`http://localhost:5000/${resource}/${type}`);
    const updatedData = res.data.data.filter(el => el.id !== record.id);
    console.log(updatedData);
    await axios.patch('http://localhost:5000/medias/carousel', {
      data: updatedData
    });
    window.location.reload(true);
  };

  const editHandler = () => {
    history.push(`/carousel/${record.id}`);
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
