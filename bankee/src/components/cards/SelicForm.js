import React from  'react';
import { View, Picker } from 'react-native';
import { textStyle } from '../../style';

class SelicForm extends React.Component {
    componentWillMount(){
        this.props.onCardDataChange({ ...this.props.cardData, viewOption: 1 });
    }

    onViewOptionChange(itemValue) {
        this.props.onCardDataChange({ ...this.props.cardData, viewOption: itemValue });
    }

    render() {
        return (
            <View style={styles.pickerStyle}>
                <Picker 
                    selectedValue={this.props.cardData.viewOption}
                    style={{ height: 30, width: '100%' }}
                    onValueChange={this.onViewOptionChange.bind(this)}>
                    <Picker.Item value={1} label='Valor hoje' />
                    <Picker.Item value={2} label='Acumulado no mês' />
                    <Picker.Item value={3} label='Acumulado em 6 meses' />
                    <Picker.Item value={4} label='Acumulado em 12 meses' />
                </Picker>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
    },
    textStyle: {
        ...textStyle,
        color: '#161616'
    },
    pickerStyle: {
        borderRadius: 5,
        borderWidth: 1,
        marginTop: 10,
        borderColor: '#BCBCBC'
    }
};

export default SelicForm;