import React from 'react';
import { Layout } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';

import Sider from './components/Sider/Sider';
import HomePage from './pages/HomePage/HomePage';
import CarouselPage from './pages/Carousel/CarouselPage';
import CarouselNewPage from './pages/Carousel/CarouselNewPage';
import CarouselEditPage from './pages/Carousel/CarouselEditPage';
import AnnouncementPage from './pages/Announcement/AnnouncementPage';
import AnnouncementNewPage from './pages/Announcement/AnnouncementNewPage';
import AnnouncementEditPage from './pages/Announcement/AnnouncementEditPage';

const App = () => {
  return (
    <Layout>
      <Sider />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/carousel" component={CarouselPage} />
        <Route path="/carousel/new" component={CarouselNewPage} />
        <Route path="/carousel/:id" component={CarouselEditPage} />
        <Route exact path="/announcement" component={AnnouncementPage} />
        <Route path="/announcement/new" component={AnnouncementNewPage} />
        <Route path="/announcement/:id" component={AnnouncementEditPage} />
        <Redirect to="/" />
      </Switch>
    </Layout>
  );
};

export default App;
