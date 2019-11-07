import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Alert,
    Button,
    Keyboard,
    StyleSheet,
    ScrollView,
    TouchableWithoutFeedback,
} from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import TitleText from '../components/TitleText';

const generateRandomBetween = ({ min, max, exclude }) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween({ min, max, exclude });
    }
    return rndNum;
};

const GameScreen = props => {
    const { userChoice, onEndGame } = props;

    const minGuess = useRef(1);
    const maxGuess = useRef(1000);
    const [currentGuess, setCurrentGuess] = useState(
        generateRandomBetween({
            min: minGuess.current,
            max: maxGuess.current,
            exclude: userChoice
        })
    );
    const [rounds, setRounds] = useState(0);

    useEffect(() => {
        if (currentGuess === userChoice) {
            onEndGame(rounds);
        }
    }, [currentGuess, userChoice, onEndGame]);

    const nextGuessHandler = direction => {
        const greater = direction === 'greater';
        if ((greater && currentGuess > userChoice) ||
            (!greater && currentGuess < userChoice)) {
            Alert.alert(
                'Don\'t lie!',
                'You know that this is wrong...',
                [{ text: 'Sorry!', style: 'cancel' }],
            );
            return;
        }
        if (greater) {
            minGuess.current = currentGuess;
        } else {
            maxGuess.current = currentGuess;
        }
        const newNum = generateRandomBetween({
            min: minGuess.current,
            max: maxGuess.current,
            exclude: currentGuess,
        });
        setCurrentGuess(newNum);
        setRounds(current => current + 1);
    };

    return (
        <TouchableWithoutFeedback
            onPress={() => (Keyboard.dismiss())}
        >
            <ScrollView>
                <View style={styles.screen}>
                    <View>
                        <TitleText style={styles.title}>Opponent's Guess!</TitleText>
                        <NumberContainer>{currentGuess}</NumberContainer>
                    </View>
                    <Card style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button
                                title="Lower"
                                onPress={nextGuessHandler.bind(this, 'lower')}
                            />
                        </View>
                        <View style={styles.button}>
                            <Button
                                title="Greater"
                                onPress={nextGuessHandler.bind(this, 'greater')}
                            />
                        </View>
                    </Card>
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
        maxWidth: '80%',
    },
    button: {
        width: 100,
        marginHorizontal: 5,
    },
});

export default GameScreen;