import React, { useState } from 'react';
import {
    View,
    Text,
    Alert,
    Button,
    Keyboard,
    StyleSheet,
    ScrollView,
    TouchableWithoutFeedback,
} from 'react-native';
import Colors from '../constants/Colors';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    let confirmedOutput;
    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text>You selected</Text>
                <NumberContainer>
                    {selectedNumber}
                </NumberContainer>
                <Button title="Start Game" />
            </Card>
        );
    }

    const resetInputHandler = () => {
        setEnteredValue('');
        setSelectedNumber();
        setConfirmed(false);
        Keyboard.dismiss();
    };
    return (
        <TouchableWithoutFeedback
            onPress={() => (Keyboard.dismiss())}
        >
            <ScrollView>
                <View style={styles.screen}>
                    <View style={styles.title}>
                        <Text>Start a New Game!</Text>
                    </View>
                    <Card style={styles.inputContainer}>
                        <Text>Select a Number</Text>
                        <Input
                            style={styles.input}
                            maxLength={3}
                            autoCorrect={false}
                            autoCapitalize="none"
                            keyboardType="number-pad"
                            value={enteredValue}
                            onChangeText={newValue => (
                                setEnteredValue(newValue.replace(/[^0-9]/g, ''))
                            )}
                        />
                        <View style={styles.buttonContainer}>
                            <View style={styles.button}>
                                <Button
                                    color={Colors.second}
                                    title="Reset"
                                    onPress={resetInputHandler}
                                />
                            </View>
                            <View style={styles.button}>
                                <Button
                                    color={Colors.primary}
                                    title="Confirm"
                                    onPress={() => {
                                        const chosenNumber = parseInt(enteredValue);
                                        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 999) {
                                            Alert.alert(
                                                'Invalid value!',
                                                'Number has to be a number between 1 and 999.',
                                                [{
                                                    text: 'Okay',
                                                    style: 'destructive',
                                                    onPress: resetInputHandler,
                                                }],
                                            );
                                            return;
                                        }
                                        setConfirmed(true);
                                        setEnteredValue('');
                                        setSelectedNumber(chosenNumber);
                                        Keyboard.dismiss();
                                    }}
                                />
                            </View>
                        </View>
                    </Card>
                    {confirmedOutput}
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: "center",
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    button: {
        width: 100,
    },
    input: {
        width: 80,
        textAlign: 'center',
    },
    summaryContainer: {
        marginTop: 20,
        padding: 20,
        alignItems: 'center',
    }
});

export default StartGameScreen;