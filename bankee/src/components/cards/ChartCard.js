import React from  'react';
import { View, Text, ActivityIndicator } from 'react-native';

import Card from './Card';
import * as formTypes from './types';
import { textStyle } from '../../style';

import { AreaChart, Grid, YAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

import { OLINDA_BASE_API, OLINDA_CURRENCY_SERVICE, BCB_BASE_API, BCB_SELIC_SERIES, BCB_SELIC_ACCUM } from '../../properties';

class ChartCard extends React.Component {
    state = {loading: false, labelFormatter: (value) => value, value: null, color: '#ffffff', values: []}

    componentWillMount({ cardData } = this.props){
        switch(cardData.formType.key){
            case formTypes.CURRENCY_PRICE.key:
                return this.getCurrencyChartData();
            case formTypes.SELIC_RATE.key:
                return this.getSelicChartData();
        }
    }

    getCurrentDate(){
        const today = new Date();
        const dd = today.getDate();
        const mm = today.getMonth() + 1;

        const MM = ((mm < 10) ? '0' : '') + mm;
        const DD = ((dd < 10) ? '0' : '') + dd;

        return MM + '-' + DD + '-' + today.getFullYear();
    }

    getCurrencyColor(currency){
        switch (currency) {
            case 'AUD':
                return 'rgba(1,86,92,0.8)';
            case 'CAD':
                return 'rgba(255,152,0,0.8)';
            case 'CHF':
                return 'rgba(240,98,146,0.8)';
            case 'EUR':
                return 'rgba(38,166,154,0.8)';
            case 'DKK':
                return 'rgba(239,56,33,0.8)';
            case 'GBP':
                return 'rgba(156,204,101,0.8)';
            case 'JPY':
                return 'rgba(126,87,194,0.8)';
            case 'NOK':
                return 'rgba(83,109,254,0.8)';
            case 'SEK':
                return 'rgba(255,202,54,0.8)';
            case 'USD':
                return 'rgba(75,154,218,0.8)';
            default:
                return 'rgba(241,206,99,0.8)';
        }
    }

    getInitialDate(daysAgo, monthsAgo, yearsAgo){
        var initialDate = new Date();
        const today = new Date();

        initialDate.setDate(today.getDate() - daysAgo);
        initialDate.setMonth(today.getMonth() - monthsAgo);
        initialDate.setFullYear(today.getFullYear() - yearsAgo);

        const dd = initialDate.getDate();
        const mm = initialDate.getMonth() + 1;

        const MM = ((mm < 10) ? '0' : '') + mm;
        const DD = ((dd < 10) ? '0' : '') + dd;

        return MM + '-' + DD + '-' + initialDate.getFullYear();
    }

    getCurrencyChartData({ cardData } = this.props){
        var initialDate = this.getInitialDate(0, 1, 0);
        var intervalText = 'Últimos 30 dias';

        switch(cardData.viewOption){
            case 3:
                initialDate = this.getInitialDate(0, 6, 0);
                intervalText = 'Últimos 6 meses';
                break;
            case 4:
                initialDate = this.getInitialDate(0, 0, 1);
                intervalText = 'Últimos 12 meses';
                break;
        }

        fetch(OLINDA_BASE_API + OLINDA_CURRENCY_SERVICE +
            `/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?` +
            `@moeda=\'${cardData.currency.simbolo}\'` + `&@dataInicial=\'${initialDate}\'` +
            `&@dataFinalCotacao=\'${this.getCurrentDate()}\'` +
            `&$filter=tipoBoletim%20eq%20\'Fechamento\'&$format=json&$select=cotacaoVenda,dataHoraCotacao`)
        .then(response => {
            response.json().then(data => {
                var values;
                if(data.value && data.value.length){
                    values = data.value.map(value => value.cotacaoVenda);
                }
                this.setState({...this.state, loading: false, values});
            });
        }).catch(error => {
            this.setState({...this.state, loading: false});
        });

        this.setState({
            ...this.state,
            intervalText,
            fillColor: this.getCurrencyColor(cardData.currency.simbolo),
            loading: true,
            labelFormatter: (value) => `R$ ${value}`,
            title: 'Cotação ' + cardData.currency.nomeFormatado
        });
    }

    getSelicChartData({ cardData } = this.props){
        var interval = 6;
        var intervalText = 'Acumulado em 6 meses';
        switch(cardData.viewOption){
            case 4:
                interval = 12;
                intervalText = 'Acumulado em 12 meses';
                break;
        }

        fetch(BCB_BASE_API + BCB_SELIC_ACCUM + `/ultimos/${interval}?formato=json`)
        .then(response => {
            response.json().then(data => {
                var values = [];
                if(data && data.length){
                    values = data.map(v => parseFloat(v.valor));
                }
                this.setState({...this.state, loading: false, values});
            });
        }).catch(error => {
            this.setState({...this.state, loading: false});
        });

        this.setState({
            ...this.state,
            intervalText,
            fillColor: 'rgba(160,125,255,0.8)',
            loading: true,
            labelFormatter: (value) => `${value}%`,
            title: 'Taxa Selic'
        });
    }

    renderChart(){
        const data = this.state.values;
        const contentInset = { top: 20, bottom: 10 }
        const ticks = 11;

        if(this.state.loading){
            return (
                <View style={{ height: 200, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size='large' />
                </View>
            );
        }
        else {
            return (
                <View>
                    <View style={{ height: 200, flexDirection: 'row' }}>
                        <YAxis
                            data={ data }
                            contentInset={ contentInset }
                            svg={{
                                fill: '#bcbcbc',
                                fontSize: 10,
                            }}
                            numberOfTicks={ ticks }
                            formatLabel={ this.state.labelFormatter }
                        />
                        <AreaChart
                            style={{ marginLeft: 10, flex: 1 }}
                            data={ data }
                            numberOfTicks={ ticks }
                            curve={ shape.curveNatural }
                            svg={{ fill: this.state.fillColor ? this.state.fillColor : 'rgba(60,135,255, 0.8)' }}
                            contentInset={ contentInset } >
                            <Grid/>
                        </AreaChart>
                    </View>
                    <Text style={[textStyle, {color: '#bcbcbc', alignSelf: 'center', marginTop: 5}]}>
                        {this.state.intervalText}
                    </Text>
                </View>
            );
        }
    }

    render() {
        return (
            <Card titleStyle={{color: '#161616'}} title={this.state.title} color={this.state.color} id={this.props.cardData.uid}>
                <View style={styles.containerStyle}>
                    {this.renderChart()}
                </View>
            </Card>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        padding: 10,
    }
};

export default ChartCard;
