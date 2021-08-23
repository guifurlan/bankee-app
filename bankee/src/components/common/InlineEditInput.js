import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { TextField } from './TextField';

const InlineEditInput = ({labelValue, editValue, onInputChange, isEditing, labelProps, inputProps, inputStyleProps, labelStyleProps, style}) => {
    const {
        containerStyle,
        inputStyle
    } = styles;

    renderInputLabel = () => {
        if(!isEditing){
            return (
                <View>
                    <Text {...labelProps} style={labelStyleProps}>{labelValue}</Text>
                </View>
            )
        }
    }

    renderInput = () => {
        if(isEditing){
            return (
                <View>
                    <TextInput underlineColorAndroid='rgba(0,0,0,0)' style={[inputStyle, inputStyleProps]} {...inputProps} value={editValue} onChangeText={(input) => onInputChange(input)} outlineColor='#BCBCBC' />
                </View>
            )
        }
    }

    return (
            <View style={[containerStyle, style]}>
                {this.renderInputLabel()}
                {this.renderInput()}
            </View>
    );
};

const styles = {
    containerStyle: {
    },
    inputStyle: {
        height: 25,
        borderBottomWidth: 0,
        fontFamily: 'Roboto',
        paddingHorizontal: 5,
        paddingVertical: 0,
        borderRadius: 5,
        backgroundColor: '#F1F1F1'
    }
}

export { InlineEditInput };