import React, { Component } from 'react';
import {
    StyleSheet, ScrollView, Image, FlatList,
    UIManager, Animated,
    LayoutAnimation, TextInput, Modal, TouchableHighlight
} from 'react-native';
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
import auth from '@react-native-firebase/auth';
//import firebase from '../config/firebase'
//import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';
import { Alert } from 'react-native';

console.disableYellowBox = true;

export default class EditProfile extends Component {


    constructor() {
        super();

        //firebase.firestore().collection('Users').doc(user.uid).set(user).collection('Job_Creator');
        this.state = {
            users: [],
            username: '',
            phonenumber: '',
            profileImage: '',
            keyplayer: '',
            description: '',
            uniqueId: '',
            jobdesc: '',
            photo: '',
            url: '',
            imageType: '',
            worktype: '',
            salary: '',
            peoplenum: '',
            time: 0,
            lat: 0,
            lng: 0,
            location: '',
            show: true,
            project: ''
            //listViewData: data,


        };

    }


    componentDidMount() {
        const profileRef = firestore().collection('User').doc(this.props.navigation.state.params.userkey);
        profileRef.get().then((res) => {
            if (res.exists) {
                const user = res.data();
                this.setState({
                    key: res.id,
                    username: user.username,
                    phonenumber: user.phonenumber,
                    profileImage: user.profileImage,
                    description: user.description,
                    keyplayer: user.keyplayer,
                    project: user.project,
                });
                console.log("state", this.state)
            } else {
                console.log("Whoops! Document does not exists");
            }
        })


    }





    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    updateUser = () => {

        const updateDBRef = firebase.firestore().collection('Users').doc(this.state.key);
        updateDBRef.set({
            username: this.state.usernamename,
            profileimage: this.state.profileImage,
            description: this.state.description,
            keyplayer: this.state.keyplayer,
            project: this.state.project
        }).then((docRef) => {
            this.setState({
                key: '',
                username: '',
                profileImage: '',
                description: '',
                keyplayer: '',
                project: ''
            });
            this.props.navigation.navigate('Profile');
        })

    }

    render() {
        return (

            // this.props.users.map((item, index) => {

            <View style={{ flex: 1 }} /* key={index} */  >
                <ScrollView>
                    <Card>
                        <CardItem cardBody>
                            <Image source={{ uri: auth().currentUser.photoURL }} style={{ height: 200, width: null, flex: 1 }} />

                        </CardItem>
                        <CardItem>
                            <Body>
                                <View style={styles.inputGroup}>
                                    <TextInput
                                        placeholder={'Username'}
                                        value={this.state.username}
                                        onChangeText={(val) => this.inputValueUpdate(val, 'username')}
                                    />
                                </View>
                                {/* <Text>{auth().currentUser.displayName}</Text> */}
                            </Body>
                        </CardItem>


                    </Card>


                    <Card>
                        <CardItem header bordered>
                            <Text>About Us</Text>
                        </CardItem>
                        <CardItem cardBody bordered button
                        // onPress={() => { this.setModalVisible(true); this.setInputText(item.text), this.setEditedItem(item.id) }}
                        >
                            <Body>
                                <View style={styles.inputGroup}>
                                    <TextInput
                                        placeholder={'Description'}
                                        value={this.state.description}
                                        onChangeText={(val) => this.inputValueUpdate(val, 'description')}
                                    />
                                </View>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={{ height: auto }}>
                        <CardItem header bordered>

                            <Text>Notable Project</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <Content>
                                <View style={styles.inputGroup}>
                                    <TextInput
                                        placeholder={'Notable Project'}
                                        value={this.state.project}
                                        onChangeText={(val) => this.inputValueUpdate(val, 'project')}
                                    />
                                </View>
                            </Content>
                        </CardItem>
                    </Card>
                    <Card style={{ height: 250 }}>
                        <CardItem header bordered>
                            <Text>Key Player</Text>
                        </CardItem>
                        <CardItem cardBody style={{ flex: 1, flexDirection: 'row', padding: 10, margin: 5, alignContent: 'space-around', justifyContent: 'space-between', alignItems: 'center', marginLeft: 5 }}>
                            <ScrollView horizontal={true}>

                                <View style={styles.inputGroup}>
                                    <TextInput
                                        placeholder={'Keyplayer'}
                                        value={this.state.keyplayer}
                                        onChangeText={(val) => this.inputValueUpdate(val, 'keyplayer')}
                                    />
                                </View>
                            </ScrollView>

                        </CardItem>
                    </Card>




                    <Card>

                        <Button block success last style={{ marginTop: 20, marginBottom: 5 }} onPress={() => this.updateUser}>
                            <Text>Update</Text>
                        </Button>
                    </Card>
                </ScrollView>

            </View>


            //})
        )
    }
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    contentContainer: {
        backgroundColor: 'white',
    },
    item: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        alignItems: 'center',
    },
    marginLeft: {
        marginLeft: 5,
    },
    menu: {
        width: 20,
        height: 2,
        backgroundColor: '#111',
        margin: 2,
        borderRadius: 3,
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    text: {
        marginVertical: 30,
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    button: {
        marginBottom: 7
    },
    textInput: {
        width: '90%',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 30,
        borderColor: 'gray',
        borderBottomWidth: 2,
        fontSize: 16,
    },
    modalView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    touchableHighlight: {
        backgroundColor: 'white',
        marginVertical: 10,
        alignSelf: 'stretch',
        alignItems: 'center',
    }
})


