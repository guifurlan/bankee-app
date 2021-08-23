import React from  'react';
import { ListView, View, Text, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { RoundButton, Dialog } from './common';
import { iconStyle } from '../style';
import CardForm from './cards/CardForm';
import SingleValueCard from './cards/SingleValueCard';
import ChartCard from './cards/ChartCard';
import TaxComparisonCard from './cards/TaxComparisonCard';
import Card from './cards/Card';
import { textStyle } from '../style';

import _ from 'lodash';

import { fetchCards } from '../actions';
import * as formTypes from './cards/types';

class Dashboard extends React.Component {
    state = {modalVisible: false};

    componentWillMount(){
        setTimeout(() => SplashScreen.hide(), 1000);
        this.props.fetchCards();
        this.createDataSource(this.props);
    }

    /**
     *  TODO: List View configuration had to be
     *  removed because remove item was not updating correctly the list
     *  but it is the most performatic for long lists so this should be revisited
     */
    componentWillReceiveProps(nextProps){
        this.createDataSource(nextProps);
    }

    createDataSource({ cards }){
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(cards);
    }

    onEnter(){
        setTimeout(() => SplashScreen.hide(), 1000);
    }

    onSaveCard(){
        this.setState({modalVisible: false});
    }

    renderCard(card){
        switch(card.formType.key){
            case formTypes.CURRENCY_PRICE.key:
                if(card.viewOption === 1)
                    return <SingleValueCard key={card.uid} cardData={card} />
                else
                    return <ChartCard key={card.uid} cardData={card} />
            case formTypes.SELIC_RATE.key:
                if(card.viewOption === 1 || card.viewOption === 2)
                    return <SingleValueCard key={card.uid} cardData={card} />
                else
                    return <ChartCard key={card.uid} cardData={card} />
            case formTypes.TAX_COMPARISON.key:
                return <TaxComparisonCard key={card.uid} cardData={card} />
        }

        return <View></View>
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollView style={{flex: 1}}>
                    <View style={styles.containerStyle}>
                        {this.props.cards.map(card => {
                            return this.renderCard(card);
                        })}
                    </View>
                </ScrollView>
                <View style={styles.buttonStyle}>
                    <RoundButton onButtonPress={() => {this.setState({modalVisible: true})}} >
                        <Text style={[iconStyle, {fontSize: 20}]}> &#xf067; </Text>
                    </RoundButton>
                </View>
                <Dialog title="Adicionar um novo card" visible={this.state.modalVisible} onDismiss={() => {this.setState({modalVisible: false})}} >
                    <CardForm onSave={this.onSaveCard.bind(this)} />
                </Dialog>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        padding: 10,
        paddingBottom: 80
    },
    buttonStyle: {
        position: 'absolute',
        bottom: 0,
        right: 0
    }
};

const mapStateToProps = ({ dashboard }) => {
    const { fetchingCards } = dashboard;
    const cards = _.map(dashboard.cards, (val, uid) => {
        return { ...val, uid };
    });

    return {
        cards,
        fetchingCards
    }
}

export default connect(mapStateToProps, { fetchCards })(Dashboard);
