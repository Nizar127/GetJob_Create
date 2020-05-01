import React, {Component} from 'react';
import {StyleSheet, ScrollView, Image, View} from 'react-native';
// import { 
//     Container, 
//     Header, 
//     Content, 
//     View, 
//     Card,  
//     Right, 
//     auto, 
//     CardItem,
//     Thumbnail, 
//     Text, 
//     Left, 
//     Body, 
//     Icon, 
//     List,
//     ListItem,
//     Separator,
//     Button } from 'native-base';
import {Header, Container, ListItem} from 'react-native-elements'; 
import { TouchableOpacity } from 'react-native-gesture-handler';

const list = [
    {
      title: 'Ahmad Hassan',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle:'Working on System Engineering for 6 Months',
      job_title: 'Contracts'
    },
    {
        title: 'Ahmad Hassan',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle:'Working on System Engineering for 6 Months',
        job_title: 'Contracts'
      },
      {
        title: 'Ahmad Hassan',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle:'Working on System Engineering for 6 Months',
        job_title: 'Contracts'
      },

]

export default class ProgressList extends Component {
  
    // static navigationOptions = {
    //   title: 'Profile',
    //     tabBarIcon: ({ tintColor }) => (
    //       <Icon name="person" style={{ color: tintColor }} />
    //     ),
    //     headerTitle:{
    //        title: 'GET-THE-JOB'
    //     },
    //   headerStyle: {
    //   backgroundColor: '#f45fff',
    // },
    //   headerTintColor: '#fff',
    //   headerTitleStyle: {
    //       fontWeight: 'bold',
    //   },
    // }
  
  

    render() {
      return (

     
          <Container>
            <Header
                placement="left"
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: 'Job Progress', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff' }}
            />
    <ScrollView>   
         <View>
           <TouchableOpacity onpress={()=> this.props.navigation.navigate('ProgressDetails')}>

           
            {
              list.map((item, i) => (
                 <ListItem
                  key={i}
                  leftAvatar={{ source: { uri: item.avatar_url } }}
                  title={item.title}
                  subtitle={item.subtitle}
                  rightTitle={item.job_title}
                  bottomDivider
                  chevron
                  
                />
               

                ))
            }
            </TouchableOpacity>
        </View>
    </ScrollView>


            
         </Container>
           


  
      );
    }
  }
  

 