import React, { Component } from 'react';
import { FlatList, Modal, Alert, TouchableOpacity, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';
import {
  Container,
  Header,
  Content,
  Right,
  View,
  Fab,
  Card,
  H1,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Icon,
  Item,
  Label,
  Input,
  Separator,
  Button,
  DatePicker,
  Picker,
  Textarea
} from 'native-base';
import { signOut } from '../screen/auth/googlelogin'
import { ScrollView } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
//import TimePicker from 'react-native-simple-time-picker';
import TimePicker from "react-native-24h-timepicker";

export default class Hire extends Component {

  constructor() {
    super();
    this.applicationRef = firestore().collection('Hiring').where('jobCreatorID', '==', auth().currentUser.uid);
    //this.applicationRef = firestore().collection('Hiring');/* .doc(auth().currentUser.uid).get().where('jobCreatorID', '==', auth().currentUser.uid); */
    this.hiringRef = firestore().collection('Job_Hired');

    this.state = {
      hire: [],
      isLoading: true,
      show: true,
      username: null,
      jobname: null,
      jobposition: null,
      isVisible: false,
      userID: '',
      jobCreatorID: '',
      jobCreatorName: '',
      jobDescription: '',
      jobName: '',
      jobWorktype: '',
      job_seekerImage: '',
      job_seekerSalary: '',
      lat: '',
      lng: '',
      ref_experienece: '',
      ref_skills: '',
      ref_selfDescribe: '',
      startDate: '',
      workingLocation: '',
      period: '',
      task: '',
      time: '',
      worktime: '',
      //selectedHours: 0,
      //selectedMinutes: 0,
      chosenDate: new Date(),
      date_start: new Date().toString().substr(4, 12),
      date_end: new Date().toString().substr(4, 12)
    };
    this.selectWorkTime = this.selectWorkTime.bind(this);
    this.setDate_Start = this.setDate_Start.bind(this);
    this.setDate_End = this.setDate_End.bind(this);

  }


  getDataOfJob = (documentSnapshot) => {
    return documentSnapshot.get('jobCreatorID')
  }

  componentDidMount() {
    this.unsubscribe = this.applicationRef.onSnapshot(this.getCollection);
    //let DataRef = firestore().collection('Hiring').doc(auth().currentUser.uid).get().then(documentSnapshot => this.getDataOfJob(documentSnapshot));


  }


  componentWillUnmount() {
    this.unsubscribe();
  }


//obtain collection from hiring first
  getCollection = (querySnapshot) => {
    const hire = [];
    querySnapshot.forEach((res) => {
      const {
        userID,
        jobCreatorID,
        jobCreatorName,
        jobDescription,
        jobName,
        jobWorkType,
        job_seekerImage,
        job_seeker_name,
        job_seekerSalary,
        lat,
        lng,
        ref_experienece,
        ref_skills,
        ref_selfDescribe,
        startDate,
        workingLocation
      } = res.data();
      hire.push({
        key: res.id,
        res,
        userID,
        jobCreatorID,
        jobCreatorName,
        jobDescription,
        jobName,
        job_seeker_name,
        jobWorkType,
        job_seekerImage,
        job_seekerSalary,
        lat,
        lng,
        ref_experienece,
        ref_skills,
        ref_selfDescribe,
        startDate,
        workingLocation
      });
    });
    this.setState({
      hire,
      isLoading: false
    })
  }

  onCancel() {
    this.TimePicker.close();
  }

  onConfirm(hour, minute) {
    this.setState({ time: `${hour}:${minute}` });
    this.TimePicker.close();
  }

  displayModal(show) {
    this.setState({ isVisible: show })
  }

  setPeriod = (value) => {
    this.setState({ ...this.state, period: value })
  }

  setTask = (value) => {
    this.setState({ ...this.state, task: value })
  }

  selectWorkTime = (value) => {
    this.setState({
      worktime: value
    })
  }

  setDate_Start(newDate) {
    this.setState({ date_start: newDate.toString().substr(4, 12) });
  }

  setDate_End(newDate) {
    this.setState({ date_end: newDate.toString().substr(4, 12) });
  }



  static navigationOptions = {
    title: 'Hire',

    tabBarIcon: ({ tintColor }) => (
      <Icon name="md-briefcase" style={{ color: tintColor }} />
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


//get the information from the user and save it another collection for usage of job_list
  HireWorking = (id) => {
    console.log("text_id", id);
    let dbref = firebase.firestore().collection('Hiring').doc(id).get();
    dbref.then(doc => {
      this.setState({
        ...this.state,
        uid: doc.get('uid'),
        //job_seeker_name: doc.get('username'),
        jobSeekerName: doc.get('job_seeker_name'),
        jobseekerID: doc.get('userID'),
        jobDescription: doc.get('jobDescription'),
        job_seekerImage: doc.get('job_seekerImage'),
        jobname: doc.get('jobName'),
        jobWorktype: doc.get('jobWorkType'),
        workingLocation: doc.get('workingLocation'),
        lat: doc.get('lat'),
        lng: doc.get('lng'),
        job_seeker_salary: doc.get('job_seekerSalary'),
        skills: doc.get('ref_skills'),
        experience: doc.get('ref_experienece'),
        selfDescribe: doc.get('ref_selfDescribe')
      }, () => {

        console.log("state", this.state)
        console.log("auth.currentUser", auth().currentUser)



        if (this.state.period && this.state.time && this.state.worktime && this.state.date_start && this.state.date_end && this.state.task) {

          this.hiringRef.add({
            jobCreatorID: auth().currentUser.uid,
            job_creator_name: auth().currentUser.displayName,
            job_creator_Image: auth().currentUser.photoURL,
            jobSeekerName: this.state.jobSeekerName,
            jobSeekerID: this.state.jobseekerID,
            jobDescription: this.state.jobDescription,
            job_seekerImage: this.state.job_seekerImage,
            jobName: this.state.jobname,
            job_seekerSalary: this.state.job_seeker_salary,
            type_of_Job: this.state.jobWorktype,
            location: this.state.workingLocation,
            lat: this.state.lat,
            lng: this.state.lng,
            period: this.state.period,
            task: this.state.task,
            startDate: this.state.date_start,
            endDate: this.state.date_end,
            time: this.state.time,

          }).then((res) => {
            this.setState({
              task: '',
              period: '',
              startDate: '',
              endDate: '',
              time: '',
              worktime: ''
            });
            Alert.alert('Congrats!', 'Your Application Has Been Send To The Job Seeker');
            this.displayModal(!this.state.isVisible);

          })

            .catch((err) => {
              console.error("Error found: ", err);
              // this.setState({
              //   isLoading: false,
              // });
            });
        }
      });

    });

  }

  render() {

    return (
      <Container>

        <Content >
          <Text style={{ textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20 }}>List of Applicant</Text>
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.isVisible}
            onRequestClose={() => {
              Alert.alert('Modal has now been closed.');
            }}>

            <Item fixedLabel last style={{ marginTop: 20 }}>
              <Label>Period</Label>
              <Input onChangeText={this.setPeriod} bordered placeholder="Working Period Required" />
            </Item>

            <Item fixedLabel picker last>
              <Label>Type of Time</Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                style={{ width: undefined }}
                placeholder="State Working Time"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.worktime}
                onValueChange={this.selectWorkTime.bind(this)}
                Title="Work Type"
              >
                <Picker.Item label="Select Period of Working" value={null} />
                <Picker.Item label="Day" value="Day" />
                <Picker.Item label="Hour" value="Time" />

              </Picker>
            </Item>
            <View>
              <Text style={Style.text}>Please Determine Working Time</Text>
              <TouchableOpacity
                onPress={() => this.TimePicker.open()}
                style={Style.button}
              >
                <Text style={Style.buttonText}>Open TimePicker</Text>
              </TouchableOpacity>
              <Text>{this.state.time}</Text>
              <TimePicker
                ref={ref => {
                  this.TimePicker = ref;
                }}
                onCancel={() => this.onCancel()}
                onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
              />
            </View>

            <DatePicker
              defaultDate={new Date()}
              minimumDate={new Date()}
              maximumDate={new Date(2030, 12, 31)}
              locale={"en"}
              date={this.state.setDate_Start}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="Select date"
              textStyle={{ color: "blue" }}
              placeHolderTextStyle={{ color: "#d3d3d3" }}
              onDateChange={this.setDate_Start}
              disabled={false}
            />
            <Text>
              Start Date: {this.state.date_start}
            </Text>


            <DatePicker
              defaultDate={new Date()}
              minimumDate={new Date()}
              maximumDate={new Date(2030, 12, 31)}
              locale={"en"}
              date={this.state.setDate_End}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="Select date"
              textStyle={{ color: "blue" }}
              placeHolderTextStyle={{ color: "#d3d3d3" }}
              onDateChange={this.setDate_End}
              disabled={false}
            />
            <Text>
              End Date: {this.state.date_end}
            </Text>



            <Item fixedLabel last>
              <Label>Task To Do</Label>
              <Textarea />
              <Input onChangeText={this.setTask} rowSpan={15} bordered placeholder="List The Required Task Here" />
            </Item>


            <Text
              style={Style.closeText}
              onPress={() => {
                this.displayModal(!this.state.isVisible);
              }}><Icon name="md-close" size={20} />
            </Text>

            <Button success style={Style.addButton} onPress={() => this.HireWorking(this.state.key)}>
              <Text>Submit</Text>
            </Button>
          </Modal>
          <View style={{ flex: 1 }}>
            <FlatList
              data={this.state.hire}

              contentContainerStyle={{ flexGrow: 1 }}
              renderItem={({ item, index }) => {
                return (
                  <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView>
                      <Card key={index} style={{ marginBottom: 5 }}>
                        <CardItem header bordered>
                          <Text>{item.jobName}</Text>
                        </CardItem>
                        <CardItem header>
                          <Text>{item.job_seeker_name}</Text>
                        </CardItem>
                        <CardItem bordered button onPress={() => this.props.navigation.navigate('HireOverview', {
                          userkey: item.key
                        })}>
                          <CardItem cardBody>
                            <Left>
                              <Thumbnail source={{ uri: item.job_seekerImage }} />
                            </Left>
                            <Body style={{ paddingLeft: 20, flex: 1 }}>
                              <Text style={{ paddingBottom: 7 }}>Capability</Text>
                              <Text note style={{ padding: 10 }}>{item.ref_skills}</Text>
                              <Text style={{ padding: 10 }}>{item.ref_experienece}</Text>
                            </Body>

                            <Right>
                              <Button success onPress={() => { this.setState({ key: item.key }), this.displayModal(true) }}>

                                <Text>Hire</Text>
                              </Button>
                            </Right>
                          </CardItem>


                        </CardItem>
                      </Card>
                    </ScrollView>
                  </SafeAreaView>
                )
              }}
            />
          </View>

        </Content>


        <Fab style={{ backgroundColor: '#66cd00', borderRadius: 50 }} onPress={() => this.props.navigation.navigate('UploadJob')}>

          <Text style={{ fontColor: '#000000', fontSize: 9 }}>
            Request
          </Text>
        </Fab>

      </Container>
    );
  }
}

const Style = StyleSheet.create({
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 100,
    backgroundColor: '#E91E63',
    width: 90,
    height: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  closeText: {
    fontSize: 25,
    color: '#00479e',
    textAlign: 'center',
    marginTop: 10
  },
  text: {
    fontSize: 20,
    marginTop: 5
  },
  button: {
    backgroundColor: "#4EB151",
    paddingVertical: 11,
    paddingHorizontal: 17,
    borderRadius: 3,
    marginVertical: 50
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600"
  }
})


