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
  Button,
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
    <SafeAreaView style={styles.body}>
      <StatusBar barStyle="light-content" />
      <Header title="Guess a Number" />
      <View style={styles.safe}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <KeyboardAvoidingView style={{ flex: 1 }}>
            {content}
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
      <View style={styles.bottom}>
        <Button
          title="Restart"
          onPress={restartHandler}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  bottom: {
    borderTopColor: Colors.primaryVariant,
    borderTopWidth: 1,
    backgroundColor: Colors.primary,
  },
});

export default App;
