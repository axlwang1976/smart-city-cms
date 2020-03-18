import React from 'react';
import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';

import Sider from './components/Sider/Sider';
import HomePage from './pages/HomePage/HomePage';
import CarouselPage from './pages/Carousel/CarouselPage';
import CarouselNewPage from './pages/Carousel/CarouselNewPage';
import AnnouncementPage from './pages/Announcement/AnnouncementPage';

const App = () => {
  return (
    <Layout>
      <Sider />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/carousel" component={CarouselPage} />
        <Route exact path="/announcement" component={AnnouncementPage} />
        <Route exact path="/carousel/new" component={CarouselNewPage} />
      </Switch>
    </Layout>
  );
};

export default App;
