import React, { Component } from 'react';
//import { removeStudent } from '../services/DataService';
import { Alert, View } from 'react-native';
import { Container, auto, Content, Footer, FooterTab, Body, Button, Icon, Text, List, Header, Card, CardItem } from 'native-base';
import { db } from '../../config/firebase';
import JobList from '../../components/chat/JobList';

let job = db.ref('/Job');

export default class MyOrderDetail extends Component {
  constructor() {
    super();
    this.state = {
      jobs: [],
      jobname: null,
      jobdesc: null,
      salary: null,
      peoplenum: null,
      chosenDate: null,
      worktype: null,
      location: null
    }

    // this.state = {
    //   jobs: [],
    //   uniqueId: this.props.jobs.uniqueId,
    //   jobname: this.props.jobs.jobname,
    //   jobdesc: this.props.jobs.jobdesc,
    //   salary: this.props.jobs.salary,
    //   peoplenum: this.props.jobs.peoplenum,
    //   chosenDate: this.props.jobs.chosenDate,
    //   worktype: this.props.jobs.worktype,
    //   location: this.props.jobs.location,
    // }


  }


  //var key = Object.keys(snapshot.val())[0];

  componentDidMount() {
    //this._isMounted = true;
    //  if(this._isMounted){
    let query = job.orderByChild("uniqueId").equalTo(uniqueId);
    query.on('value', (snapshot) => {
      let key = snapshot.key;
      let data = snapshot.val();
      if (data) {
        //let id = Object.keys(data)[0];
        let firebaseData = Object.values(data);
        //key = Object.keys(data)[0];
        // if(this._isMounted){
        if (key) {
          this.setState({ jobs: firebaseData }, () => {
            this.state.jobs.map((element) => {
              this.setState({
                jobname: element.jobname,
                jobdesc: element.jobdesc,
                uniqueId: element.uniqueId,
                salary: element.salary,
                peoplenum: element.peoplenum,
                worktype: element.worktype,
                chosenDate: element.chosenDate,
                location: element.location,
              });
            });
          });
        }
        // }

      }
    });
    //    }

  }
  // componentDidMount() {

  //   const {navigation} = this.props;
  //   const jobID = navigation.getParam('id');
  //     //query here
  //  let query = job.orderByChild('id').equalTo(jobID)
  //     //query.on .....
  //   query.on('value', (snapshot) => {
  //       let data = snapshot.val();
  //         if(data){
  //           let firebaseData = Object.values(data);
  //           this.setState({jobs: firebaseData},()=>{
  //               this.state.jobs.map((element)=>{
  //                   this.setState({
  //                       jobname:element.jobname,
  //                       salary:element.salary,
  //                       worktype:element.worktype,
  //                       peoplenum:element.peoplenum,
  //                       chosenDate:element.chosenDate,
  //                       location:element.location
  //                   })
  //               })
  //           });
  //           console.log(this.state.jobs);
  //         }
  //    });
  // }

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

    const { uniqueId, jobname, jobdesc, worktype, salary, peoplenum, chosenDate, location } = this.props.navigation.getParam;

    // const Job = this.props.navigation.getParam('job');

    //const ApplicantID = this.props.uniqueId;
    // const jobName = this.props.jobname;
    // const JobDesc = this.props.jobdesc;
    // const WorkType = this.props.worktype;
    // const Salary = this.props.salary;
    // const PeopleNum = this.props.peoplenum;
    // const WorkDate = this.props.chosenDate;
    // const WorkPlace = this.props.location;

    return (
      <Container>
        <Header>
          <View style={{ marginTop: 25, marginEnd: 350 }}>
            <Icon style={{ color: 'white' }} name="md-menu" onPress={() => this.props.navigation.openDrawer()} />
          </View>
        </Header>

        <Content padder>
          <Card>
            <CardItem bordered header>
              <Text style={{ textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20 }} uniqueId={uniqueId}>{this.state.jobname}</Text>

            </CardItem>
            <CardItem bordered>

              <Text style={{ height: 30, fontWeight: "bold", marginTop: 20, marginBottom: 20 }}>{this.state.uniqueId}</Text>

            </CardItem>
          </Card>
          <Card>
            <CardItem bordered header>

              <Text style={{ justifyContent: "center", fontWeight: "bold" }}>Job Description</Text>

            </CardItem>
            <CardItem bordered cardBody>
              <Body style={{ flex: 1, justifyContent: 'center', height: 250, marginLeft: 20 }}>
                <Text>{this.state.jobdesc}</Text>
              </Body>
            </CardItem>
          </Card>
          {/* <CardItem>   
                     <Text style={{marginTop: 5, marginBottom: 5}}>Creative World Industries</Text>
                </CardItem> */}



          <Card style={{ height: 200 }}>
            <CardItem header bordered>
              <Text style={{ fontWeight: "bold" }}>Requirement</Text>
            </CardItem>
            <CardItem cardBody>
              <Body>
                <Text style={{ marginLeft: 30, marginTop: 25 }}>{this.state.worktype}</Text>
              </Body>
            </CardItem>
            <CardItem cardBody style={{ marginTop: 20 }}>
              <Body>
                <Text>Number of People Required: {this.state.peoplenum}</Text>
              </Body>
            </CardItem>
          </Card>
          <Card style={{ height: auto }}>
            <CardItem header bordered>
              <Text style={{ fontWeight: "bold" }}>Salary</Text>
            </CardItem>
            <CardItem cardBody style={{ height: 40, marginTop: 10, marginLeft: 20 }}>
              <Body><Text>RM {this.state.salary}</Text></Body>
            </CardItem>
          </Card>
          <Card style={{ height: 200 }}>
            <CardItem header bordered>
              <Text style={{ fontWeight: "bold" }}>Date</Text>
            </CardItem>
            <CardItem cardBody>
              <Body>
                <Text>{this.state.chosenDate}</Text>
              </Body>
            </CardItem>
          </Card>
          <Card style={{ height: 250 }}>
            <CardItem header bordered>
              <Text>DATE AND LOCATION</Text>
            </CardItem>
            <CardItem cardBody>
              <Text>{chosenDate}</Text>
              <Text>{location}</Text>
            </CardItem>
          </Card>
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