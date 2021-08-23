import React from  'react';
import { View, Picker, Alert } from 'react-native';
import { textStyle } from '../../style';

class TaxForm extends React.Component {
    componentWillMount(){
        this.props.onCardDataChange({ ...this.props.cardData, bank1Value: 1, bank2Value: 2, taxOption: 1 });
    }

    onBank1Change(itemValue){
        if(itemValue === this.props.cardData.bank2Value)
            Alert.alert(
                'Os bancos precisam ser diferentes.'
            )
        else
            this.props.onCardDataChange({ ...this.props.cardData, bank1Value: itemValue });
    }

    onBank2Change(itemValue){
        if(this.props.cardData.bank1Value === itemValue)
            Alert.alert(
                'Os bancos precisam ser diferentes.'
            )
        else
            this.props.onCardDataChange({ ...this.props.cardData, bank2Value: itemValue });
    }

    onTaxOptionChange(itemValue) {
        this.props.onCardDataChange({ ...this.props.cardData, taxOption: itemValue });
    }

    render() {
        return (
            <View>
                <View style={styles.pickerStyle}>
                    <Picker
                        selectedValue={this.props.cardData.taxOption}
                        style={{ height: 30, width: '100%' }}
                        onValueChange={this.onTaxOptionChange.bind(this)}>
                        <Picker.Item value={1} label='Cartão de Crédito (Parcelado)' />
                        <Picker.Item value={2} label='Cartão de Crédito (Rotativo)' />
                        <Picker.Item value={3} label='Cheque Especial' />
                        <Picker.Item value={4} label='Crédito Consignado Privado' />
                        <Picker.Item value={5} label='Crédito Consignado Público' />
                        <Picker.Item value={6} label='Crédito Consignado INSS' />
                        <Picker.Item value={7} label='Crédito Pessoal' />
                        <Picker.Item value={8} label='Financiamento de Veículos' />
                    </Picker>
                </View>
                <View style={styles.pickerStyle}>
                    <Picker
                        selectedValue={this.props.cardData.bank1Value}
                        style={{ height: 30, width: '100%' }}
                        onValueChange={this.onBank1Change.bind(this)}>
                        <Picker.Item value={1} label='Banco do Brasil' />
                        <Picker.Item value={2} label='Bradesco' />
                        <Picker.Item value={3} label='Caixa Econômica Federal' />
                        <Picker.Item value={4} label='Itaú Unibanco' />
                        <Picker.Item value={5} label='Santander' />
                    </Picker>
                </View>
                <View style={styles.pickerStyle}>
                    <Picker
                        selectedValue={this.props.cardData.bank2Value}
                        style={{ height: 30, width: '100%' }}
                        onValueChange={this.onBank2Change.bind(this)}>
                        <Picker.Item value={1} label='Banco do Brasil' />
                        <Picker.Item value={2} label='Bradesco' />
                        <Picker.Item value={3} label='Caixa Econômica Federal' />
                        <Picker.Item value={4} label='Itaú Unibanco' />
                        <Picker.Item value={5} label='Santander' />
                    </Picker>
                </View>
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

export default TaxForm;
