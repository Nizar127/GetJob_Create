import React, {Component} from 'react';
import {View, Text, Stylesheet} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content} from 'native-base';
//import Main from '../Component/Main';
//import Chat from '../Component/Chat';
import MainChat from '../components/MainChat';
import Chat from '../components/Chat';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

const navigate = createStackNavigator({
    MainChat: {screen: MainChat},
    Chat: {screen: Chat},
})

export default class Inbox extends Component {
    render() {
      return (
         <AppContainer />
      );
    }
  }
// class Chat extends Component{
//     render(){
//         return(
//             <Container>
//             <Header/>
//             <Left>
//                 <Text>Hi hello</Text>
//             </Left>
//         </Container>
//         );
//     }
// }
const AppContainer = createAppContainer(navigate);

