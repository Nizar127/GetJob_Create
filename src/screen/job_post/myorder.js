import React, { Component } from 'react';
//import { removeStudent } from '../services/DataService';
import { StyleSheet, Alert, FlatList, View, ActivityIndicator } from 'react-native';
import { Container, Content, Footer, FooterTab, Button, Icon, Text, List, ListItem, Left, Right, Header, Body } from 'native-base';
import { db } from '../../config/firebase';
import JobList from '../../components/chat/JobList';
import { removeJob } from '../../service/DataService'
import firestore from '@react-native-firebase/firestore';

//let job = db.ref('/Job');

export default class MyJob extends Component {
  constructor() {
    super();
    this.applicationRef = firestore().collection('Job_list');
    this.state = {
      isLoading: true,
      jobs: []
    }
  }




  componentDidMount() {
    this.unsubscribe = this.applicationRef.onSnapshot(this.getCollection);
    // job.on('value', (snapshot) => {
    //   let data = snapshot.val();
    //   if (data) {
    //     let firebaseData = Object.values(data);
    //     this.setState({ jobs: firebaseData });
    //     console.log(this.state.jobs);
    //   }
    // });
  }


  componentWillUnmount() {
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const jobs = [];
    querySnapshot.forEach((res) => {
      const { jobname, uniqueId, jobdesc, worktype, salary, peoplenum, chosenDate, location } = res.data();
      jobs.push({
        key: res.id,
        res,
        jobname,
        uniqueId,
        jobdesc,
        worktype,
        salary,
        peoplenum,
        chosenDate,
        location
      });
    });
    this.setState({
      jobs,
      isLoading: false
    })
  }


  deleteConfirmation = (uniqueId) => {
    Alert.alert(
      'Status',
      'Are you sure you want to delete this Job?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => removeJob(uniqueId) }
      ],
      { cancelable: false }
    );
  }


  //   deleteConfirmation= (matricno) => {
  //     Alert.alert(
  //       'Status', 
  //       'Are you sure you want to delete this student?',
  //       [
  //         {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
  //         {text: 'OK', onPress: () => removeStudent(matricno)}
  //       ],
  //       { cancelable: false }
  //       );
  //   }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      )
    }
    return (

      <Container>
        <Header>
          <View style={{ marginTop: 25, marginEnd: 350 }}>
            <Icon style={{ color: 'white' }} name="md-menu" onPress={() => this.props.navigation.openDrawer()} />
          </View>
        </Header>

        <Content padder>
          <Text style={{ textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20 }}>Job List</Text>
          <FlatList
            data={this.state.jobs}

            renderItem={({ item, index }) => {
              return (
                <ListItem key={index}
                  onLongPress={(jobname) => { this.deleteConfirmation(jobname) }}
                  onPress={() => {
                    this.props.navigation.navigate('MyOrderDetail', {
                      userkey: item.key
                    });
                  }}>
                  <Left>
                    <Text>{item.jobname}</Text>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
              )
            }}
          />


          {/* <List vertical={true}>
            <JobList jobs={this.state.jobs}

              onPress={(uniqueId, jobName, jobdesc, worktype, salary, peoplenum, chosenDate, location) => {
                this.props.navigation.navigate('MyOrderDetail',
                  {
                    jobName: jobName,
                    uniqueId: uniqueId,
                    jobdesc: jobdesc,
                    worktype: worktype,
                    salary: salary,
                    peoplenum: peoplenum,
                    chosenDate: chosenDate,
                    location: location
                  });
              }}
              onLongPress={(uniqueId) => { this.deleteConfirmation(uniqueId) }} />
          </List> */}
          <Text>{this.state.salary}</Text>
        </Content>



        <Footer>
          <FooterTab>
            <Button vertical onPress={() => { this.props.navigation.navigate('UploadJob') }}>
              <Icon name="md-briefcase" />
              <Text>New Job</Text>
            </Button>
          </FooterTab>
        </Footer>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 22
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
