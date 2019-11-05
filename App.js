import React, { useState } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import Colors from './constants/Colors';

const App = () => {
  const [courseGoals, setCourseGoals] = useState([]);
  return (
    <View style={styles.body}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safe}>
        <Header title="Guess a Number" />
        <StartGameScreen />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  safe: {
    flex: 1,
    backgroundColor: Colors.appBack,
  }
});

export default App;
