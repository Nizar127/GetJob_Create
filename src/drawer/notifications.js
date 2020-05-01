import React from 'react';
import {StyleSheet, Text, List, View, Slider, ScrollView, Image, Alert} from 'react-native';
import { Container, Separator, Card, CardItem, Header, Left, Body, Thumbnail, Right, Button, Icon, Title, Segment, Content, Item} from 'native-base';


export default class Notification extends React.Component {



    render() {
     return(
       <View>
           <Header>
                <View style={{marginTop:25, marginEnd: 350}}>
                     <Icon style={{color:'white'}} name="md-menu" onPress={()=>this.props.navigation.openDrawer()}/>
                 </View>
     
            </Header>
            <Separator>
             <Text style={{alignItems:'center', justifyContent: 'center', fontSize: 20}}>List Of Hires</Text>
          </Separator>
       </View>  
     );
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