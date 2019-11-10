import React, {
    useState,
    useEffect,
} from 'react';
import {
    View,
    Text,
    Image,
    Keyboard,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native';
import {
    TitleText,
    BodyText,
    MyButton,
} from '../components';
import { Colors } from '../constants';

const GameOver = props => {
    const { pastGuess } = props;
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

    return (
        <TouchableWithoutFeedback
            onPress={() => (Keyboard.dismiss())}
        >
            <View style={styles.screen}>
                <TitleText style={styles.title}>The game is over!</TitleText>
                <View style={styles.imageContainer({ windowSize })}>
                    <Image
                        source={require('../assets/success.png')}
                        // source={{ uri: 'https://img.elo7.com.br/product/original/FCE042/quadro-paisagem-quadro-paisagem.jpg' }}
                        style={styles.image}
                        resizeMode="cover"
                        fadeDuration={1000}
                    />
                </View>
                <View style={styles.resultContainer({ windowSize })}>
                    <BodyText
                        style={styles.resultText({ windowSize })}
                        numberOfLines={3}
                        ellipsizeMode="tail"
                    >
                        Your phone needed <Text style={styles.highlight}>{pastGuess.length}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userChoice}</Text>.
                        </BodyText>
                </View>
                <MyButton
                    primary
                    title="New Game"
                    onPress={props.onRestart}
                />
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    button: {
        width: 100,
        marginVertical: 15,
    },
    imageContainer: ({ windowSize }) => ({
        width: windowSize.width * 0.7,
        height: windowSize.width * 0.7,
        borderRadius: (windowSize.width * 0.7) / 2,
        borderWidth: 3,
        borderColor: Colors.primary,
        overflow: 'hidden',
        marginVertical: windowSize.height / 30,
    }),
    image: {
        width: '100%',
        height: '100%',
    },
    resultContainer: ({ windowSize }) => ({
        marginHorizontal: 50,
        justifyContent: 'center',
        marginVertical: windowSize.height / 60,
    }),
    resultText: ({ windowSize }) => ({
        textAlign: 'center',
        fontSize: windowSize.height < 600 ? 16 : 20,
    }),
    highlight: {
        color: Colors.primary,
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export default GameOver;