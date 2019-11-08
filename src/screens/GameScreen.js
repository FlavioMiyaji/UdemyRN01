import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Alert,
    Keyboard,
    FlatList,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import TitleText from '../components/TitleText';
import MyButton from '../components/MyButton';
import BodyText from '../components/BodyText';

const renderListItem = ({ guessNum, guess }) => (
    <View
        // key={guessNum}
        style={styles.listItem}
    >
        <BodyText>{guessNum}</BodyText>
        <BodyText>{guess}</BodyText>
    </View>
);

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

    return (
        <TouchableWithoutFeedback
            onPress={() => (Keyboard.dismiss())}
        >
            <View style={styles.screen}>
                <View>
                    <TitleText style={styles.title}>Opponent's Guess!</TitleText>
                    <NumberContainer>{currentGuess}</NumberContainer>
                </View>
                <Card style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <MyButton
                            title="Lower"
                            onPress={nextGuessHandler.bind(this, 'lower')}
                        />
                    </View>
                    <View style={styles.button}>
                        <MyButton
                            title="Greater"
                            onPress={nextGuessHandler.bind(this, 'greater')}
                        />
                    </View>
                </Card>
                <View style={styles.listContainer}>
                    {/* <ScrollView contentContainerStyle={styles.list}>
                        {pastGuess.map((guess, index) => renderListItem({
                            guessNum: pastGuess.length - index,
                            guess,
                        }))}
                    </ScrollView> */}
                    <FlatList
                        contentContainerStyle={styles.list}
                        data={pastGuess}
                        keyExtractor={(item) => String(item)}
                        renderItem={(itemData) => (
                            renderListItem({
                                guessNum: pastGuess.length - itemData.index,
                                guess: itemData.item,
                            })
                        )}
                    />
                </View>
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
        maxWidth: '80%',
    },
    button: {
        width: 100,
        marginHorizontal: 5,
    },
    listContainer: {
        flex: 1,
        width: '60%',
        alignItems: 'center',
    },
    list: {
        width: '60%',
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    listItem: {
        marginVertical: 4,
        borderColor: '#ccc',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        width: '100%',
    },
});

export default GameScreen;