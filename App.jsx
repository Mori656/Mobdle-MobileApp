import React from 'react';
import {ScrollView, StyleSheet, Text, View } from 'react-native';
import { HomePage } from './Screens/HomePage';
import { GamePage } from './Screens/GamePage';
import { Leaderboard } from './Screens/Leaderboard';



function App() {

  return (
    <View>
      {/* <HomePage /> */}
      {/* <GamePage /> */}
      <Leaderboard />
    </View>
  );
}

const styles = StyleSheet.create({
  
});

export default App;
