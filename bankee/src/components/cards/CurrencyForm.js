import React from  'react';
import { View, Picker } from 'react-native';
import { OLINDA_BASE_API, OLINDA_CURRENCY_SERVICE } from '../../properties'; 
import { textStyle } from '../../style';

class CurrencyForm extends React.Component {
    static currencies = [];
    
    static fetchCurrencies({ onLoadingChange, onCardDataChange, onError, cardData }){
        onLoadingChange(true);

        fetch(OLINDA_BASE_API + OLINDA_CURRENCY_SERVICE + 
                '/Moedas?%24format=json&%24' +
                'select=simbolo,nomeFormatado,tipoMoeda&%24' +
                'orderby=nomeFormatado'
        ).then(response => {
            response.json().then(data => {
                CurrencyForm.currencies = data.value;
                onCardDataChange({ ...cardData, currency: data.value[0] });
                onLoadingChange(false);
            });
        }).catch(error => {
            onCardDataChange({});
            onError(true);
        });
    }

    constructor(props){
        super(props);
        this.currencies = [];
    }

    componentWillMount(){
        if(!CurrencyForm.currencies.length){
            CurrencyForm.fetchCurrencies(this.props);
        }
        else {
            this.props.onCardDataChange({ ...this.props.cardData, currency: CurrencyForm.currencies[0], viewOption: 1 });
        }
    }

    onCurrencyChange(itemValue){
        this.props.onCardDataChange({ ...this.props.cardData, currency: itemValue });
    }

    onViewOptionChange(itemValue) {
        this.props.onCardDataChange({ ...this.props.cardData, viewOption: itemValue });
    }

    render() {
        return (
            <View>
                <View style={styles.pickerStyle}>
                    <Picker 
                        selectedValue={this.props.cardData.currency}
                        style={{ height: 30, width: '100%' }}
                        onValueChange={this.onCurrencyChange.bind(this)}>
                        {CurrencyForm.currencies.map((currency, index) => {
                            return <Picker.Item key={index} label={currency.nomeFormatado} value={currency} />
                        })}
                    </Picker>
                </View>
                <View style={styles.pickerStyle}>
                    <Picker 
                        selectedValue={this.props.cardData.viewOption}
                        style={{ height: 30, width: '100%' }}
                        onValueChange={this.onViewOptionChange.bind(this)}>
                        <Picker.Item value={1} label='Valor hoje' />
                        <Picker.Item value={2} label='Últimos 30 dias' />
                        <Picker.Item value={3} label='Últimos 6 meses' />
                        <Picker.Item value={4} label='Últimos 12 meses' />
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

export default CurrencyForm;