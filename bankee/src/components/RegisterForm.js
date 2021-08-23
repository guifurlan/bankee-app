import React from  'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { textStyle } from '../style'

class RegisterForm extends React.Component {
    canSkip(canSkip, onSkip, skipTitle) {
        if(canSkip){
            return (
                <TouchableOpacity onPress={() => onSkip()}>
                    <View><Text style={[textStyle, {color: '#161616', fontWeight: '500'}]}>{skipTitle || 'PULAR'}</Text></View>
                </TouchableOpacity>
            );
        }
    }

    render({canSkip, onSkip, skipTitle, title, onNext, nextTitle, children} = this.props) {
        return (
            <View style={styles.stepFormStyle}>
                <Text style={[textStyle, {color: '#161616', fontSize: 16, marginTop: 10}]}>{title}</Text>
                {children}
                <View style={styles.formButtonsContainer}>
                    <TouchableOpacity onPress={() => onNext()}>
                        <View><Text style={[textStyle, {color: '#F2AE17', fontWeight: '500'}]}>{nextTitle || 'PRÓXIMO'}</Text></View>
                    </TouchableOpacity>
                    {this.canSkip(canSkip, onSkip, skipTitle)}
                </View>
            </View>
        );
    }
}

const styles = {
    stepFormStyle: {
        flex: 1,
        paddingHorizontal: 20
    },
    formButtonsContainer: {
        flexDirection: 'row-reverse',
        width: '100%',
        paddingVertical: 20,
        justifyContent: 'space-between'
    }
};

export default RegisterForm;