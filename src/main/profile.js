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




export default class Profile extends Component {


    constructor() {
        super();


        const user = firebase.auth().currentUser;
        user.providerData.forEach((userInfo) => {
            console.log('User info for provider: ', userInfo);
        });

        //if user dh wujud, just alert
        if (user == null) {
            firebase.firestore().collection('Users').doc(user.uid).set({
                uid: user.uid,
                username: user.email,
                email: user.email,
                phoneNumber: user.phoneNumber,
                profileImage: user.photoURL
            }).then(() => {
                firebase.firestore().collection('Users').doc(user.uid).get().then(data => { console.log(data) })
            });
        } else {
            console.log('Data Already Exist');
            //Alert.alert('Data already exist');
        }

        this.initData = user


        //firebase.firestore().collection('Users').doc(user.uid).set(user).collection('Job_Creator');
        this.state = {
            users: [],
            username: '',
            key: '',
            phonenumber: '',
            profileImage: '',
            keyplayer: '',
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
            project: '',
            //listViewData: data,
            newContact: "",
            mytext: '',
            data: this.initData,
            isModalVisible: false,
            inputText: '',
            editedItem: 0,

        };

    }

    componentDidMount() {
        this.unsubscribe = firebase.firestore().collection('Users').onSnapshot(this.getCollection);
    }


    // componentDidMount() {
    //     const UserRef = firebase.firestore().collection('Users');
    //     UserRef.get().then((res) => {
    //         if (res.exists) {
    //             const profile = res.data();
    //             this.setState({
    //                 key: res.id,
    //                 username: profile.username,
    //                 phonenumber: profile.phonenumber,
    //                 profileImage: profile.url,

    //             });
    //             console.log("state", this.state)
    //         } else {
    //             console.log("Whoops! Document does not exists");
    //         }
    //     })
    // }

    componentWillUnmount() {
        this.unsubscribe();
    }

    //get the data first
    getCollection = (querySnapshot) => {
        const users = [];
        querySnapshot.forEach((res) => {
            const { username, phonenumber, profileImage, description, keyplayer, project } = res.data();
            users.push({
                key: res.id,
                res,
                username,
                phonenumber,
                profileImage,
                description,
                keyplayer,
                project,
            });
        });
        this.setState({
            users,
            isLoading: false
        })
    }

    setModalVisible = (bool) => {
        this.setState({ isModalVisible: bool })
    }

    setInputText = (text) => {
        this.setState({ inputText: text })
    }

    setEditedItem = (id) => {
        this.setState({ editedItem: id })
    }
    handleEditItem = (editedItem) => {
        const newData = this.state.data.map(item => {
            if (item.id === editedItem) {
                item.text = this.state.inputText
                return item
            }
            return item
        })
        this.setState({ data: newData })
    }
    //hide card example
    ShowHideComponent = () => {
        if (this.state.show == true) {
            this.setState({ show: false });
        } else {
            this.setState({ show: true });
        }
    };




    updateText = (value) => {
        this.setState({ myText: value })
    }



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
            this.state.users.map((item, index) => {
                return (
                    <View style={{ flex: 1 }} key={index}>
                        <ScrollView>
                            <Card>
                                <CardItem cardBody>
                                    <Image source={{ uri: auth().currentUser.photoURL }} style={{ height: 200, width: null, flex: 1 }} />

                                </CardItem>
                                <CardItem>
                                    <Body>
                                        <Text>{auth().currentUser.displayName}</Text>
                                    </Body>
                                </CardItem>


                            </Card>

                            <Card style={{ height: 50 }}>
                                <CardItem cardBody bordered button onPress={() => this.props.navigation.navigate('MyJob')}>
                                    <Text style={{ justifyContent: 'center' }}>Click Here to View Your Uploaded Job</Text>
                                </CardItem>
                            </Card>




                            <Card style={{ height: 200 }}>
                                <CardItem header bordered>
                                    <Text>About Us</Text>
                                </CardItem>
                                <CardItem cardBody bordered button>
                                    <Body>
                                        <Text style={{ margin: 30 }}>{item.description}</Text>

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
                                            <Text onPress={this.setText}>Government</Text>
                                        </Separator>
                                        <ListItem>
                                            <Text>JKR</Text>
                                        </ListItem>
                                        <ListItem>
                                            <Text>Jabatan Hasil</Text>
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
                                    <ScrollView horizontal={true}>

                                        <Thumbnail large source={require('../img/dude.jpg')} style={{ padding: 10 }} />
                                        <Thumbnail large source={require('../img/dude.jpg')} style={{ padding: 10 }} />
                                        <Thumbnail large source={require('../img/dude.jpg')} style={{ padding: 10 }} />
                                        <Thumbnail large source={require('../img/dude.jpg')} style={{ padding: 10 }} />
                                        <Thumbnail large source={require('../img/dude.jpg')} style={{ padding: 10 }} />
                                    </ScrollView>

                                </CardItem>
                            </Card>




                            <Card>

                                <Button block primary last style={{ marginTop: 20, marginBottom: 5 }} onPress={() => {
                                    this.props.navigation.navigate('EditProfile', {
                                        userkey: item.key
                                    });
                                }}>
                                    <Text>Edit Profile</Text>
                                </Button>
                                <Button block danger last style={{ marginTop: 5, marginBottom: 5 }} onPress={this.logoff}>
                                    <Text>Sign Out</Text>
                                </Button>
                            </Card>

                        </ScrollView>

                    </View>
                )

            })
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
    text: {
        marginVertical: 30,
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
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


