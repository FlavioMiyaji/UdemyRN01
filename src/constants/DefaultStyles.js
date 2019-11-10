import { StyleSheet } from 'react-native';
import Fonts from './Fonts';
import Colors from './Colors';

const DefaultStyles = StyleSheet.create({
    title: {
        color: Colors.onPrimary,
        fontFamily: Fonts.bold,
        fontSize: 22,
    },
    body: {
        color: Colors.onPrimary,
        fontFamily: Fonts.regular,
        fontSize: 16,
    },
    buttonText: {
        fontFamily: Fonts.regular,
        fontSize: 16,
    },
});

export default DefaultStyles;
