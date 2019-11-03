import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

const GoalItem = props => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
        >
            <View style={styles.listItem}>
                <Text>
                    {props.title}
                </Text>
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