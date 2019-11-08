import { StyleSheet } from 'react-native';
import Fonts from './Fonts';

const DefaultStyles = StyleSheet.create({
    title: {
        fontFamily: Fonts.bold,
        fontSize: 22,
    },
    body: {
        fontFamily: Fonts.regular,
        fontSize: 16,
    },
    buttonText: {
        fontFamily: Fonts.regular,
        fontSize: 16,
    },
});

export default DefaultStyles;
