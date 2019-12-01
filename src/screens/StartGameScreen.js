import React, {
    useState,
    useEffect,
} from 'react';
import {
    View,
    Alert,
    Keyboard,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import { copilot, walkthroughable, CopilotStep } from 'react-native-copilot';
import { default as Icon } from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../constants';
import {
    Card,
    Input,
    BodyText,
    Button,
    TitleText,
    NumberContainer,
} from '../components';

const CopilotNumberContainer = walkthroughable(NumberContainer);
const CopilotButton = walkthroughable(Button);
const CopilotInput = walkthroughable(Input);

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
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

    let confirmedOutput;
    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => {
                            props.start();
                        }}
                    >
                        <Icon
                            solid
                            color={Colors.onSurface}
                            name="info-circle"
                            size={30}
                        />
                    </TouchableOpacity>
                    <BodyText style={{ color: Colors.onSurface }}>You selected</BodyText>
                </View>
                <CopilotStep text="Here's the number you typed." order={4} name="selectedNumber">
                    <CopilotNumberContainer>
                        {selectedNumber}
                    </CopilotNumberContainer>
                </CopilotStep>
                <CopilotStep text="You may start the game." order={5} name="start-game-button">
                    <CopilotButton
                        primary
                        wide
                        title="Start Game"
                        onPress={() => (
                            props.onStartGame(selectedNumber)
                        )}
                    />
                </CopilotStep>
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
            <View style={styles.screen}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => {
                            props.start();
                        }}
                    >
                        <Icon
                            solid
                            color={Colors.onBackground}
                            name="info-circle"
                            size={30}
                        />
                    </TouchableOpacity>
                    <TitleText style={styles.title}>Start a New Game!</TitleText>
                </View>
                <Card style={styles.inputContainer}>
                    <BodyText style={{ color: Colors.onSurface }}>Select a Number</BodyText>
                    <CopilotStep text="First thing, select a number between 1 and 999." order={1} name="inputNumber">
                        <CopilotInput
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
                    </CopilotStep>
                    <View style={styles.buttonContainer}>
                        <CopilotStep text="Then if you want another number you can resent it." order={2} name="resetButton">
                            <CopilotButton
                                color={Colors.primaryVariant}
                                wide={windowSize.width > 600}
                                title="Reset"
                                onPress={resetInputHandler}
                            />
                        </CopilotStep>
                        <CopilotStep text="Then if you are shoure about this number you can confirm it." order={3} name="confirmButton">
                            <CopilotButton
                                primary
                                wide={windowSize.width > 600}
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
                        </CopilotStep>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
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
        color: Colors.onBackground,
    },
    inputContainer: {
        width: '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 15,
    },
    input: {
        width: 80,
        textAlign: 'center',
    },
    summaryContainer: {
        marginTop: 20,
        padding: 20,
        alignItems: 'center',
        width: '70%',
    }
});

const circleSvgPath = ({ position, canvasSize }) => (
    `M0,0H${canvasSize.x}V${canvasSize.y}H0V0ZM${position.x._value},${position.y._value}Za50 50 0 1 0 100 0 50 50 0 1 0-100 0`
);

export default copilot({
    overlay: 'svg', // or 'view'
    animated: true, // or false
    svgMaskPath: circleSvgPath,
    labels: {
        previous: 'Anterior',
        next: 'Proximo',
        skip: 'Pular',
        finish: 'Parar',
    }
})(React.forwardRef(StartGameScreen));