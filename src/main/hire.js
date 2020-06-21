import React, { Component } from 'react';
import { Alert, ActivityIndicator, StyleSheet } from 'react-native';
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
  Separator,
  Button
} from 'native-base';
import { signOut } from '../screen/auth/googlelogin'
import { ScrollView } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
//import SplashScreen from 'react-native-splash-screen';

//get user data
const User = auth().currentUser;

export default class Hire extends Component {

  constructor() {
    super();
    //  this.applicationRef = firestore().collection('Job').doc(User).collection('Hire');
    this.state = {
      hire: [],
      isLoading: true,
      show: true,
      username: null,
      jobname: null,
      jobposition: null,

    };
  }

  // componentDidMount() {
  //   this.unsubscribe = this.applicationRef.onSnapshot(this.getCollection);
  // }


  // componentWillUnmount() {
  //   this.unsubscribe();
  // }

  // getCollection = (querySnapshot) => {
  //   const hire = [];
  //   querySnapshot.forEach((res) => {
  //     const { jobname, uniqueId, jobdesc, worktype, salary, peoplenum, chosenDate, time, location } = res.data();
  //     hire.push({
  //       key: res.id,
  //       res,
  //       jobname,
  //       uniqueId,
  //       jobdesc,
  //       worktype,
  //       salary,
  //       peoplenum,
  //       chosenDate,
  //       time,
  //       location
  //     });
  //   });
  //   this.setState({
  //     jobs,
  //     isLoading: false
  //   })
  // }



  // componentDidMount() {
  //   SplashScreen.hide();
  // }

  static navigationOptions = {
    title: 'Hire',
    headerRight: (
      <Button
        title='Log Out'
        onPress={() => this.signOut()} />

    ),
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

  // hireWork = () => {
  //   if (this.state.jobname && this.state.jobdesc && this.state.worktype && this.state.salary && this.state.peoplenum && this.state.chosenDate && this.state.location) {
  //     if (isNaN(this.state.salary)) {
  //       Alert.alert('Status', 'Invalid Figure!');
  //     }
  //     else {
  //       if (addJob(this.state.jobname, this.state.jobdesc, this.state.worktype, this.state.salary, this.state.peoplenum, this.state.chosenDate, this.state.location)) {
  //         <Dialog
  //           onTouchOutside={() => {
  //             this.setState({ scaleAnimationDialog: false });
  //           }}
  //           width={0.9}
  //           visible={this.state.scaleAnimationDialog}
  //           dialogAnimation={new ScaleAnimation()}
  //           onHardwareBackPress={() => {
  //             console.log('onHardwareBackPress');
  //             this.setState({ scaleAnimationDialog: false });
  //             return true;
  //           }}
  //           dialogTitle={
  //             <DialogTitle
  //               title="Job "
  //               hasTitleBar={false}
  //             />
  //           }
  //           actions={[
  //             <DialogButton
  //               text="DISMISS"
  //               onPress={() => {
  //                 this.setState({ scaleAnimationDialog: false });
  //               }}
  //               key="button-1"
  //             />,
  //           ]}>
  //           <DialogContent>
  //             <View>
  //               <Text>
  //                 You Have Successfully Post A New Job!
  //                </Text>
  //               <Button
  //                 title="Close"
  //                 onPress={() => {
  //                   this.setState({ scaleAnimationDialog: false });
  //                 }}
  //                 key="button-1"
  //               />
  //             </View>
  //           </DialogContent>
  //         </Dialog>
  //       }
  //     }
  //   } else {
  //     Alert.alert('Status', 'Empty Field(s)!');
  //   }
  // }

  render() {
    // if (this.state.isLoading) {
    //   return (
    //     <View style={styles.preloader}>
    //       <ActivityIndicator size="large" color="#9E9E9E" />
    //     </View>
    //   )
    // }
    return (
      <Container>
        <ScrollView>


          <Container>
            <Content >

              <Separator>
                <Text style={{ alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>List Of Hires</Text>
              </Separator>


              <Card style={{ marginBottom: 5 }}>
                <CardItem header bordered>
                  <Text>System Development</Text>
                </CardItem>
                <CardItem bordered button onPress={() => this.props.navigation.navigate('HireOverview')}>
                  <Left>
                    <Thumbnail source={require('../img/kambing.jpg')} />
                    <Body>
                      <Text>Hassan</Text>
                      <Text note>PHP</Text>
                      <Text note>Building Likes System</Text>
                    </Body>
                  </Left>
                  <Right>
                    <Button success onPress={() => { this.hireWork }}>

                      <Text>Hire</Text>
                    </Button>
                  </Right>
                </CardItem>

                <CardItem bordered>
                  <Left>
                    <Thumbnail source={require('../img/kambing.jpg')} />
                    <Body>
                      <Text>Faris</Text>
                      <Text note>PHP</Text>
                      <Text note>Building Comment System</Text>
                    </Body>
                  </Left>
                  <Right>
                    <Button success>
                      <Text>Hire</Text>
                    </Button>
                  </Right>
                </CardItem>
              </Card>

              <Card>
                <CardItem header bordered>
                  <Text>Backend Development</Text>
                </CardItem>
                <CardItem bordered>
                  <Left>
                    <Thumbnail source={require('../img/kambing.jpg')} />
                    <Body>
                      <Text>Hassan</Text>
                      <Text note>Firebase</Text>
                      <Text note>Build Realtime Database System</Text>
                    </Body>
                  </Left>
                  <Right>
                    <Button success>
                      <Text>Hire</Text>
                    </Button>
                  </Right>
                </CardItem>

                <CardItem bordered>
                  <Left>
                    <Thumbnail source={require('../img/kambing.jpg')} />
                    <Body>
                      <Text>Faris</Text>
                      <Text note>PHP</Text>
                      <Text note>Building Comment System</Text>
                    </Body>
                  </Left>
                  <Right>
                    <Button success>
                      <Text>Hire</Text>
                    </Button>
                  </Right>
                </CardItem>
              </Card>

            </Content>


          </Container>
        </ScrollView>

        <Fab style={{ backgroundColor: '#66cd00', borderRadius: 50 }} onPress={() => this.props.navigation.navigate('UploadJob')}>

          <Text style={{ fontColor: '#000000', fontSize: 9 }}>
            Request
          </Text>
        </Fab>

      </Container>
    );
  }
}
