import React, { Component } from 'react';
import * as firebase from 'firebase';
import Toast, { DURATION } from 'react-native-easy-toast';
import Icon from 'react-native-vector-icons/Ionicons';
import { Container, Content, Button, Header, Left, Body, Title } from 'native-base';
import {
    StyleSheet,
    Text,
    TextInput,
    FlatList,
    Modal,
    View,
    DatePicker
} from 'react-native';
//import DatePicker from 'react-native-datepicker';
import { db } from '../../config/firebase';

// const firebaseConfig = {
//     apiKey: "AIzaSyD3MtsSaSJgXjr_xlAIn81uRisWwLNSAN8",
//     authDomain: "getjob-8c6bc.firebaseapp.com",
//     databaseURL: "https://getjob-8c6bc.firebaseio.com",
//     projectId: "getjob-8c6bc",
//     storageBucket: "getjob-8c6bc.appspot.com",
//     messagingSenderId: "407221360370",
//     appId: "1:407221360370:web:fed9c21000d0a82881e26b",
//     measurementId: "G-3TKN2VBVS8"
// };

// const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class TaskList extends Component {
    static navigationOptions = {
        title: 'Task List',

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



    constructor(props) {
        super(props);
        //realtime listener for firebase db
        this.itemsRef = db.ref('todos');
        this.state = { description: '', todos: [], date: '', modalVisible: false, };
    }

    keyExtractor = (item) => item.id;

    renderItem = ({ item }) =>
        <View >
            <Text style={{ fontSize: 20 }}>{item.description}, {item.date}</Text>
        </View>;

    saveData = () => {
        if (this.state.description != '' && this.state.date != '') {
            this.itemsRef.push({ description: this.state.description, date: this.state.date });
            this.refs.toast.show('Todo saved');
            this.setState({ date: '', modalVisible: false });
        }
        else {
            this.refs.toast.show('Some data is missing');
        }
    };

    // List todos
    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {
            var items = [];
            snap.forEach((child) => {
                items.push({
                    id: child.key,
                    description: child.val().description,
                    date: child.val().date,
                });
            });

            this.setState({ todos: items });
        });
    }

    componentDidMount() {
        this.listenForItems(this.itemsRef);
    }

    render() {
        return (
            <Container>

                <View style={styles.maincontainer}>


                    <Header>
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Icon name='arrow-back' size={40} />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Task List</Title>
                        </Body>

                    </Header>

                    <Content>


                        <Modal animationType="slide" transparent={false} visible={this.state.modalVisible}
                            onRequestClose={() => { }} >
                            <View style={styles.inputcontainer}>
                                <TextInput
                                    style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 7 }}
                                    onChangeText={(description) => this.setState({ description })}
                                    value={this.state.text}
                                    placeholder="description"
                                />
                                <DatePicker
                                    style={{ width: 200, marginBottom: 7 }}
                                    date={this.state.date}
                                    mode="date"
                                    placeholder="select date"
                                    format="YYYY-MM-DD"
                                    customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            left: 0,
                                            top: 4,
                                        },
                                    }}
                                    onDateChange={(date) => { this.setState({ date: date }) }}
                                />
                                <Button onPress={this.saveData} title="Save" />
                            </View>
                        </Modal>
                        <View style={styles.headercontainer}>
                            <Text style={{ fontSize: 20, marginRight: 40 }}>ALL TODOS</Text>
                            <Button title="Add" onPress={() => this.setState({ modalVisible: true })} />
                        </View>
                        <View style={styles.listcontainer}>
                            <FlatList
                                data={this.state.todos}
                                keyExtractor={this.keyExtractor}
                                renderItem={this.renderItem}
                                style={{ marginTop: 20 }}
                            />
                        </View>
                        <Toast ref="toast" position="top" />
                    </Content>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    headercontainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    inputcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    listcontainer: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

});