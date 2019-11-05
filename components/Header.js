import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Colors from '../constants/Colors';

const Header = props => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>
                {props.title}
            </Text>
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
        fontSize: 18,
    },
});

export default Header;