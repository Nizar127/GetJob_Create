import React from 'react';
import {StyleSheet, Text, View, ScrollView, Image, Alert} from 'react-native';
import { Container, Card, Radio, CardItem, List, ListItem, Header, Left, Body, Thumbnail, Right, Button, Icon, Title, Segment, Content, Item} from 'native-base';


export default class PaymentMethod extends React.Component {



    render() {
     
      return (
  
  
        <ScrollView style={{flex:1}}>
        <Container>
      
       
        <Content>
      <List>
        <ListItem>
          <Left><Text>Credit Card</Text></Left>
          
          <Right>
          <Right>
                 <Radio selected={false} />      
              </Right>
        </Right>
        </ListItem>
        <ListItem>
          <Left><Text>Cash</Text></Left>
          
          <Right>
                 <Radio selected={false} />      
              </Right>
        </ListItem>
        <ListItem>
          <Left><Text>Cheque</Text></Left>
          
          <Right>
                 <Radio selected={false} />      
              </Right>
        </ListItem>
        <ListItem>
          <Left><Text>Online Transfer</Text></Left>
          
          <Right>
                 <Radio selected={true} />      
              </Right>
        </ListItem>
      
      </List>
      </Content>
      </Container>
      </ScrollView>
      );
    }
  }



