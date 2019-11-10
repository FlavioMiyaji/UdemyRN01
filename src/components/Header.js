import React from 'react';
import {
    View,
    Platform,
    StyleSheet,
} from 'react-native';
import { Colors } from '../constants';
import TitleText from './TitleText';

const Header = props => {
    return (
        <View style={{
            ...styles.header,
            ...Platform.select({
                ios: styles.headerIos,
                android: styles.headerAndroid,
            })
        }}>
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
        alignItems: 'center',
        borderBottomWidth: 1,
    },
    headerIos: {
        backgroundColor: Colors.background,
        borderBottomColor: Colors.primary,
    },
    headerAndroid: {
        backgroundColor: Colors.primary,
        borderBottomColor: Colors.primaryVariant,
    },
    headerTitle: {
        color: Platform.OS === 'android' ? Colors.onPrimary : Colors.primary,
    },
});

export default Header;