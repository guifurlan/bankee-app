import React from  'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { textStyle, titleLgStyle, iconStyle } from '../../style';

const Header = ({ label, iconLabel, noOptions, onOptions }) => {
    return (
        <View style={styles.headerContainerStyle}>
            {renderLabel(label, iconLabel)}
            {renderOptions(noOptions, onOptions)}
        </View>
    );
};

renderLabel = (label, iconLabel) => {
    if(iconLabel){
        return (
            <Image style={styles.headerTitleStyle} resizeMode='contain' source={iconLabel} />
        );
    }
    else if (label){
        return (
            <Text style={[textStyle, titleLgStyle, styles.headerTitleStyle]}>
                {label ? label.toUpperCase() : ''}
            </Text>
        );
    }
}

renderOptions = (noOptions, onOptions) => {
    if(!noOptions){
        return (
            <TouchableOpacity style={styles.headerMenuStyle} onPress={onOptions}>
                <Text style={iconStyle}>
                    &#xf142;
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = {
    headerContainerStyle: {
        height: 50,
        backgroundColor:  '#02ADB5',
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        elevation: 5
    },
    headerTitleStyle: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 20,
        alignSelf: 'center'
    },
    headerMenuStyle: {
        paddingTop: 5,
        paddingLeft: 10,
        paddingBottom: 5,
        paddingRight: 10,
        marginRight: 10,
        alignSelf: 'center'
    }
};

export { Header };