import React, { Component } from 'react';
import { StyleSheet, ScrollView, Image } from 'react-native';
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
    Button
} from 'native-base';
import { signOut } from '../screen/auth/googlelogin';


export default class Profile extends Component {

    static navigationOptions = {
        title: 'Profile',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-person" style={{ color: tintColor }} />
        ),
        headerTitle: {
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

    logoff = () => {
        if (signOut()) {
            Alert.alert('Signing Out')
            this.props.navigation.navigate('googlelogin');
        } else {
            console.log('Error signOut')
        }
    }

    render() {
        return (
            <Container>

                <ScrollView>
                    <Card >
                        <CardItem cardBody>
                            <Image source={require('../img/kambing.jpg')} style={{ height: 200, width: null, flex: 1 }} />

                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>Creative World Industries</Text>
                            </Body>
                        </CardItem>
                        {/* <CardItem>   
                     <Text style={{marginTop: 5, marginBottom: 5}}>Creative World Industries</Text>
                </CardItem> */}

                    </Card>

                    <Card style={{ height: 200 }}>
                        <CardItem header bordered>
                            <Text>About Us</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <Body>
                                <Text>We are system integrator contract companies specialize in the government's and business IT support</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={{ height: auto }}>
                        <CardItem header bordered>
                            <Text>Notable Project</Text>
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
                    <Card style={{ height: 150 }}>
                        <CardItem cardBody bordered button onPress={() => this.props.navigation.navigate('MyJob')}>
                            <Text style={{ justifyContent: 'center' }}>Click Here to View Your Uploaded Job</Text>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header>
                            <Text>Task List</Text>
                        </CardItem>
                        <CardItem cardBody button onPress={() => this.props.navigation.navigate('TaskList')}>
                            <Text style={{ justifyContent: 'center' }}>View Task</Text>
                        </CardItem>
                    </Card>
                    <Card style={{ height: 250 }}>
                        <CardItem header bordered>
                            <Text>Key Player</Text>
                        </CardItem>
                        <CardItem cardBody style={{ flex: 1, flexDirection: 'row', padding: 10, margin: 5, alignContent: 'space-around', justifyContent: 'space-between', alignItems: 'center', marginLeft: 5 }}>
                            <Thumbnail large source={require('../img/dude.jpg')} style={{ padding: 10 }} />
                            <Thumbnail large source={require('../img/dude.jpg')} style={{ padding: 10 }} />
                            <Thumbnail large source={require('../img/dude.jpg')} style={{ padding: 10 }} />
                            <Thumbnail large source={require('../img/dude.jpg')} style={{ padding: 10 }} />
                            <Thumbnail large source={require('../img/dude.jpg')} style={{ padding: 10 }} />


                        </CardItem>
                    </Card>
                    <Card>
                        <Button block danger last style={{ marginTop: 20, marginBottom: 20 }} onPress={this.logoff}>
                            <Text>Sign Out</Text>
                        </Button>
                    </Card>

                </ScrollView>



            </Container>




        );
    }
}


