import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import {
    Colors,
    DefaultStyles,
} from '../constants';

const MyButton = props => {
    const { primary, wide } = props;
    return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={props.onPress}
        >
            <View style={{
                ...styles.button({ wide }),
                backgroundColor: primary ? Colors.primary : Colors.second,
            }}>
                <Text
                    style={{
                        ...DefaultStyles.buttonText,
                        ...styles.buttonText,
                        color: primary ? Colors.primaryText : Colors.secondText,
                    }}
                >
                    {props.title}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
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

export default MyButton;
