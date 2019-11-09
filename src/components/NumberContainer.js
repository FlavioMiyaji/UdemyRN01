import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { Colors } from '../constants';
import BodyText from './BodyText';

const NumberContainer = props => {
    return (
        <View style={styles.container}>
            <BodyText style={styles.number}>
                {props.children}
            </BodyText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: Colors.primary,
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    number: {
        color: Colors.primary,
        fontSize: 22,
    }
});

export default NumberContainer;