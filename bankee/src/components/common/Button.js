import React from 'react';
import { View, Text, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';

const Button = ({label, onButtonPress, loading, disabled, style}) => {
    const {
        containerStyle,
        buttonTextStyle
    } = styles;

    renderContent = () => {
        if(!loading){
            return <Text style={buttonTextStyle}>{label}</Text>
        }
        else {
            return <ActivityIndicator size="small" color="#f9f9f9" />
        }
    }

    handleButtonPress = () => {
        if(!loading){
            onButtonPress();
        }
    }

    return (
        <TouchableWithoutFeedback disabled={disabled} onPress={this.handleButtonPress.bind(this)}>
            <View style={[containerStyle, style]}>
                {this.renderContent()}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = {
    containerStyle: {
        marginTop: 10,
        padding: 10, 
        height: 50,
        alignContent: 'center', 
        justifyContent: 'center',
        backgroundColor: '#F2AE17',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5
    },
    buttonTextStyle: {
        color: '#f9f9f9', 
        alignSelf: 'center', 
        fontWeight: '500', 
        fontFamily: 'Roboto', 
        fontSize: 15
    }
}

export { Button };