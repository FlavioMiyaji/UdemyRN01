import React, { useState } from 'react';
import {
  View,
  FlatList,
  StatusBar,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

const App = () => {
  const [courseGoals, setCourseGoals] = useState([]);

  return (
    <View style={styles.body}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <GoalInput
          courseGoals={courseGoals}
          onPress={(value) => {
            if (!value || value.length <= 0) {
              return;
            }
            debugger;
            setCourseGoals([
              ...courseGoals, {
                key: Math.random().toString(),
                value,
              }
            ]);
          }}
        />
        <FlatList
          data={courseGoals}
          style={styles.flatList}
          keyExtractor={(item, index) => item.key}
          renderItem={({ item: { key, value } }) => (
            <GoalItem
              title={`${value} (${key})`}
              onPress={() => (
                setCourseGoals(courseGoals.filter(goal => (
                  key !== goal.key
                )))
              )}
            />
          )}
          contentInsetAdjustmentBehavior="automatic"
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.lighter,
  },
  flatList: {
    padding: 15,
  },
});

export default App;
