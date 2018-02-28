import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
} from 'react-native';

import Startup from '../Login/Startup.js';
import Signup from '../Login/Signup.js';
import Login from '../Login/Login.js';
import HomeScreen from './HomeScreen.js';
import { DrawerNavigator } from 'react-navigation';
import Search from './searchid.js';
import SideBar from '../SideBar/SideBar.js';
import Profile from '../ProfileScreen/index.js';
import About from '../About/index.js';
import Add from '../AddRestaurant/index.js';

function MyIndex() {
  return (
    <Navigator
      initialRoute={{ name: 'index', component: HomeScreen }}
      renderScene={(route, navigator) => {
        if (route.component) {
          return React.createElement(route.component, { navigator });
        }

        return undefined;
      }}
    />
  );
}

const HomeScreenRouter = DrawerNavigator(
  {
	Startup: { screen: Startup },
	Signup: { screen: Signup },
	Login: { screen: Login },
	Home: { screen: HomeScreen },
	Search: { screen: Search },
	Profile: { screen: Profile },
	About: { screen: About },
	Add: { screen: Add }
  },
  {
	contentComponent: props => <SideBar {...props} />
  }
);
export default HomeScreenRouter;
	
	