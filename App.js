import React, { useState } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import { Colors } from './src/constants';
import {
  StartGameScreen,
  GameScreen,
  GameOver,
} from './src/screens';
import {
  Header,
  MyButton,
} from './src/components';

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
      <Header title="Guess a Number" />
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <KeyboardAvoidingView style={{ flex: 1 }}>
            {content}
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
      <View style={styles.bottom}>
        <MyButton
          title="Restart"
          onPress={restartHandler}
        />
      </View>
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
  },
  bottom: {
    backgroundColor: Colors.primary,
  },
});

export default App;
