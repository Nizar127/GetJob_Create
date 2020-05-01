import React, {Component} from 'react';
import {StyleSheet, ScrollView, Image} from 'react-native';
import { 
    Container, 
    Header, 
    Content, 
    View, 
    Card,  
    Right, 
    auto, 
    CardItem,
    Thumbnail, 
    Text, 
    Left, 
    Body, 
    Icon, 
    List,
    ListItem,
    Separator,
    Button } from 'native-base';



export default class HireDetails extends Component {
  
  
    render() {
      return (
          <Container style={{flex:1,marginTop: 20}}>
        <ScrollView>
            <Card>
                <CardItem style={{alignItems: 'stretch', height: 350}}>
                     <Image source={require('../../img/kambing.jpg')} style={{height: 200, width: null, flex: 1}}/>
                </CardItem> 
                 <CardItem>   
                     <Text style={{marginTop: 5, marginBottom: 5}}>Creative World Industries</Text>
                </CardItem>
                
            </Card>
            <Card style={{paddingBottom: 5, paddingTop: 2}}>
                <CardItem header bordered>
                    <Left>
                        <Text>Hassan</Text>
                    </Left>
                    <Right>
                    <Icon name="share"  />
                    </Right>
                </CardItem>
            </Card>
        
            <Card style={{height: 200}}>
                <CardItem header bordered>
                    <Text>About Us</Text>
                </CardItem>
                <CardItem cardBody>
                    <Body>
                        <Text>We are system integrator contract companies specialize in the government's and business IT support</Text>
                    </Body>
                </CardItem>
            </Card>
            <Card style={{height: auto, marginTop: 10, marginBottom: 10}}> 
                <CardItem header bordered>
                    <Text>Achievement</Text>
                </CardItem>
                <CardItem cardBody>
                    <Content>
                        <Separator>
                            <Text>Government</Text>
                        </Separator>
                        <ListItem>
                            <Text>JKR</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Jabtan Hasil</Text>
                        </ListItem>
                        <ListItem>
                            <Text>SPAD</Text>
                        </ListItem>
                        <ListItem>
                            <Text>HASIL</Text>
                        </ListItem>
                        <Separator bordered>
                            <Text>SME</Text>
                        </Separator>
                        <ListItem>
                            <Text>Kinematics Business Management Firm</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Derren Consulting Firm</Text>
                        </ListItem>
                        <ListItem>
                            <Text>GoRide</Text>
                        </ListItem>
                    </Content>
                </CardItem>
            </Card>
            <Card style={{height: 250}}>
                <CardItem header bordered>
                    <Text>Key Player</Text>
                </CardItem>
                <CardItem cardBody style={{flex:1, flexDirection: 'row', padding: 10, margin: 5, alignContent: 'space-around', justifyContent: 'space-between', alignItems:'center', marginLeft: 5}}>
                    <ScrollView horizontal={true}>
                              <Thumbnail large source={require('../../img/dude.jpg')} style={{padding: 10}}/>
                              <Thumbnail large source={require('../../img/dude.jpg')} style={{padding: 10}}/>
                              <Thumbnail large source={require('../../img/dude.jpg')} style={{padding: 10}}/>
                              <Thumbnail large source={require('../../img/dude.jpg')} style={{padding: 10}}/>
                    </ScrollView>
                              
                             

      
                    </CardItem>
            </Card>
          

            </ScrollView>  
            
            <Button style={{alignItems: 'center', justifyContent: 'center', margin: 20, padding: 8}} success onPress={() => this.props.navigation.navigate('HireProgress')}>
                <Text>Hire Now!</Text>
            </Button>


            
         </Container>
           
// {/* 
//             <Container style={{marginBottom: 10}}> 
        
//         <Content >
             
//              <Thumbnail style={{height: 300, width: auto}} source={require('../img/dude.jpg')}/>
//        <Card style={{marginTop: 10, marginBottom: 5}}> 
//           <CardItem header bordered>
//               <Text>System Development</Text>
//           </CardItem>
//             <CardItem bordered>
//                 <Left>
//                     <Thumbnail source={require('../img/kambing.jpg')}/>
//                 <Body>
//                     <Text>Hassan</Text>
//                     <Text note>PHP</Text>
//                     <Text note>Building Likes System</Text>
//                 </Body>
//                 </Left>       
//                 <Right>
//                     <Button success>
//                         <Text>Hire</Text>
//                     </Button>
//                 </Right>
//            </CardItem>
           
//             <CardItem bordered>
//                 <Left>
//                 <Body>
//                     <Text>Faris</Text>
//                     <Text note>PHP</Text>
//                     <Text note>Building Comment System</Text>
//                 </Body>
//                 </Left>       
//                 <Right>
//                     <Button success>
//                         <Text>Hire</Text>
//                     </Button>
//                 </Right>
//            </CardItem>
//           </Card>

//           <Card>
//           <CardItem header bordered>
//               <Text>Backend Development</Text>
//           </CardItem>
//             <CardItem bordered>
//                 <Left>
//                     <Thumbnail source={require('../img/kambing.jpg')}/>
//                 <Body>
//                     <Text>Hassan</Text>
//                     <Text note>Firebase</Text>
//                     <Text note>Build Realtime Database System</Text>
//                 </Body>
//                 </Left>       
//                 <Right>
//                     <Button success>
//                         <Text>Hire</Text>
//                     </Button>
//                 </Right>
//            </CardItem>
           
//             <CardItem bordered>
//                 <Left>
//                     <Thumbnail source={require('../img/kambing.jpg')}/>
//                 <Body>
//                     <Text>Faris</Text>
//                     <Text note>PHP</Text>
//                     <Text note>Building Comment System</Text>
//                 </Body>
//                 </Left>       
//                 <Right>
//                     <Button success>
//                         <Text>Hire</Text>
//                     </Button>
//                 </Right>
//            </CardItem>
//           </Card> */}
         
//         {/* </Content>

       
//       </Container> */}


  
      );
    }
  }
  