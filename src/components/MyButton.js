import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import DefaultStyles from '../constants/DefaultStyles';
import Colors from '../constants/Colors';

const MyButton = props => {
    const { primary } = props;
    return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={props.onPress}
        >
            <View style={{
                ...styles.button,
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
    button: {
        flexDirection: 'row',
        paddingVertical: 16,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        // width: Dimensions.get('window').width / 3,
        borderRadius: 10,
    },
    buttonText: {
        marginLeft: 5,
        textTransform: 'uppercase',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default MyButton;
