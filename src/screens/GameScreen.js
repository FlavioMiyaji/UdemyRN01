import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Alert,
    Keyboard,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native';
import {
    Card,
    MyButton,
    BodyText,
    TitleText,
    NumberContainer,
} from '../components';

const renderListItem = ({ guessNum, guess }) => (
    <Card
        key={guessNum}
        style={styles.listItem}
    >
        <BodyText>{guessNum}</BodyText>
        <BodyText>{guess}</BodyText>
    </Card>
);

const generateRandomBetween = ({ min, max, exclude }) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude || rndNum === 0) {
        return generateRandomBetween({ min, max, exclude });
    }
    return rndNum;
};

const GameScreen = props => {
    const { userChoice, onEndGame } = props;

    const initialGuess = generateRandomBetween({
        min: 0,
        max: 1000,
        exclude: userChoice
    });
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuess, setPastGuess] = useState([initialGuess]);
    const minGuess = useRef(0);
    const maxGuess = useRef(1000);

    useEffect(() => {
        if (currentGuess === userChoice) {
            onEndGame(pastGuess);
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
            minGuess.current = currentGuess + 1;
        } else {
            maxGuess.current = currentGuess;
        }
        const newNum = generateRandomBetween({
            min: minGuess.current,
            max: maxGuess.current,
            exclude: currentGuess,
        });
        setCurrentGuess(newNum);
        setPastGuess(current => [newNum, ...current]);
    };
    const numberContent = (
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={nextGuessHandler.bind(this, 'lower')}
            >
                <Text style={{ borderWidth: 1, padding: 15 }}>-</Text>
            </TouchableOpacity>
            <NumberContainer>{currentGuess}</NumberContainer>
            <TouchableOpacity
                onPress={nextGuessHandler.bind(this, 'greater')}
            >
                <Text style={{ borderWidth: 1, padding: 15 }}>+</Text>
            </TouchableOpacity>
        </View>
    );
    if (Dimensions.get('window').height > 600) {
        numberContent = (
            <View>
                <NumberContainer>{currentGuess}</NumberContainer>
                <Card style={styles.buttonContainer}>
                    <MyButton
                        title="Lower"
                        onPress={nextGuessHandler.bind(this, 'lower')}
                    />
                    <MyButton
                        title="Greater"
                        onPress={nextGuessHandler.bind(this, 'greater')}
                    />
                </Card>
            </View>
        );
    }

    return (
        <TouchableWithoutFeedback
            onPress={() => (Keyboard.dismiss())}
        >
            <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={styles.screen}>
                    <TitleText style={styles.title}>Opponent's Guess!</TitleText>
                    {numberContent}
                </View>
                {pastGuess.map((guess, index) => renderListItem({
                    guessNum: pastGuess.length - index,
                    guess,
                }))}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
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
        marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
        marginVertical: 10,
        width: '80%',
    },
    button: {
        width: 100,
        marginHorizontal: 5,
    },
    listItem: {
        margin: 2,
        padding: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
    },
});

export default GameScreen;
