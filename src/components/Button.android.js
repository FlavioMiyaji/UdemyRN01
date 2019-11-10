import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
} from 'react-native';
import {
    Colors,
    DefaultStyles,
} from '../constants';

const Button = props => {
    const { primary, wide } = props;
    let ButtonComponent = TouchableOpacity;
    if (Platform.Version >= 21) {
        ButtonComponent = TouchableNativeFeedback;
    }
    return (
        <View style={styles.buttonContainer}>
            <ButtonComponent
                activeOpacity={0.6}
                onPress={props.onPress}
            >
                <View style={{
                    ...styles.button({ wide }),
                    backgroundColor: primary ? Colors.primary : Colors.primaryVariant,
                }}>
                    <Text
                        style={{
                            ...DefaultStyles.buttonText,
                            ...styles.buttonText,
                            color: primary ? Colors.onPrimary : Colors.onPrimaryVariant,
                        }}
                    >
                        {props.title}
                    </Text>
                </View>
            </ButtonComponent>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 6,
        overflow: 'hidden',
    },
    button: ({ wide }) => ({
        flexDirection: 'row',
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        margin: 10,
        minWidth: wide ? '50%' : '40%',
    }),
    buttonText: {
        textTransform: 'uppercase',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Button;
