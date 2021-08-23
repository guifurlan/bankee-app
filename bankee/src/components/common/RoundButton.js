import React from 'react';
import { View, TouchableOpacity } from 'react-native';

const RoundButton = ({onButtonPress, loading, disabled, color, children}) => {
    const {
        containerStyle
    } = styles;

    return (
        <TouchableOpacity disabled={disabled || loading} onPress={onButtonPress}>
            <View style={[containerStyle, { backgroundColor: color || '#F2AE17' }]}>
                {children}
            </View>
        </TouchableOpacity>
    );
};

const styles = {
    containerStyle: {
        margin: 15, 
        height: 60,
        width: 60,
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5
    }
}

export { RoundButton };