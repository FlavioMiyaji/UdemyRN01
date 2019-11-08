import React from 'react';
import {
    Text as RNText,
} from 'react-native';
import DefaultStyles from '../constants/DefaultStyles';

const BodyText = props => (
    <RNText
        {...props}
        style={{
            ...DefaultStyles.body,
            ...props.style,
        }}
    >
        {props.children}
    </RNText>
);

export default BodyText;
