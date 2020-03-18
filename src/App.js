import React from 'react';
import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';

import Sider from './components/Sider/Sider';
import HomePage from './pages/HomePage/HomePage';
import CarouselPage from './pages/CarouselPage/CarouselPage';
import AnnouncementPage from './pages/AnnouncementPage/AnnouncementPage';

const App = () => {
  return (
    <Layout>
      <Sider />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/carousel" component={CarouselPage} />
        <Route exact path="/announcement" component={AnnouncementPage} />
      </Switch>
    </Layout>
  );
};

export default App;
