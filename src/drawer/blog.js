import React from 'react';
import {StyleSheet, Text, List, View, Slider, ScrollView, Image, Alert} from 'react-native';
import { Container, Card, CardItem, Header, Left, Body, Thumbnail, Right, Button, Icon, Title, Separator, Segment, Content, Item} from 'native-base';


export default class Blog extends React.Component {



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
                   
                   <Icon name="arrow-back" style={{marginStart: 3, marginEnd: 10}} onPress={() => this.props.navigation.goBack()}/>
                    <Text style={{fontSize: 20, justifyContent: 'center'}}>BLOG</Text>           
                  </Separator>           
                  <Card>
            <CardItem cardBody>
              <Image source={require('../img/kambing.jpg')} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
            <Body>
                  <Text>Catering Services</Text>
                  <Text note>Global Ventures Industies</Text>
                
              </Body>
            </CardItem>
              <CardItem>
                  <Text>This works well somehow</Text>
               </CardItem>
             <CardItem style={{justifyContent: 'center'}}>
              
                  <Button rounded primary onPress={() => this.props.navigation.navigate('JobHome')} >
                        <Text>Book Now</Text>
                    </Button>  
                        
              

             </CardItem>

          </Card>
          <Card>
            <CardItem cardBody>
              <Image source={require('../img/kambing.jpg')} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
            <Body>
                  <Text>Catering Services</Text>
                  <Text note>Global Ventures Industies</Text>
                
              </Body>
            </CardItem>
              <CardItem>
                  <Text>This works well somehow</Text>
               </CardItem>
             <CardItem style={{justifyContent: 'center'}}>
              
                  <Button rounded primary onPress={() => this.props.navigation.navigate('JobHome')} >
                        <Text>Book Now</Text>
                    </Button>  
                        
              

             </CardItem>

          </Card>
          <Card>
            <CardItem cardBody>
              <Image source={require('../img/kambing.jpg')} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
            <Body>
                  <Text>Catering Services</Text>
                  <Text note>Global Ventures Industies</Text>
                
              </Body>
            </CardItem>
              <CardItem>
                  <Text>This works well somehow</Text>
               </CardItem>
             <CardItem style={{justifyContent: 'center'}}>
              
                  <Button rounded primary onPress={() => this.props.navigation.navigate('JobHome')} >
                        <Text>Details</Text>
                    </Button>  
                        
              

             </CardItem>

          </Card>
          <Card>
            <CardItem cardBody>
              <Image source={require('../img/kambing.jpg')} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
            <Body>
                  <Text>Catering Services</Text>
                  <Text note>Global Ventures Industies</Text>
                
              </Body>
            </CardItem>
              <CardItem>
                  <Text>This works well somehow</Text>
               </CardItem>
             <CardItem style={{justifyContent: 'center'}}>
              
                  <Button rounded primary onPress={() => this.props.navigation.navigate('JobHome')} >
                        <Text>Details</Text>
                    </Button>  
                        
              

             </CardItem>

          </Card>
          <Card>
            <CardItem cardBody>
              <Image source={require('../img/kambing.jpg')} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
            <Body>
                  <Text>Catering Services</Text>
                  <Text note>Global Ventures Industies</Text>
                
              </Body>
            </CardItem>
              <CardItem>
                  <Text>This works well somehow</Text>
               </CardItem>
             <CardItem style={{justifyContent: 'center'}}>
              
                  <Button rounded primary onPress={() => this.props.navigation.navigate('JobHome')} >
                        <Text>Details</Text>
                    </Button>  
                        
              

             </CardItem>

          </Card>
           </Content>
            </Container>
        </ScrollView>
        
        </Container>
  
      );
    }
  }