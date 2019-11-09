import { StyleSheet } from 'react-native';
import {
    Colors,
    Fonts,
} from '.';

const DefaultStyles = StyleSheet.create({
    title: {
        color: Colors.primaryText,
        fontFamily: Fonts.bold,
        fontSize: 22,
    },
    body: {
        color: Colors.primaryText,
        fontFamily: Fonts.regular,
        fontSize: 16,
    },
    buttonText: {
        fontFamily: Fonts.regular,
        fontSize: 16,
    },
});

export default DefaultStyles;
