import React, { useState } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Header from './src/components/Header';
import StartGameScreen from './src/screens/StartGameScreen';
import Colors from './src/constants/Colors';
import GameScreen from './src/screens/GameScreen';
import GameOver from './src/screens/GameOver';

const App = () => {
  const [] = useState();

  const [userNumber, setUserNumber] = useState();
  const [pastGuess, setPastGuess] = useState(0);

  const startGameHandler = (selectecNumber) => {
    setUserNumber(selectecNumber);
    setPastGuess([]);
  };

  const gameOverHandler = (pastGuess) => {
    setPastGuess(pastGuess);
  };

  const restartHandler = () => {
    setUserNumber(0)
    setPastGuess([]);
  };

  let content = (
    <StartGameScreen
      onStartGame={startGameHandler}
    />
  );
  if (pastGuess && pastGuess.length) {
    content = (
      <GameOver
        onRestart={restartHandler}
        userChoice={userNumber}
        pastGuess={pastGuess}
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
