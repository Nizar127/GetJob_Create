import React from 'react';
import {StyleSheet, Text, List, View, Slider, ScrollView, Image, Alert} from 'react-native';
import { Container, Card, CardItem, Header, Left, Body, Thumbnail, Right, Button, Icon, Title, Segment, Content, Item} from 'native-base';


export default class Support extends React.Component {



    render() {
     
      return (
  
          <ScrollView style={{flex:1}}>
            <Card>
          <CardItem header bordered>
              <Text>Backend Development</Text>
          </CardItem>
            <CardItem bordered>
                <Left>
                    <Thumbnail source={require('../img/kambing.jpg')}/>
                <Body>
                    <Text>Hassan</Text>
                    <Text note>Firebase</Text>
                    <Text note>Build Realtime Database System</Text>
                </Body>
                </Left>       
                <Right>
                    <Button success>
                        <Text>Hire</Text>
                    </Button>
                </Right>
             </CardItem>
           </Card>
        </ScrollView>
      );
    }
  }