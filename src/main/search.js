import React, {Component} from 'react';

import { 
  Container,
  Header, 
  Item, 
  View, 
  Input, 
  Card, 
  Badge, 
  CardItem, 
  Thumbnail,
  Text, 
  Left, 
  Body, 
  Icon, 
  List,
  Content,
  Button, 
  Right,
  ListItem,
  Separator} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';



export default class Search extends Component {
  
    static navigationOptions = {
      title: 'Search',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-search" style={{ color: tintColor }} />
        ),
        headerTitle:{
           title: 'GET-THE-JOB'
        },
      headerStyle: {
      backgroundColor: '#f45fff',
    },
      headerTintColor: '#fff',
      headerTitleStyle: {
          fontWeight: 'bold',
      },
    }
  
    render() {
      return (
       <Container>
      
         <Header searchBar rounded>
            <Item>
              <Icon name="ios-search" />
              <Input placeholder="Search" />
              <Icon name="ios-people" />
            </Item>
           <Button transparent>
             <Text>Search</Text>
           </Button>

          </Header>
        
       

        <Card style={{height: 30, width: 200}}>
            <CardItem>
                <Text>Photographer</Text>
                <Right>
                <Badge style={{backgroundColor: 'black'}}>
                  <Text style={{color: 'white'}}>X</Text>
                  </Badge>
              </Right>
            </CardItem>
        </Card> 
        
        <View style={{marginBottom: 30, marginTop: 50, alignItems: 'center', justifyContent: 'center'}}>
          <Separator>
            <Text style={{alignItems:'center', justifyContent: 'center', fontSize: 20}}>List of photographer</Text>
          </Separator>
          
        </View>

      <ScrollView>
        <Container>
          
            <List>
               <ListItem thumbnail>
                  <Left>
                    <Thumbnail source={require('../img/dude.jpg')} style={{padding: 10}}/>
                  </Left>
                  <Body>
                    <Text>Mitchell</Text>
                    <Text note>Senior Experience</Text>
                    <Text note numberOfLines={1}>Personal</Text>
                  </Body>
                  <Right>
                    <Button style={{padding: 5}} primary rounded onPress={() => this.props.navigation.navigate('UserProfile')}>
                      <Text>Details</Text>
                    </Button>
                  </Right>
               </ListItem>
            </List>
            <List>
               <ListItem thumbnail>
                  <Left>
                    <Thumbnail source={require('../img/dude.jpg')} style={{padding: 10}}/>
                  </Left>
                  <Body>
                    <Text>Mitchell</Text>
                    <Text note>Senior Experience</Text>
                    <Text note numberOfLines={1}>Personal</Text>
                  </Body>
                  <Right>
                  <Button style={{padding: 5}} primary rounded onPress={() => this.props.navigation.navigate('UserProfile')}>
                      <Text>Details</Text>
                    </Button>
                  </Right>
               </ListItem>
            </List>
            <List>
               <ListItem thumbnail>
                  <Left>
                    <Thumbnail source={require('../img/dude.jpg')} style={{padding: 10}}/>
                  </Left>
                  <Body>
                    <Text>Mitchell</Text>
                    <Text note>Senior Experience</Text>
                    <Text note numberOfLines={1}>Personal</Text>
                  </Body>
                  <Right>
                  <Button style={{padding: 5}} primary rounded onPress={() => this.props.navigation.navigate('UserProfile')}>
                      <Text>Details</Text>
                    </Button>
                  </Right>
               </ListItem>
            </List>
            <List>
               <ListItem thumbnail>
                  <Left>
                    <Thumbnail source={require('../img/dude.jpg')} style={{padding: 10}}/>
                  </Left>
                  <Body>
                    <Text>Mitchell</Text>
                    <Text note>Senior Experience</Text>
                    <Text note numberOfLines={1}>Personal</Text>
                  </Body>
                  <Right>
                  <Button style={{padding: 5}} primary rounded onPress={() => this.props.navigation.navigate('UserProfile')}>
                      <Text>Details</Text>
                    </Button>
                  </Right>
               </ListItem>
            </List>
            <List>
               <ListItem thumbnail>
                  <Left>
                    <Thumbnail source={require('../img/dude.jpg')} style={{padding: 10}}/>
                  </Left>
                  <Body>
                    <Text>Mitchell</Text>
                    <Text note>Senior Experience</Text>
                    <Text note numberOfLines={1}>Personal</Text>
                  </Body>
                  <Right>
                  <Button style={{padding: 5}} primary rounded onPress={() => this.props.navigation.navigate('UserProfile')}>
                      <Text>Details</Text>
                    </Button>
                  </Right>
               </ListItem>
            </List>
            <List>
               <ListItem thumbnail>
                  <Left>
                    <Thumbnail source={require('../img/dude.jpg')} style={{padding: 10}}/>
                  </Left>
                  <Body>
                    <Text>Mitchell</Text>
                    <Text note>Senior Experience</Text>
                    <Text note numberOfLines={1}>Personal</Text>
                  </Body>
                  <Right>
                  <Button style={{padding: 5}} primary rounded onPress={() => this.props.navigation.navigate('UserProfile')}>
                      <Text>Details</Text>
                    </Button>
                  </Right>
               </ListItem>
            </List>
            <List>
               <ListItem thumbnail>
                  <Left>
                    <Thumbnail source={require('../img/dude.jpg')} style={{padding: 10}}/>
                  </Left>
                  <Body>
                    <Text>Mitchell</Text>
                    <Text note>Senior Experience</Text>
                    <Text note numberOfLines={1}>Personal</Text>
                  </Body>
                  <Right>
                  <Button style={{padding: 5}} primary rounded onPress={() => this.props.navigation.navigate('UserProfile')}>
                      <Text>Details</Text>
                    </Button>
                  </Right>
               </ListItem>
            </List>
            <List>
               <ListItem thumbnail>
                  <Left>
                    <Thumbnail source={require('../img/dude.jpg')} style={{padding: 10}}/>
                  </Left>
                  <Body>
                    <Text>Mitchell</Text>
                    <Text note>Senior Experience</Text>
                    <Text note numberOfLines={1}>Personal</Text>
                  </Body>
                  <Right>
                  <Button style={{padding: 5}} primary rounded onPress={() => this.props.navigation.navigate('UserProfile')}>
                      <Text>Details</Text>
                    </Button>
                  </Right>
               </ListItem>
            </List>
            <List>
               <ListItem thumbnail>
                  <Left>
                    <Thumbnail source={require('../img/dude.jpg')} style={{padding: 10}}/>
                  </Left>
                  <Body>
                    <Text>Mitchell</Text>
                    <Text note>Senior Experience</Text>
                    <Text note numberOfLines={1}>Personal</Text>
                  </Body>
                  <Right>
                  <Button style={{padding: 5}} primary rounded onPress={() => this.props.navigation.navigate('UserProfile')}>
                      <Text>Details</Text>
                    </Button>
                  </Right>
               </ListItem>
            </List>
         
          </Container>
          </ScrollView>
          </Container>
        //  {/* <Button success rounded><Text>Dude</Text></Button> */}
        
      

      

      );
    }
  }
  