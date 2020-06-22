import React, { Component } from 'react';
import { Alert, StatusBar, ImageBackground } from 'react-native';
import { Container, Button, Content, Spinner, Text, Grid, Col, Row } from 'native-base'
//import { auth } from '../config/firebase';
import { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import SplashScreen from 'react-native-splash-screen';
//import GoogleLogin from 'src/screen/auth/googlelogin';

export default class Loading extends Component {

    // componentWillMount() {
    //     firebase.auth().onAuthStateChanged((user) => {
    //         if (user) {
    //             console.log("User sign in", user);
    //             return firestore().collection('Users').doc(user).set(user);

    //         }
    //     });
    // }
    componentDidMount() {
        SplashScreen.hide();
        firebase.auth().onAuthStateChanged(user => {
            setTimeout(() => {
                if (user) {

                    const user = firebase.auth().currentUser;
                    user.providerData.forEach((userInfo) => {
                        console.log('User info for provider', userInfo);
                    })
                    // let data = user;
                    // if (data) {
                    //     firestore().collection('Users').doc(data).set(data);
                    // } else {
                    //     console.log('Not working buddy')
                    // }
                    Alert.alert('Welcome'.user, 'You are logged in.');
                    this.props.navigation.navigate('Hire');
                }
                else {
                    this.props.navigation.navigate('GoogleLogin');
                }
            }, 10);

        })
    }




    render() {
        return (
            <Container style={{ backgroundColor: '#FFF' }}>
                <StatusBar backgroundColor="#a438b6" />

                <Grid>
                    <Row size={30} backgroundColor={"#a438b6"}></Row>
                    <Row size={40} backgroundColor={"#a438b6"}>
                        <ImageBackground source={require('./img/icon.png')} style={{
                            width: '100%',
                            height: '100%'
                        }}></ImageBackground></Row>
                    <Row size={30} backgroundColor={"#a438b6"}>
                        <Col style={{ marginTop: -50 }}><Spinner /></Col></Row>
                </Grid>

                <Button primary onPress={() => this.props.navigation.navigate('googlelogin')}>
                    <Text>Go To Login</Text>
                </Button>

            </Container>
        )
    }
}