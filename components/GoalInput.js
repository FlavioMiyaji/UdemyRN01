import React, { useState } from 'react';
import {
    View,
    Button,
    TextInput,
    StyleSheet,
} from 'react-native';

const GoalInput = props => {
    const [enteredGoal, setEmteredGoal] = useState('');
    return (
        <View style={styles.inputContainer}>
            <TextInput
                placeholder="Course Goal"
                style={styles.input}
                value={enteredGoal}
                onChangeText={(text) => setEmteredGoal(text)}
            />
            <Button
                title="Add"
                onPress={() => {
                    props.onPress();
                    setEmteredGoal('');
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        padding: 15,
        paddingBottom: 5,
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        width: '80%',
    },
});

export default GoalInput;