import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import BodyText from './BodyText';

const GoalItem = props => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
        >
            <View style={styles.listItem}>
                <BodyText>
                    {props.title}
                </BodyText>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    listItem: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
    },
});

export default GoalItem;