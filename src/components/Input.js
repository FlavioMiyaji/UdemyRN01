import React from 'react';
import {
    View,
    StyleSheet,
    TextInput as RNTextInput
} from 'react-native';
import { Colors } from '../constants';

const Input = props => {
    const componentStyle = { ...styles.input, ...props.style };
    return (
        <View style={styles.inputContainer}>
            <RNTextInput
                blurOnSubmit
                {...props}
                style={componentStyle}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        shadowColor: Colors.onSecondary,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        shadowOpacity: 0.26,
        elevation: 1,
        borderRadius: 10,
        margin: 10,
        paddingVertical: 10,
        paddingHorizontal: 2,
        backgroundColor: Colors.secondary,
    },
    input: {
        color: Colors.onSecondary,
        padding: 0,
    },
});

export default Input;
