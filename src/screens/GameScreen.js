import React, {
    useState,
    useRef,
    useEffect,
} from 'react';
import {
    View,
    Text,
    Alert,
    Keyboard,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import {
    Card,
    Button,
    BodyText,
    TitleText,
    NumberContainer,
} from '../components';
import { Colors } from '../constants';

const renderListItem = ({ guessNum, guess }) => (
    <Card
        key={guessNum}
        style={styles.listItem}
    >
        <BodyText style={{ color: Colors.onSurface }}>{guessNum}</BodyText>
        <BodyText style={{ color: Colors.onSurface }}>{guess}</BodyText>
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
    const [windowSize, setWindowSize] = useState(Dimensions.get('window'));
    useEffect(() => {
        const updateDimensions = () => {
            setWindowSize(Dimensions.get('window'));
        };

        Dimensions.addEventListener('change', updateDimensions);
        return () => {
            Dimensions.removeEventListener('change', updateDimensions);
        };
    });

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
    let numberContent = () => (
        <View>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={{
                ...styles.buttonContainer,
                marginTop: 20,
            }}>
                <Button
                    title="Lower"
                    onPress={nextGuessHandler.bind(this, 'lower')}
                />
                <Button
                    title="Greater"
                    onPress={nextGuessHandler.bind(this, 'greater')}
                />
            </Card>
        </View>
    );
    if (windowSize.height < 400) {
        numberContent = () => (
            <View style={{
                ...styles.buttonContainer,
                marginTop: 10,
                alignItems: 'center',
                justifyContent: 'space-evenly',
            }}>
                <Button
                    title="Lower"
                    onPress={nextGuessHandler.bind(this, 'lower')}
                />
                <NumberContainer>{currentGuess}</NumberContainer>
                <Button
                    title="Greater"
                    onPress={nextGuessHandler.bind(this, 'greater')}
                />
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
                    {numberContent()}
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
        color: Colors.onBackground,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
        width: '80%',
    },
    button: {
        width: 100,
        marginHorizontal: 5,
    },
    listItem: {
        margin: 2,
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
    },
});

export default GameScreen;
