import React from  'react';
import { View, Text } from 'react-native';

import Bot from 'react-native-chatbot';

const steps = [
  {
    id: '1',
    message: 'Olá! Sou o Bankee! Posso fornecer algumas informações sobre serviços financeiros em geral! Para isso, basta selecionar um dos tópicos abaixo:',
    trigger: '3',
  },
  {
    id: '3',
    message: 'Tópicos nos quais posso te ajudar: ',
    trigger: '4',
  },
  {
    id: '4',
    options: [
      { value: 1, label: ' Taxa de juros (Selic) hoje ', trigger: '5' },
      { value: 2, label: '         Cotação dólar         ', trigger: '6' },
      { value: 3, label: '         Tarifa bancária          ', trigger: '7' },
      { value: 4, label: '     Taxa de juros geral     ', trigger: '8' },
      { value: 5, label: '         Tchau, até logo        ', trigger: '9' },
    ],
  },
  {
    id: '5',
    message: 'A Selic é a taxa básica de juros da economia no Brasil, sendo obtida pelo cálculo da taxa média ponderada dos juros praticados pelas instituições financeiras. Acompanhar a evolução desta taxa pode fazer grande diferença em seus investimentos. Mais do que optar pela melhor rentabilidade, é importante entender quais investimentos podem te fazer ganhar naquele exato cenário. Você pode consultar a taxa SELIC na seção Dashboard desse aplicativo!',
    trigger: '3',
  },
  {
    id: '6',
    message: 'O dólar é a moeda oficial dos Estados Unidos, a maior economia mundial. Por isso, quase a totalidade das transações internacionais realizadas no mundo são feitas em dólar. Pelo módulo de dashboard, você pode consultar a cotação do dólar e também de outras moedas.',
    trigger: '3',
  },
  {
    id: '7',
    message: 'São tarifas cobradas pelos serviços do banco para você poder usar a sua conta. É muito importante o acompanhamento destas para verificar se nada está sendo cobrado a mais e também na hora de decidir qual a melhor instituição de acordo com o seu perfil.',
    trigger: '3',
  },
  {
    id: '8',
    message: 'A taxa de juros é um índice utilizado em economia e finanças para registrar a rentabilidade de uma poupança ou o custo de um crédito. A taxa de juros é aplicada em todos os tipos de operações financeiras e são uns dos valores mais considerados na hora de realizar transações econômicas a curto, médio e longo prazo.',
    trigger: '3',
  },
  {
    id: '9',
    message: 'Até mais! Caso precisar de mais alguma informação estarei aqui para te ajudar! :)',
    trigger:'10',
  },
  {
    id: '10',
    options: [
      { value: 1, label: ' Clique aqui para conversar comigo! ', trigger: '1' },
    ]
  }
];


class ChatBot extends React.Component {
  
  render() {
    return (
      <Bot 
        steps={steps} 
        // Avatar do Bot e do usuário //
        botAvatar='https://uploaddeimagens.com.br/images/001/675/477/original/ic_logo_splash_2x.png'
        //userAvatar='https://i.imgur.com/6sm2DYv.png'
        hideUserAvatar={true}

        // Cores dos diálogos //
        botFontColor={ '#FFFDF8' } 
        userFontColor={ '#FFFDF8' }
        botBubbleColor={ '#F2AE17' } 
        userBubbleColor={ '#02ADB5' }

        // Cores do fundo do chat //
        style={{ backgroundColor: '#F9F9F9', marginTop: 2 }}
        contentStyle={{ backgroundColor: '#F9F9F9' }}

        // Estilo do Rodapé (Footer) //
        footerStyle={{ backgroundColor: '#fff', margin: 5, padding: 1, borderRadius: 7, elevation: 2, }}
        submitButtonStyle={{ backgroundColor: '#02ADB5', borderRadius: 4, width: 63, margin: 2 }}
      />
    );
  }
}

export default ChatBot;