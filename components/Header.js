import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import Colors from '../constants/Colors';
import TitleText from './TitleText';

const Header = props => {
    return (
        <View style={styles.header}>
            <TitleText style={styles.headerTitle}>
                {props.title}
            </TitleText>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        padding: 15,
        backgroundColor: Colors.primary,
        alignItems: 'center',
    },
    headerTitle: {
        color: Colors.primaryText,
    },
});

export default Header;