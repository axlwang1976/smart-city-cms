import React from 'react';
import { Button } from 'antd';

const ActionButton = () => (
  <>
    <Button
      type="primary"
      size="middle"
      style={{ marginRight: 10 }}
      shape="round"
    >
      編輯
    </Button>
    <Button type="danger" size="middle" shape="round">
      刪除
    </Button>
  </>
);

export default ActionButton;
