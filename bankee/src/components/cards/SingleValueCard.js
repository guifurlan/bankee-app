import React from  'react';
import { View, Text, ActivityIndicator } from 'react-native';

import Card from './Card';
import * as formTypes from './types';
import { textStyle, iconStyle } from '../../style';

import { OLINDA_BASE_API, OLINDA_CURRENCY_SERVICE, BCB_BASE_API, BCB_SELIC_SERIES, BCB_SELIC_ACCUM } from '../../properties'; 

class SingleValueCard extends React.Component {
    state = {loading: false, value: null}

    componentWillMount({ cardData } = this.props){
        switch(cardData.formType.key){
            case formTypes.CURRENCY_PRICE.key:
                return this.getCurrencyValue();
            case formTypes.SELIC_RATE.key:
                return this.getSelicValue();
        }
    }

    getVariation(value, oldValue){
        return ((value - oldValue)/value) * 100;
    }

    renderVariation(){
        if(!this.state.variation){
            return;
        }

        var color;
        var icon;

        if(this.state.variation >= 0){
            color = 'rgba(156,204,101,1)';
            icon = '\uf106';
        }
        else {
            color = 'rgba(204,60,150,1)';
            icon = '\uf107';  
        }

        return (
            <View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={[ iconStyle, { color }]}>
                        { icon }
                    </Text>
                    <Text style={[ textStyle, { color, marginLeft: 5 }]}>
                        { Math.abs(Number(this.state.variation.toFixed(2))) + '%' }
                    </Text>
                </View>
            </View>
        );
    }

    getCurrentDate(){
        const today = new Date();
        const dd = today.getDate();
        const mm = today.getMonth() + 1;

        const MM = ((mm < 10) ? '0' : '') + mm;
        const DD = ((dd < 10) ? '0' : '') + dd;

        return MM + '-' + DD + '-' + today.getFullYear();
    }
    
    getInitialDate(daysAgo){
        var initialDate = new Date();
        const today = new Date();
        
        initialDate.setDate(today.getDate() - daysAgo);

        const dd = initialDate.getDate();
        const mm = initialDate.getMonth() + 1;

        const MM = ((mm < 10) ? '0' : '') + mm;
        const DD = ((dd < 10) ? '0' : '') + dd;

        return MM + '-' + DD + '-' + initialDate.getFullYear();
    }

    getCurrencyValue({ cardData } = this.props){
        const title = cardData.formType.value + ' ' +
            cardData.currency.nomeFormatado + ' hoje';

        fetch(OLINDA_BASE_API + OLINDA_CURRENCY_SERVICE +
            `/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?` +
            `@moeda=\'${cardData.currency.simbolo}\'` + `&@dataInicial=\'${this.getInitialDate(5)}\'` +
            `&@dataFinalCotacao=\'${this.getCurrentDate()}\'` +
            `&$filter=tipoBoletim%20eq%20\'Fechamento\'&$top=100&$orderby=dataHoraCotacao%20desc&$format=json&$select=cotacaoVenda,dataHoraCotacao`)
        .then(response => {
            response.json().then(data => {
                var value;
                var variation;
                if(data.value && data.value.length){
                    value = 'R$ ' + data.value[data.value.length - 1].cotacaoVenda;

                    if(data.value.length > 1){
                        variation = this.getVariation(data.value[data.value.length - 1].cotacaoVenda, data.value[data.value.length - 2].cotacaoVenda);
                    }
                }
                this.setState({...this.state, loading: false, value, variation});
            });
        }).catch(error => {
            this.setState({...this.state, loading: false});
        });

        this.setState({...this.state, loading: true, title, color: 'rgba(60,135,255,1)'});
    }

    getSelicValue({ cardData } = this.props){
        let title = cardData.formType.value
        title += cardData.viewOption === 1 ? ' hoje' : ' acumulado no mês';
        
        fetch(BCB_BASE_API + 
            (cardData.viewOption === 1 ? BCB_SELIC_SERIES : BCB_SELIC_ACCUM) + 
            '/ultimos/2?formato=json')
        .then(response => {
            response.json().then(data => {
                var value;
                var variation;
                if(data && data.length > 1){
                    value = data[1].valor + '%';  
                    variation = this.getVariation(data[data.length - 1].valor, data[data.length - 2].valor);
                }
                this.setState({...this.state, loading: false, value, variation});
            });
        }).catch(error => {
            this.setState({...this.state, loading: false});
        });

        this.setState({...this.state, loading: true, title, color: 'rgba(160,125,255,1)'});
    }

    render() {
        return (
            <Card title={this.state.title} color={this.state.color} id={this.props.cardData.uid}>
                <View style={styles.containerStyle}>
                    <View style={{width: '100%', alignItems: 'flex-end'}}>
                        {
                            this.state.loading ?
                            <ActivityIndicator size='large' color='white'/>
                            :
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                {this.renderVariation()}
                                <Text style={[textStyle, {fontSize: 30}]}> {this.state.value || '(N/D)'} </Text>
                            </View>
                        }
                    </View>
                </View>
            </Card>
        );
    }
}

const styles = {
    containerStyle: {
        width: '100%', 
        alignItems: 'flex-end'
    }
};

export default SingleValueCard;