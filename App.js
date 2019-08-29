import React, {Fragment} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { createAppContainer, createStackNavigator } from 'react-navigation';

import MovieListScreen from 'screens/MovieListScreen';
import MovieDetailsScreen from 'screens/MovieDetailsScreen';

const routeConfig = {
  MovieList: MovieListScreen, 
  MovieDetails: MovieDetailsScreen
}

const navigatorConfig = {
  initialRouteName: 'MovieList', 
}
const AppNavigator = createStackNavigator(routeConfig, navigatorConfig);
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return  <AppContainer />
  }
}
