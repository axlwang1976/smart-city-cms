import React, { useState } from 'react';
import { Layout } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import 'antd/dist/antd.css';

import Sider from './components/Sider/Sider';
import HomePage from './pages/HomePage/HomePage';
import CarouselPage from './pages/Carousel/CarouselPage';
import CarouselNewPage from './pages/Carousel/CarouselNewPage';
import CarouselEditPage from './pages/Carousel/CarouselEditPage';
import AnnouncementPage from './pages/Announcement/AnnouncementPage';
import AnnouncementNewPage from './pages/Announcement/AnnouncementNewPage';
import AnnouncementEditPage from './pages/Announcement/AnnouncementEditPage';
import LogInPage from './pages/LogIn/LogInPage';
import SettingPage from './pages/Setting/SettingPage';

const App = () => {
  const [isLogedIn, setIsLogedIn] = useState(true);
  const [username, setUsername] = useState('admin');

  return isLogedIn ? (
    <DndProvider backend={HTML5Backend}>
      <Layout>
        <Sider username={username} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/carousel" component={CarouselPage} />
          <Route path="/carousel/new" component={CarouselNewPage} />
          <Route path="/carousel/:id" component={CarouselEditPage} />
          <Route
            exact
            path="/announcement"
            render={() => <AnnouncementPage />}
          />
          <Route path="/announcement/new" component={AnnouncementNewPage} />
          <Route path="/announcement/:id" component={AnnouncementEditPage} />
          <Route exact path="/setting" component={SettingPage} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </DndProvider>
  ) : (
    <LogInPage setIsLogedIn={setIsLogedIn} setUsername={setUsername} />
  );
};

export default App;
