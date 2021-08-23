import React from 'react';
import { View, TextInput, Image, Text } from 'react-native';
import { textStyle } from '../../style';

class TextField extends React.Component {
    renderIcon = (icon) => {
        if(icon){
            return (
                <View style={styles.iconContainerStyle}>
                    <Image style={styles.iconStyle} source={icon} />
                </View>
            );
        }
    }
    
    renderTitle(title, color){
        if(title){
            return <Text style={[textStyle, {color: color || '#02ADB5'}]}>{title}</Text>;
        }
    }

    render({
        icon, 
        title, 
        titleColor, 
        onChangeText, 
        value, 
        placeholder, 
        spellcheck, 
        secureTextEntry, 
        error, 
        outlineColor, 
        keyboardType,
        solid,
        style
        } = this.props) {

        const {
            solidInputContainerStyle,
            solidTextInputStyle,
            containerStyle,
            textInputStyle,
            errorStyle
        } = styles;

        return (
            <View style={{ marginTop: 10 }}>
                {this.renderTitle(title, titleColor)}
                <View style={[ 
                    containerStyle, 
                    solid ? solidInputContainerStyle : {}, 
                    { borderBottomColor: outlineColor ? outlineColor : '#f9f9f9' }, 
                    error ? errorStyle : {},  ]}
                >
                    {this.renderIcon(icon)}
                    <TextInput 
                        style={[textInputStyle, solid ? solidTextInputStyle : {}, { color: outlineColor || '#f9f9f9' }, style]} 
                        placeholderTextColor={ error ? 'red' : '#f9f9f9' }
                        selectionColor='#f9f9f9'
                        autocorrect={false}
                        keyboardType={keyboardType || 'default'}
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => onChangeText(text)} 
                        value={value} 
                        placeholder={placeholder} 
                        spellcheck={spellcheck}
                        secureTextEntry={secureTextEntry}/>
                </View>
            </View>
        );
    };
}

const styles = {
    containerStyle: {
        flexDirection: 'row', 
        borderBottomWidth: 1, 
        borderBottomColor: '#f9f9f9'
    },
    errorStyle: {
        borderBottomColor: 'red'
    },
    solidInputContainerStyle: {
        borderRadius: 5,
        backgroundColor: '#02ADB5',
        borderBottomWidth: 0
    },
    iconContainerStyle: {
        marginLeft: 10, 
        marginRight: 10, 
        alignSelf: 'center',
        width: 20, 
        height: 20
    },
    iconStyle: {
        alignSelf: 'center'
    },
    textInputStyle: {
        flex: 1,
        height: 35, 
        borderBottomWidth: 0,
        fontFamily: 'Roboto',
        padding: 0
    },
    solidTextInputStyle: {
        padding: 10,
        height: 45
    },
    inputTitleStyle: {
        color: '#02ADB5'
    }
}

export { TextField };