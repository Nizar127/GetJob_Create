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



export default class UploadSuccess extends Component {
  
  
    render() {
      return (
          <Container>

            
            <Card style={{alignItems: 'center', marginTop:350 ,height: 150, width: 350, backgroundColor:'#c0c0c0'}}>
                <CardItem >
                      <Text style={{padding: 20}}>Rest Assured</Text>
                </CardItem> 
                <CardItem>
                    <Text 
                    style={{paddingTop: 5, paddingBottom: 8, paddingStart: 3 ,paddingEnd: 3}}>
                        We will find you a new workfoce
                    </Text>
                </CardItem>
                
            </Card>
    

            
         </Container>
            
      );
    }
  }
  