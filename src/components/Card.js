import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { Colors } from '../constants';

const Card = props => {
    const componentStyle = { ...styles.card, ...props.style };
    return (
        <View style={componentStyle}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    card:{
        // width: 300,
        // maxWidth: '80%',
        // alignItems: 'center',
        shadowColor: Colors.onSurface,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 15,
        shadowOpacity: 0.26,
        elevation: 10,
        backgroundColor: Colors.surface,
        padding: 10,
        borderRadius: 10,
    },
});

export default Card;