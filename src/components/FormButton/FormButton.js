import React from 'react';
import { Button } from 'antd';
import { withRouter } from 'react-router-dom';

const FormButton = ({ history, path, isLoading }) => {
  return (
    <>
      <Button
        type="primary"
        htmlType="submit"
        style={{ marginRight: 20, padding: '0 21px' }}
        shape="round"
        disabled={isLoading}
      >
        {isLoading ? '處理中...' : '儲存'}
      </Button>
      <Button
        type="ghost"
        style={{ padding: '0 21px' }}
        shape="round"
        onClick={() => history.push(`/${path}`)}
      >
        取消
      </Button>
    </>
  );
};

export default withRouter(FormButton);
