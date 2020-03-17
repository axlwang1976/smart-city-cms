import React from 'react';
import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';

import Sider from './components/Sider/Sider';
import HomePage from './pages/HomePage/HomePage';

const App = () => {
  return (
    <Layout>
      <Sider />
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </Layout>
  );
};

export default App;
