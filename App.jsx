import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from './Screens/HomePage';
import GamePage from './Screens/GamePage';
import Leaderboard from './Screens/Leaderboard';
import Settings from './Screens/Settings';

import { Text as RNText } from 'react-native';

const oldRender = RNText.render;

RNText.render = function (...args) {
  const origin = oldRender.call(this, ...args);
  return React.cloneElement(origin, {
    style: [{ fontFamily: 'minecraft-regular' }, origin.props.style],
  });
};

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="HomePage" screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomePage" component={HomePage}/>
      <Stack.Screen name="GamePage" component={GamePage}/>
      <Stack.Screen name="Leaderboard" component={Leaderboard}/>
      <Stack.Screen name="Settings" component={Settings}/>
    </Stack.Navigator>
  );
}

function App() {

  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});

export default App;
