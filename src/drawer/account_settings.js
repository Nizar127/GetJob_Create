import React from 'react';
import {StyleSheet, Text, View, ScrollView, Image, Alert} from 'react-native';
import { Container, Separator,Card, CardItem, List, ListItem, Header, Left, Body, Thumbnail, Right, Button, Icon, Title, Segment, Content, Item, Switch} from 'native-base';


export default class Account extends React.Component {



    render() {
     
      return (
      <Container>
         <Header>
        <View style={{marginTop:25, marginEnd: 350}}>
            <Icon style={{color:'white'}} name="md-menu" onPress={()=>this.props.navigation.openDrawer()}/>
        </View>
        </Header>
        <View style={{ height: 150, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', marginBottom: 2}}>
          <Image source={require('../img/koe.jpeg')} style={{height: 120, width: 120, borderRadius: 60}}/>
      </View>
       
          <ScrollView style={{flex:1}}>
            
            <Container>
           
           
            <Content>
            <Separator>
              <Text style={{fontSize: 20, justifyContent: 'center'}}>Account Settings</Text>           
          </Separator>
          <List>
            <ListItem>
            <Left><Text>Company</Text></Left>
              <Right>
              <Icon active name="arrow-forward"/>
            </Right>
            </ListItem>
            <ListItem>
            <Left><Text>Job</Text></Left>
              <Right>
              <Icon active name="arrow-forward" onPress={() => this.props.navigation.navigate('JobSettings')}/>
            </Right>
            </ListItem>
            <ListItem>
              <Left><Text>Number of Hires</Text></Left>
              <Right>
                 <Icon active name="arrow-forward"/>
               </Right>
            </ListItem>
            <ListItem>
              <Left><Text>Payment Method</Text></Left>
              <Right>
              <Icon active name="arrow-forward" onPress={() => this.props.navigation.navigate('PaymentMethod')}/>
            </Right>
            </ListItem>
            <ListItem>
               <Left>
                 <Body>
                  <Text>Print Receipt</Text>
                  <Text note>Toggle to Switch Auto or Manual</Text>
                </Body>
               </Left>
                
              
              <Right>
                <Switch selected={true}/>
              </Right>
            </ListItem>
            <ListItem>
               <Left><Text>Rewards</Text></Left>
               <Right>
                 <Icon active name="arrow-forward"/>
               </Right>
            </ListItem>
          </List>
        </Content>
        </Container>
        </ScrollView>
        </Container>
      );
    }
  }