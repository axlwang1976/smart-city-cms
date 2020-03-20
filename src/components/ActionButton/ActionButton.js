import React from 'react';
import { Button } from 'antd';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

const ActionButton = ({ record, source, history }) => {
  const deleteHandler = async () => {
    await Axios.delete(`http://localhost:5000/${source}/${record.id}`);
    alert('刪除成功');
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
