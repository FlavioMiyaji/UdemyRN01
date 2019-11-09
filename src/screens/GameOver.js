import React from 'react';
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
    return (
        <TouchableWithoutFeedback
            onPress={() => (Keyboard.dismiss())}
        >
            <View style={styles.screen}>
                <TitleText style={styles.title}>The game is over!</TitleText>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/success.png')}
                        // source={{ uri: 'https://img.elo7.com.br/product/original/FCE042/quadro-paisagem-quadro-paisagem.jpg' }}
                        style={styles.image}
                        resizeMode="cover"
                        fadeDuration={1000}
                    />
                </View>
                <View style={styles.resultContainer}>
                    <BodyText
                        style={styles.resultText}
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
    imageContainer: {
        width: Dimensions.get("window").width * 0.7,
        height: Dimensions.get("window").width * 0.7,
        borderRadius: (Dimensions.get("window").width * 0.7) / 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get("window").height / 30,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    resultContainer: {
        marginHorizontal: 50,
        justifyContent: 'center',
        marginVertical: Dimensions.get("window").height / 60,
    },
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get("window").height < 600 ? 16 : 20,
    },
    highlight: {
        color: Colors.primary,
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export default GameOver;