import React from 'react';
import {StyleSheet, Text, List, View, Slider, ScrollView, Image, Alert} from 'react-native';
import { Container, Card, CardItem, Header, Left, Body, Thumbnail, Right, Button, Icon, Title, Segment, Content, Item} from 'native-base';


export default class PaymentDetails extends React.Component {



    render() {
     
      return (
  
          <ScrollView style={{flex:1}}>
            <Card>
          <CardItem header bordered>
              <Text>Backend Development</Text>
          </CardItem>
            <CardItem bordered>
                <Left>
                    <Thumbnail source={require('../../img/kambing.jpg')}/>
                <Body>
                    <Text>Hassan</Text>
                    <Text note>Firebase</Text>
                    <Text note>Build Realtime Database System</Text>
                </Body>
                </Left> 
                 <CardItem style={{paddingTop: 5, paddingBottom: 2, paddingEnd: 4}}>
                    <Text style={{fontWeight:'bold'}}>$500</Text>
                 </CardItem>
           
                <Right>
                
                    <Button success transparent>
                        <Text style={{fontWeight: 'bold'}}>PAID</Text>
                    </Button>
                </Right>
             </CardItem>
           </Card>

           <Card>
          <CardItem header bordered>
              <Text>Backend Development</Text>
          </CardItem>
            <CardItem bordered>
                <Left>
                    <Thumbnail source={require('../../img/kambing.jpg')}/>
                <Body>
                    <Text>Hassan</Text>
                    <Text note>Firebase</Text>
                    <Text note>Build Realtime Database System</Text>
                </Body>
                </Left> 
                 <CardItem style={{paddingTop: 5, paddingBottom: 2, paddingEnd: 4}}>
                    <Text style={{fontWeight:'bold'}}>PAID</Text>
                 </CardItem>
           
                <Right>
                
                    <Button danger transparent>
                        <Text style={{fontWeight: 'bold'}}>UNPAID</Text>
                    </Button>
                    <Button rounded onPress={() => this.props.navigation.navigate('PaidNow')}> 
                        <Text style={{fontWeight: 'bold'}}>PAID NOW</Text>
                    </Button>
                </Right>
             </CardItem>
           </Card>

           <Card>
          <CardItem header bordered>
              <Text>Backend Development</Text>
          </CardItem>
            <CardItem bordered>
                <Left>
                    <Thumbnail source={require('../../img/kambing.jpg')}/>
                <Body>
                    <Text>Hassan</Text>
                    <Text note>Firebase</Text>
                    <Text note>Build Realtime Database System</Text>
                </Body>
                </Left> 
                 <CardItem style={{paddingTop: 5, paddingBottom: 2, paddingEnd: 4}}>
                    <Text style={{fontWeight:'bold'}}>$500</Text>
                 </CardItem>
           
                <Right>
                
                    <Button danger transparent>
                        <Text style={{fontWeight: 'bold'}}>UNPAID</Text>
                    </Button>
                    <Button rounded onPress={() => this.props.navigation.navigate('paidNow')}> 
                        <Text style={{fontWeight: 'bold', color:'white'}}>PAID NOW</Text>
                    </Button>
                </Right>
             </CardItem>
           </Card>

           <Card>
          <CardItem header bordered>
              <Text>Backend Development</Text>
          </CardItem>
            <CardItem bordered>
                <Left>
                    <Thumbnail source={require('../../img/kambing.jpg')}/>
                <Body>
                    <Text>Hassan</Text>
                    <Text note>Firebase</Text>
                    <Text note>Build Realtime Database System</Text>
                </Body>
                </Left> 
                 <CardItem style={{paddingTop: 5, paddingBottom: 2, paddingEnd: 4}}>
                    <Text style={{fontWeight:'bold'}}>$500</Text>
                 </CardItem>
           
                <Right>
                
                    <Button success transparent>
                        <Text style={{fontWeight: 'bold'}}>PAID</Text>
                    </Button>
                </Right>
             </CardItem>
           </Card>
        </ScrollView>
      );
    }
  }