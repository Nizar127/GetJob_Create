import React, { Component } from 'react';
import { Dimensions, View, Text, StyleSheet, Image} from 'react-native';
import {Root, Container, Content, Header, Form, Label, Input, Item, Button} from 'native-base';
import Icon from '@expo/vector-icons/Ionicons';
//import {db} from './config/firebase';
import {db, auth, storage} from './../config/firebase';


import {
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';
import SafeAreaView from 'react-native-safe-area-view';
import { ScrollView } from 'react-native-gesture-handler';
import ignoreWarnings from 'react-native-ignore-warnings';
ignoreWarnings('Setting a timer');

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = { loading: true};
     this.state = ({
       email: '',
       password: ''
   })

   auth.onAuthStateChanged(function(user){
      if(user){
        console.log("Logged in", user);
      }else{
        console.log("Logged Out");
      }
   });

  }


  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("../node_modules/native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("../node_modules/native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }


  signUpUser = () => {

    try {

        if (this.state.password.length < 6) {
            alert("Please enter atleast 6 characters")
            return;
        }

        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
    }
    catch (error) {
        console.log(error.toString())
    }
}

loginUser = () => {

    try {

        auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(function (user) {
            
        })
        this.props.navigation.navigate('Dashboard');

    }
    catch (error) {
        console.log(error.toString())
    }
}

  render() {
    return (
      <Container style={styles.container}>
      <Form>
          <Item floatingLabel>
              <Label>Email</Label>
              <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={(email) => this.setState({ email: email })}
              />

          </Item>

          <Item floatingLabel>
              <Label>Password</Label>
              <Input
                  secureTextEntry={true}
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={(password) => this.setState({ password:password })}
              />
          </Item>

          <Button style={{ marginTop: 10 }}
              full
              rounded
              success
              onPress={() => this.loginUser()}
          >
              <Text style={{ color: 'white' }}> Login</Text>
          </Button>

          <Button style={{ marginTop: 10 }}
              full
              rounded
              primary
              onPress={() => this.signUpUser()}
          >
              <Text style={{ color: 'white' }}> Sign Up</Text>
          </Button>

          <Button style={{ marginTop: 10 }}
              full
              rounded
              primary
              onPress={() => this.props.navigation.navigate('Dashboard')}
          >
              <Text style={{ color: 'white' }}> Skip to Dashboard</Text>
          </Button>

      </Form>
  </Container>
    
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
  },
  button: {
    backgroundColor: 'white',
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'black',
    shadowOpacity: 0.2
  },
});

