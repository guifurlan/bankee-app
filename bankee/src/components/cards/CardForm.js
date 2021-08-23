import React from  'react';
import { View, Text, Picker, ActivityIndicator } from 'react-native';
import { Button } from '../common';
import { textStyle } from '../../style';
import * as formTypes from './types';
import firebase from 'firebase';
import CurrencyForm from './CurrencyForm';
import SelicForm from './SelicForm';
import TaxForm from './TaxForm';

class CardForm extends React.Component {
    state = { cardData: {}, formLoading: false, formError: false, saveError: false }

    onFormTypeChange(itemValue){
        if(itemValue){
            this.setState({...this.state, cardData: { formType: itemValue }, formError: false});
        }
    }

    setCardData(cardData){
        this.setState({...this.state, cardData})
    }

    setFormLoading(isLoading){
        this.setState({...this.state, formLoading: isLoading})
    }

    onFormError(){
        this.setState({...this.state, formError: true})
    }

    loadForm(){
        if(this.state.formLoading){
            return (
                <View style={{paddingTop: 10, width:'100%'}}>
                    <ActivityIndicator />
                </View>
            );
        }
        else if (this.state.formError) {
            return (
                <View style={{paddingTop: 10, width:'100%'}}>
                    <Text style={[textStyle, {color: 'red', alignSelf: 'center'}]}>
                        Erro na rede, tente novamente
                    </Text>
                </View>
            );
        }
        else if (this.state.cardData.formType){
            switch(this.state.cardData.formType.key){
                case formTypes.CURRENCY_PRICE.key:
                    return <CurrencyForm
                                onLoadingChange={this.setFormLoading.bind(this)}
                                onCardDataChange={this.setCardData.bind(this)}
                                onError={this.onFormError.bind(this)}
                                cardData={this.state.cardData}
                            />
                case formTypes.SELIC_RATE.key:
                    return <SelicForm
                                onCardDataChange={this.setCardData.bind(this)}
                                cardData={this.state.cardData}
                            />
                case formTypes.TAX_COMPARISON.key:
                    return <TaxForm
                                onCardDataChange={this.setCardData.bind(this)}
                                cardData={this.state.cardData}
                            />
            }
        }
    }

    loadFormSave(){
        if(!this.state.formError && !this.state.formLoading && this.state.cardData.formType) {
            return (
                <View>
                    {this.state.saveError ?
                        <View style={{paddingTop: 10, width:'100%'}}>
                            <Text style={[textStyle, {color: 'red', alignSelf: 'center'}]}>
                                Erro na rede, tente novamente
                            </Text>
                        </View> : <View></View>
                    }
                    <View style={{paddingTop: 20, flexDirection: 'row-reverse'}}>
                        <Button style={{width: 150, height: 40}} loading={this.state.saveLoading} label="SALVAR" onButtonPress={this.saveCard.bind(this)} />
                    </View>
                </View>
            );
        }
    }

    saveCard(){
        this.setState({...this.state, saveLoading: true});

        const { currentUser } = firebase.auth();
        const { cardData } = this.state;

        // TODO: Use redux to save cards
        firebase.database().ref(`/users/${currentUser.uid}/cards`)
            .push(cardData, () => {
                this.setState({...this.state, saveLoading: false});
                this.props.onSave();
            }).catch(error => {
                this.setState({...this.state, saveLoading: false, saveError: true});
            });
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <Text style={styles.textStyle}>O que você gostaria de ver no dashboard?</Text>
                <View style={styles.pickerStyle}>
                    <Picker
                        selectedValue={this.state.cardData.formType}
                        style={{ height: 30, width: '100%' }}
                        onValueChange={this.onFormTypeChange.bind(this)}>
                        <Picker.Item value='' label='Selecione uma opção' />
                        {formTypes.options.map(type => {
                            return <Picker.Item label={type.value} value={type} key={type.key} />
                        })}

                    </Picker>
                </View>
                <View>
                    {this.loadForm()}
                    {this.loadFormSave()}
                </View>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        height: 'auto'
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

export default CardForm;
