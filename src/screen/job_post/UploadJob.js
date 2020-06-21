import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Image, TextInput, Alert, Toast, ActivityIndicator } from 'react-native';
import {
  Container,
  Header,
  Content,

  Form,
  Item,
  Input,
  Label,
  Card,
  Right,
  auto,
  CardItem,
  CardBody,
  Thumbnail,
  Text,
  Icon,
  Picker,
  DatePicker,
  Footer,
  FooterTab,
  Button
} from 'native-base';
//import { addJob, addApplicant } from '../../service/DataService';
//import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
import GooglePlacesAutoComplete from 'react-native-google-places-autocomplete';
//import PlacesInput from 'react-native-places-input';
import Geolocation from '@react-native-community/geolocation';
//import storage from '@react-native-firebase/storage';
import { storage } from '../../config/firebase'
import { request, PERMISSIONS } from 'react-native-permissions';


const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob;

export default class UploadJob extends Component {
  constructor() {
    super();
    this.dbRef = firestore().collection('Job_list');
    this.state = {
      jobname: '',
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
      isLoading: false

    };
    this.state = { chosenDate: new Date() };
    this.setDate = this.setDate.bind(this);
    this.selectWorkType = this.selectWorkType.bind(this);
    this.pickImage = this.pickImage.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.testData = this.testData.bind(this);

    this.saveData = this.saveData.bind(this);
    // state = { ScaleAnimation: false };

    this.state.date = this.state.chosenDate.toString().substr(4, 12);

  }

  // componentWillMount() {
  //   Geolocation.setRNConfiguration(config);
  // }

  requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      console.log('iPhone: ' + response);

      if (response === 'granted') {
        this.locateCurrentPosition();
      }
    } else {
      var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log('Android: ' + response);

      if (response === 'granted') {
        this.locateCurrentPosition();
      }
    }
  }

  locateCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(JSON.stringify(position));

        let initialPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035
        }

        this.setState({ initialPosition });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
    )
  }

  setJobName = (value) => {
    this.setState({ jobname: value })
  }

  setUniqueId = (value) => {
    this.setState({ uniqueId: value })
  }

  setJobDesc = (value) => {
    this.setState({ jobdesc: value })
  }

  selectWorkType = (value) => {
    this.setState({
      worktype: value
    })
  }

  setSalary = (value) => {
    this.setState({ salary: value })
  }

  setPeopleNum = (value) => {
    this.setState({ peoplenum: value })
  }

  selectTime = (value) => {
    this.setState({ time: value })
  }

  setDate(newDate) {
    this.setState({ date: newDate.toString().substr(4, 12) });
  }

  setLocation = (value) => {
    this.setState({ location: value })
  }

  testData() {
    if (this.state.worktype) {
      console.log(this.state.worktype)
    }
    else {
      Alert.alert('Please enter type of work')
    }

  }

  //Pick Image from camera or library
  pickImage() {
    ImagePicker.openPicker({
      width: 300,
      height: 180,
      cropping: true
    }).then(image => {
      this.setState({
        url: image.path,
        imageType: image.mime
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  //Upload image to Firebase storage
  uploadImage() {

    return new Promise((resolve, reject) => {
      let uploadBlob = null;
      const appendIDToImage = new Date().getTime();
      const imageRef = storage.ref('thumbnails').child(`${appendIDToImage}`);

      fs.readFile(this.state.url, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${this.state.imageType};BASE64` })
        })
        .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: this.state.imageType })
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          resolve(url)
          console.log(url)
          this.dbRef.doc(this).update({ url: url })
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  saveData = () => {
    if (this.state.jobname && this.state.uniqueId && this.state.jobdesc && this.state.worktype && this.state.salary && this.state.peoplenum && this.state.date && this.state.location && this.state.url) {
      if (isNaN(this.state.salary && this.state.peoplenum)) {
        Alert.alert('Status', 'Invalid Figure!');
      }
      else {
        this.dbRef.add({
          jobname: this.state.jobname,
          uniqueId: this.state.uniqueId,
          jobdesc: this.state.jobdesc,
          worktype: this.state.worktype,
          salary: this.state.salary,
          peoplenum: this.state.peoplenum,
          chosenDate: this.state.date,
          location: this.state.location,
        }).then((res) => {
          this.setState({
            jobname: '',
            uniqueId: '',
            jobdesc: '',
            worktype: '',
            salary: '',
            peoplenum: '',
            time: 0,
            location: '',
          }); this.uploadImage();
          Alert.alert('Your Job Has Been Posted', 'Please Choose',
            [
              {
                text: "Return To Main Screen",
                onPress: () => this.props.navigation.navigate('Hire')
              },
              {
                text: "View Current Job Posted",
                onPress: () => this.props.navigation.navigate('MyJob')
              }
            ], { cancelable: false }
          );
        })
        //addJob(this.state.jobname, this.state.uniqueId, this.state.jobdesc, this.state.worktype, this.state.salary, this.state.peoplenum, this.state.date, this.state.location);
        //addApplicant(this.state.jobname, this.state.uniqueId, this.state.jobdesc, this.state.worktype, this.state.salary, this.state.peoplenum, this.state.date, this.state.location);


      }
    } else {
      Alert.alert('Status', 'Empty Field(s)!');
    }
  }

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
        <Content padder>
          <Text style={{ textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20 }}>Details</Text>
          <Form>
            <Item fixedLabel last>
              <Label>Job Name</Label>
              <Input onChangeText={this.setJobName} />
            </Item>
            <Item fixedLabel last>
              <Label>Unique Id</Label>
              <Input onChangeText={this.setUniqueId} />
            </Item>
            <Item fixedLabel last>
              <Label>Job Description</Label>
              <Input onChangeText={this.setJobDesc} />
            </Item>
            <Item fixedLabel picker last>
              <Label>Work Type</Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                style={{ width: undefined }}
                placeholder="Select Type of Job"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.worktype}
                onValueChange={this.selectWorkType.bind(this)}
                Title="Work Type"
              >
                <Picker.Item label="Select Work Type" value={null} />
                <Picker.Item label="Urgent" value="Urgent" />
                <Picker.Item label="Part-Time" value="Part-Time" />
                <Picker.Item label="Contract" value="Contract" />
                <Picker.Item label="Freelance" value="Freelance" />
                <Picker.Item label="Milestones" value="Milestones" />
                <Picker.Item label="Hire As You Need" value="HireNeed" />
              </Picker>
            </Item>

            <Item fixedLabel>
              <Label>Add Image</Label>
              <Button block iconLef style={{ backgroundColor: '#1B6951' }}
                onPress={this.pickImage}>
                <Icon name="md-image" />
                <Text style={{ textAlign: 'center' }}>Change Thumbnail</Text>
              </Button>
            </Item>


            <Image
              source={{ uri: this.state.url }}
              style={{
                height: 150, width: null, flex: 1,
                borderTopLeftRadius: 10, borderTopRightRadius: 10
              }}
            />

            <Item fixedLabel last>
              <Label>Salary</Label>
              <Input onChangeText={this.setSalary} />
            </Item>

            <Item fixedLabel last>
              <Label>Number of People</Label>
              <Input onChangeText={this.setPeopleNum} />
            </Item>

            <DatePicker
              defaultDate={new Date()}
              minimumDate={new Date()}
              maximumDate={new Date(2030, 12, 31)}
              locale={"en"}
              date={this.state.setDate}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="Select date"
              textStyle={{ color: "green" }}
              placeHolderTextStyle={{ color: "#d3d3d3" }}
              onDateChange={this.setDate}
              disabled={false}
            />
            <Text>
              Date: {this.state.date}
            </Text>

            <Text>Location: {this.state.location}</Text>
            <View>
              <GooglePlacesAutoComplete
                placeholder='Search Your Working Places'
                onPress={(data, details = null) => {
                  // this.setState({
                  //   latitude: details.geometry.location.lat,
                  //   longitude: details.geometry.location.lng,
                  // }).then(
                  //   this.setLocation(data)
                  // )
                  console.log(data, details);
                  this.setLocation(data);
                  //console.log(data,details);
                }}
                query={{
                  key: 'AIzaSyDLllM-_bxchMqm1dqUIhwE54Z99EgEdqw',
                  language: 'en',
                  components: 'country: my'
                }}
                keyboardShouldPersistTaps="always"
                // listViewDisplayed="auto"
                // returnKeyType={'search'}
                // minLength={2}
                // fetchDetails={true}
                // autofocus={true}
                // renderDescription={row => row.description}

                // getDefaultValue={() => ''}
                // currentLocation={true}
                // nearbyPlacesAPI="GooglePlacesSearch"
                // GooglePlacesSearchQuery={{
                //   rankby: 'distance',
                //   types: 'restaurant'
                // }}
                // GooglePlacesDetailsQuery={{
                //   fields: 'formatted_address'
                // }}
                // filterReverseGeocodingByTypes={[
                //   'locality',
                //   'administrative_area_level_3'
                // ]}
                debounce={200}
                currentLocationLabel='Current Location'
                listViewDisplayed="false"
                styles={{
                  textInputContainer: {
                    width: '100%',
                    height: 70,
                    backgroundColor: "rgba(0,0,0,0)",
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                  },
                  textInput: {
                    marginLeft: 0,
                    marginRight: 0,
                    height: 38,
                    width: 50,
                    color: "#5d5d5d",
                    fontSize: 16,
                  },
                  listView: {
                    top: 50,
                    borderColor: '#dedede',
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    left: -1,
                    right: -1
                  },
                  predefinedPlacesDescription: {
                    color: "#1faadb",
                  },
                }}
              />
            </View>

            {/* <PlacesInput
              googleApiKey={"AIzaSyDLllM-_bxchMqm1dqUIhwE54Z99EgEdqw"}
              placeHolder={"Search Your Working Places"}
              language={"en-US"}
              onSelect={place =>
                this.setState({ place })
                // this.props.goToPoint(get(place, 'result.geometry.location.lat'), get(place, 'result.geometry.location.lng'))
              }
              keyboardShouldPersistTaps="always"
              queryCountries={['sg', 'my']}
              queryTypes="address"
              onChangeText={this.setLocation}
              stylesContainer={{
                position: 'relative',
                alignSelf: 'stretch',
                margin: 0,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                shadowOpacity: 0,
                borderColor: '#dedede',
                borderWidth: 1,
                marginBottom: 10
              }}
              stylesList={{
                top: 50,
                borderColor: '#dedede',
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderBottomWidth: 1,
                left: -1,
                right: -1
              }}
            /> */}
            {/* 
           




            {/* <Text>Location: {this.state.location}</Text> */}
            {/*               <Input onChangeText={this.setLocation} /> 
 */}



          </Form>

          <Button block success last style={{ marginTop: 50 }} onPress={this.saveData.bind(this)}>
            <Text style={{ fontWeight: "bold" }}>Hire Now</Text>
          </Button>
        </Content>

        <Footer>
          <FooterTab>
            <Button vertical onPress={() => this.props.navigation.navigate('hire')}>
              <Icon name="home" />
              <Text>Home</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>


    );
  }
}

const styles = StyleSheet.create({

  button: {
    backgroundColor: 'white',
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2
  },
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: 'rgba(0,0,0,0.2)'
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