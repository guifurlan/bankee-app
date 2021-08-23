import React from  'react';
import { View, Text } from 'react-native';
import { textStyle, titleMdStyle, iconStyle } from '../../style';

const NavigationTab = ({title, icon, selected}) => {
    const {
        containerStyle,
        selectedStyle,
        iconContainerStyle
    } = styles;

    return (
        <View style={containerStyle}>
            <View style={iconContainerStyle}>
                <Text style={[iconStyle, selected ? selectedStyle : {}]}> {icon} </Text>
            </View>
            <Text style={[textStyle, titleMdStyle, selected ? selectedStyle : {}]}>{title}</Text>
        </View>
    );
};

const styles = {
    containerStyle: {
        alignSelf: 'center'
    },
    iconContainerStyle: {
        alignSelf: 'center',
        marginBottom: 2
    },
    selectedStyle: {
        color: '#F2AE17'
    }
};

export { NavigationTab };