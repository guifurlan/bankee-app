import React from  'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';

import Card from './Card';
import * as formTypes from './types';
import { textStyle } from '../../style';

import { OLINDA_BASE_API, OLINDA_INTEREST_RATE_SERVICE } from '../../properties';

const IMAGES = {
    1: require('../../images/bb_icon.png'),
    2: require('../../images/bradesco_icon.png'),
    3: require('../../images/caixa_icon.png'),
    4: require('../../images/itau_icon.png'),
    5: require('../../images/santander_icon.png')
}

class TaxComparisonCard extends React.Component {
    state = {
        loading: false,
        bank1Value: '',
        bank2Value: '',
        bank1Tax: '',
        bank2Tax: '',
        modality: '',
        color: '#ffffff'
    }

    componentWillMount({ cardData } = this.props){
        return this.getTaxComparisonData();
    }

    getModality(taxOption){
        switch(taxOption) {
            case 1:
                return 'CARTÃO DE CRÉDITO - PARCELADO - PRÉ-FIXADO';
            case 2:
                return 'CARTÃO DE CRÉDITO - ROTATIVO TOTAL - PRÉ-FIXADO';
            case 3:
                return 'CHEQUE ESPECIAL - PRÉ-FIXADO';
            case 4:
                return 'CRÉDITO PESSOAL CONSIGNADO PRIVADO - PRÉ-FIXADO';
            case 5:
                return 'CRÉDITO PESSOAL CONSIGNADO PÚBLICO - PRÉ-FIXADO';
            case 6:
                return 'CRÉDITO PESSOAL CONSIGNADO INSS - PRÉ-FIXADO';
            case 7:
                return 'CRÉDITO PESSOAL NÃO-CONSIGNADO - PRÉ-FIXADO';
            case 8:
                return 'AQUISIÇÃO DE VEÍCULOS - PRÉ-FIXADO';
        }
    }

    getTitleName(taxOption){
        switch(taxOption) {
            case 1:
                return 'Cartão de Crédito (Parcelado)';
            case 2:
                return 'Cartão de Crédito (Rotativo)';
            case 3:
                return 'Cheque Especial';
            case 4:
                return 'Crédito Consignado Privado';
            case 5:
                return 'Crédito Consignado Público';
            case 6:
                return 'Crédito Consignado INSS';
            case 7:
                return 'Crédito Pessoal';
            case 8:
                return 'Financiamento de Veículos';
        }
    }

    getBankCnpj8(bankOption){
        switch(bankOption) {
            case 1:
                return '00000000';
            case 2:
                return '60746948';
            case 3:
                return '00360305';
            case 4:
                return '60701190';
            case 5:
                return '90400888';
        }
    }

    getTaxComparisonData({ cardData } = this.props){
        var modality = this.getModality(cardData.taxOption);
        var bank1Cnpj8 = this.getBankCnpj8(cardData.bank1Value);
        var bank2Cnpj8 = this.getBankCnpj8(cardData.bank2Value);

        fetch(OLINDA_BASE_API + OLINDA_INTEREST_RATE_SERVICE +
            `/TaxasJurosDiariaPorInicioPeriodo?$top=2&$filter=Segmento%20eq%20'PESSOA%20F%C3%8DSICA'%20and%20` +
            `Modalidade%20eq%20\'${modality}\'%20and%20(cnpj8%20eq%20\'${bank1Cnpj8}\'%20or%20cnpj8%20eq%20\'${bank2Cnpj8}\')` +
            `&$orderby=FimPeriodo%20desc&$format=json&$select=TaxaJurosAoMes,cnpj8`)
        .then(response => {
            response.json().then(data => {
                var tax1;
                var tax2;
                if(data.value && data.value.length){
                    tax1 = data.value.filter(value => value.cnpj8 == bank1Cnpj8).map(value => value.TaxaJurosAoMes);
                    tax2 = data.value.filter(value => value.cnpj8 == bank2Cnpj8).map(value => value.TaxaJurosAoMes);
                }
                this.setState({...this.state, loading: false, bank1Tax: tax1, bank2Tax: tax2});
            });
        }).catch(error => {
            this.setState({...this.state, loading: false});
        });

        this.setState({
            ...this.state,
            loading: true,
            bank1Value: cardData.bank1Value,
            bank2Value: cardData.bank2Value,
            modality: modality,
            title: 'Juros Mensais ' + this.getTitleName(cardData.taxOption)
        });
    }

    renderChart(){
        if(this.state.loading){
            return (
                <View style={{ height: 100, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size='large' />
                </View>
            );
        }
        else {
            return (
                <View style={{ marginTop: 10, height: 100, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Image
                            style={{ flex: 1, height: undefined, width: undefined}}
                            source={IMAGES[this.state.bank1Value]}
                            resizeMode="contain"
                        />
                        <Text style={[textStyle, {fontSize: 20, color: '#bcbcbc', alignSelf: 'center', marginTop: 5}]}>
                            { this.state.bank1Tax }%
                        </Text>
                    </View>
                    <View style={{  flex: 1, flexDirection: 'column', justifyContent: 'space-around' }}>
                        <Text style={[textStyle, {fontWeight: 'bold', fontSize: 50, color: '#bcbcbc', alignSelf: 'center'}]}>
                            X
                        </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Image
                            style={{ flex: 1, height: undefined, width: undefined}}
                            source={IMAGES[this.state.bank2Value]}
                            resizeMode="contain"
                        />
                        <Text style={[textStyle, {fontSize: 20, color: '#bcbcbc', alignSelf: 'center', marginTop: 5}]}>
                            { this.state.bank2Tax }%
                        </Text>
                    </View>
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

export default TaxComparisonCard;
