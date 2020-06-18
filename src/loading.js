import React, { Component } from 'react';
import { Alert, StatusBar, ImageBackground } from 'react-native';
import { Container, Button, Content, Spinner, Text, Grid, Col, Row } from 'native-base'
//import { auth } from '../config/firebase';
import { firebase } from '@react-native-firebase/auth'

import SplashScreen from 'react-native-splash-screen';
//import GoogleLogin from 'src/screen/auth/googlelogin';

export default class Loading extends Component {

    componentDidMount() {
        SplashScreen.hide();
        firebase.auth().onAuthStateChanged(user => {

            setTimeout(() => {
                if (user) {
                    //     Alert.alert('Status', 'You are logged in.',
                    //      [
                    //         {
                    //             text: "Start Hiring",
                    //             onPress: () => this.props.navigation.navigate('Hire')
                    //         },
                    //         {
                    //             text: "View Current Job Posted",
                    //             onPress: () => this.props.navigation.navigate('MyJob')
                    //         }
                    //     ], { cancelable: false }
                    // );
                    Alert.alert('Status', 'You are logged in.')
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