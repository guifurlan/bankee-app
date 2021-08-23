import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { textStyle, iconStyle } from '../../style';

const CheckBox = ({label, onSelect, isSelected, backgroundColor, color}) => {
    const {
        checkboxContainerStyle,
        containerStyle,
        selectedStyle,
        labelStyle
    } = styles;

    renderSelectedIcon = (isSelected) => {
        if(isSelected){
            return <Text style={[iconStyle, {color: '#f9f9f9'}]}>{'\uf00c'}</Text>
        }
    }

    return (
        <View>
            <View style={containerStyle}>
                <TouchableWithoutFeedback  onPress={() => onSelect()}>
                    <View style={[checkboxContainerStyle, isSelected ? selectedStyle : {}]}>
                        {this.renderSelectedIcon(isSelected)}
                    </View>
                </TouchableWithoutFeedback>
                <Text style={[textStyle, labelStyle]}>{label}</Text>
            </View>
        </View>
    );
};

const styles = {
    containerStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: 30,
        marginLeft: 5,
        marginVertical: 15
    },
    checkboxContainerStyle: {
        width: 25,
        height: 25,
        borderRadius: 3,
        borderWidth: 2,
        padding: 2,
        borderColor: '#161616',
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectedStyle: {
        backgroundColor: '#097e5b',
        borderColor: '#097e5b'
    },
    labelStyle: {
        marginLeft: 15,
        color: '#161616'
    }
}

export { CheckBox };