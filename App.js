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
import GameScreen from './screens/GameScreen';
import GameOver from './screens/GameOver';

const App = () => {
  const [] = useState();

  const [userNumber, setUserNumber] = useState();
  const [rounds, setRounds] = useState(0);

  const startGameHandler = (selectecNumber) => {
    setUserNumber(selectecNumber);
    setRounds(0);
  };

  const gameOverHandler = (rounds) => {
    setRounds(rounds);
  };

  const restartHandler = () => {
    setUserNumber(0)
    setRounds(0);
  };

  let content = (
    <StartGameScreen
      onStartGame={startGameHandler}
    />
  );
  if (rounds) {
    content = (
      <GameOver
        onRestart={restartHandler}
        userChoice={userNumber}
        rounds={rounds}
      />
    );
  } else if (userNumber) {
    content = (
      <GameScreen
        onEndGame={gameOverHandler}
        userChoice={userNumber}
      />
    );
  }
  return (
    <View style={styles.body}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safe}>
        <Header title="Guess a Number" />
        {content}
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
