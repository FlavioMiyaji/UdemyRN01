import React from 'react';
import {
    Text as RNText,
} from 'react-native';
import { DefaultStyles } from '../constants';

const TitleText = props => (
    <RNText
        {...props}
        style={{
            ...DefaultStyles.title,
            ...props.style,
        }}
    >
        {props.children}
    </RNText>
);

export default TitleText;
