import React from 'react';
import {StyleSheet, Text, View, ScrollView, Image, Alert} from 'react-native';
import { Container, Switch, Card, CardItem, List, ListItem, Header, Left, Body, Separator, Thumbnail, Right, Button, Icon, Title, Segment, Content, Item} from 'native-base';


export default class JobSettings extends React.Component {



    render() {
     
      return (

     <Container>
        <Header>
       <View style={{marginTop:25, marginEnd: 350}}>
           <Icon style={{color:'white'}} name="md-menu" onPress={()=>this.props.navigation.openDrawer()}/>
       </View>
       </Header>

  
          <ScrollView style={{flex:1}}>
            <Container>

           
            <Content>

            <Separator>
              <Text style={{fontSize: 20, justifyContent: 'center'}}>Job Settings</Text>           
          </Separator>
            <List>
            <ListItem>
            <Left><Text>Job</Text></Left>
              <Right>
              <Icon active name="md-arrow-forward"/>
            </Right>
            </ListItem>
            <ListItem>
               <Left>
                 <Body>
                  <Text>Job Status</Text>
                  <Text note>Toggle to Switch Open or Close Vacancy</Text>
                </Body>
               </Left> 
              <Right>
                <Switch selected={true}/>
              </Right>
            </ListItem>
            <ListItem>
              <Left><Text>List of Project</Text></Left>
              <Right>
                 <Icon active name="md-arrow-forward"/>
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