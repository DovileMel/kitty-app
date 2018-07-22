import React from 'react';
import { createStackNavigator } from 'react-navigation';
import ListScreen from './src/ListScreen';
import ProfileScreen from './src/ProfileScreen';

const App = createStackNavigator({
  Home: { screen: ListScreen },
  Profile: { screen: ProfileScreen },
});

export default App;







