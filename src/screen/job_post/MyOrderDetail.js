import React, { Component } from 'react';
//import { removeStudent } from '../services/DataService';
import { Alert, View, Image, StyleSheet, Dimensions } from 'react-native';
import { Container, auto, Content, Footer, FooterTab, Body, Button, Icon, Text, List, Header, Card, CardItem } from 'native-base';
import { db } from '../../config/firebase';
import JobList from '../../components/chat/JobList';
import MapView,
{ PROVIDER_GOOGLE, Marker, Callout, Polygon, Circle }
  from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';

//let job = db.ref('/Job');

export default class MyOrderDetail extends Component {
  constructor() {
    super();
    this.state = {
      jobs: [],
      jobname: null,
      jobdesc: null,
      salary: null,
      peoplenum: null,
      time: null,
      worktype: null,
      location: null,
      url: null
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

  componentDidMount() {
    const detailRef = firestore().collection('Application').doc(this.props.navigation.state.params.userkey);
    detailRef.get().then((res) => {
      if (res.exists) {
        const job = res.data();
        this.setState({
          key: res.id,
          jobname: job.jobname,
          jobdesc: job.jobdesc,
          salary: job.salary,
          peoplenum: job.peoplenum,
          chosenDate: job.time,
          worktype: job.worktype,
          lat: job.lat,
          lng: job.lng,
          location: job.location,
          url: job.url
        });
      } else {
        console.log("Whoops! Document does not exists");
      }
    })
  }

  //var key = Object.keys(snapshot.val())[0];

  // componentDidMount() {
  //   //this._isMounted = true;
  //   //  if(this._isMounted){
  //   let query = job.orderByChild("uniqueId").equalTo(uniqueId);
  //   query.on('value', (snapshot) => {
  //     let key = snapshot.key;
  //     let data = snapshot.val();
  //     if (data) {
  //       //let id = Object.keys(data)[0];
  //       let firebaseData = Object.values(data);
  //       //key = Object.keys(data)[0];
  //       // if(this._isMounted){
  //       if (key) {
  //         this.setState({ jobs: firebaseData }, () => {
  //           this.state.jobs.map((element) => {
  //             this.setState({
  //               jobname: element.jobname,
  //               jobdesc: element.jobdesc,
  //               uniqueId: element.uniqueId,
  //               salary: element.salary,
  //               peoplenum: element.peoplenum,
  //               worktype: element.worktype,
  //               chosenDate: element.chosenDate,
  //               location: element.location,
  //             });
  //           });
  //         });
  //       }
  //       // }

  //     }
  //   });
  //   //    }

  // }
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



  //const { uniqueId, jobname, jobdesc, worktype, salary, peoplenum, chosenDate, location } = this.props.navigation.getParam;

  // const Job = this.props.navigation.getParam('job');

  //const ApplicantID = this.props.uniqueId;
  // const jobName = this.props.jobname;
  // const JobDesc = this.props.jobdesc;
  // const WorkType = this.props.worktype;
  // const Salary = this.props.salary;
  // const PeopleNum = this.props.peoplenum;
  // const WorkDate = this.props.chosenDate;
  // const WorkPlace = this.props.location;
  render() {
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
              <Text style={{ textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20 }} >{this.state.jobname}</Text>

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
          <Card style={{ height: 200 }}>
            <CardItem header bordered>
              <Text style={{ fontWeight: "bold" }}>Main image</Text>
            </CardItem>
            <CardItem cardBody>
              <Body>
                <Image source={this.state.url} />
              </Body>
            </CardItem>
          </Card>
          <Card style={{ height: 250 }}>
            <CardItem header bordered>
              <Text style={{ fontWeight: "bold" }}>LOCATION</Text>
            </CardItem>
            <CardItem header >
              <Text style={{ fontWeight: "bold" }}>{this.state.location}</Text>
            </CardItem>
            <CardItem cardBody>
              <Container style={styles.container}>

                <MapView
                  provider={PROVIDER_GOOGLE}
                  ref={map => this._map = map}
                  showsUserLocation={true}
                  liteMode={true}
                  style={styles.map}
                >



                  <Marker
                    draggable
                    coordinate={{ latitude: this.state.lat, longitude: this.state.lng }}
                  >

                  </Marker>
                  {/* {
            this.state.coordinates.map((marker, index) => (
              <Marker
                key={marker.name}
                ref={ref => this.state.markers[index] = ref}
                onPress={() => this.onMarkerPressed(marker, index)}
                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              >
                <Callout>
                  <Text>{marker.name}</Text>
                </Callout>

                  </Marker>
                   ))
                  } */}
                </MapView>
              </Container>
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
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    height: 200,
    // disabledwidth: 100,
    width: Dimensions.get('window').width,
    //...StyleSheet.absoluteFillObject
  },
});

//this is for realtime db
//<Container>
//<Header>
//   <View style={{ marginTop: 25, marginEnd: 350 }}>
//     <Icon style={{ color: 'white' }} name="md-menu" onPress={() => this.props.navigation.openDrawer()} />
//   </View>
// </Header>

//<Content padder>
  //<Card>
    //<CardItem bordered header>
      //<Text style={{ textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20 }} uniqueId={uniqueId}>{this.state.jobname}</Text>

    //</CardItem>
    //<CardItem bordered>

      //<Text style={{ height: 30, fontWeight: "bold", marginTop: 20, marginBottom: 20 }}>{this.state.uniqueId}</Text>

    //</CardItem>
  //</Card>
  //<Card>
    //<CardItem bordered header>

      //<Text style={{ justifyContent: "center", fontWeight: "bold" }}>Job Description</Text>

    //</CardItem>
    //<CardItem bordered cardBody>
      //<Body style={{ flex: 1, justifyContent: 'center', height: 250, marginLeft: 20 }}>
        //<Text>{this.state.jobdesc}</Text>
      //</Body>
    //</CardItem>
  //</Card>
  // <CardItem>   
    //         <Text style={{marginTop: 5, marginBottom: 5}}>Creative World Industries</Text>
      //  </CardItem> 



 // <Card style={{ height: 200 }}>
    //<CardItem header bordered>
    //  <Text style={{ fontWeight: "bold" }}>Requirement</Text>
  //  </CardItem>
   // <CardItem cardBody>
   //   <Body>
      //  <Text style={{ marginLeft: 30, marginTop: 25 }}>{this.state.worktype}</Text>
    //  </Body>
   // </CardItem>
  //  <CardItem cardBody style={{ marginTop: 20 }}>
     // <Body>
     //   <Text>Number of People Required: {this.state.peoplenum}</Text>
    //  </Body>
   // </CardItem>
 // </Card>
  //<Card style={{ height: auto }}>
    //<CardItem header bordered>
      //<Text style={{ fontWeight: "bold" }}>Salary</Text>
   // </CardItem>
  //  <CardItem cardBody style={{ height: 40, marginTop: 10, marginLeft: 20 }}>
     // <Body><Text>RM {this.state.salary}</Text></Body>
  //  </CardItem>
  //</Card>
  //<Card style={{ height: 200 }}>
    //<CardItem header bordered>
     // <Text style={{ fontWeight: "bold" }}>Date</Text>
   // </CardItem>
    //<CardItem cardBody>
     // <Body>
      //  <Text>{this.state.chosenDate}</Text>
     // </Body>
   // </CardItem>
 // </Card>
 // <Card style={{ height: 250 }}>
   // <CardItem header bordered>
     // <Text>DATE AND LOCATION</Text>
   // </CardItem>
   // <CardItem cardBody>
   //   <Text>{chosenDate}</Text>
    //  <Text>{location}</Text>
   // </CardItem>
 // </Card>
//</Content>



//<Footer>
  //<FooterTab>
  //  <Button vertical onPress={() => { this.props.navigation.navigate('UploadJob') }}>
   //   <Icon name="md-briefcase" />
   //   <Text>New Job</Text>
  //  </Button>
 // </FooterTab>
//</Footer>

//</Container>
  //  );
  //}
//}