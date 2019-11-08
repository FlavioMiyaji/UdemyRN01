import React from 'react';
import {
    View,
    Text,
    Image,
    Keyboard,
    StyleSheet,
    ScrollView,
    TouchableWithoutFeedback,
} from 'react-native';
import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import Colors from '../constants/Colors';
import MyButton from '../components/MyButton';

const GameOver = props => {
    const { pastGuess } = props;
    return (
        <TouchableWithoutFeedback
            onPress={() => (Keyboard.dismiss())}
        >
            <ScrollView>
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
                    <View style={styles.button}>
                        <MyButton
                            primary
                            title="New Game"
                            onPress={props.onRestart}
                        />
                    </View>
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
        width: 280,
        height: 280,
        borderRadius: 140,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    resultContainer: {
        marginVertical: 10,
        marginHorizontal: 50,
        justifyContent: 'center',
    },
    resultText: {
        textAlign: 'center',
    },
    highlight: {
        color: Colors.primary,
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export default GameOver;