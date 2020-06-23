import React, { Component } from 'react';
import { Layouts, View, StyleSheet, ScrollView, Image, TextInput, Alert, Toast, ActivityIndicator } from 'react-native';
import {

  Container,
  Header,
  Content,
  Modal,
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
//import GooglePlacesAutoComplete from 'react-native-google-places-autocomplete';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
//import Geocoder from 'react-native-geocoder-reborn';
import PlacesInput from 'react-native-places-input';
import Geolocation from '@react-native-community/geolocation';
//import storage from '@react-native-firebase/storage';
import { storage } from '../../config/firebase'
import { request, PERMISSIONS } from 'react-native-permissions';
import PropTypes from 'prop-types';

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
      lat: '',
      lng: '',
      location: { description: '' },
      chosenDate: new Date(),
      date: new Date().toString().substr(4, 12),
      isLoading: false,
      //modalVisible: false
    };
    //this.state = { chosenDate: new Date() };
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
  // setModalVisible = (visible) => {
  //   this.setState({ modalVisible: visible });
  // }

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

  setLocation = (value, details) => {
    this.setState({
      ...this.state, location: value,
      lat: details.geometry.location.lat, lng: details.geometry.location.lng
    })
    console.log("value", value)
    console.log("details", details)
  }
  // setLocation = (value, details) => {
  //   this.setState({ ...this.state, location: value })
  //   console.log("value", value)
  //   console.log("details", details)
  // }
  // setLocation = (data, details) => {
  //   this.setState({ ...this.state.location, data, details })
  // }

  // setLocation = (data, details) => {
  //   this.setState({ ...this.state, location: { data, details } })
  // }

  testData() {
    if (this.state.worktype) {
      console.log(this.state.worktype)
    }
    else {
      Alert.alert('Please enter type of work')
    }

  }

  //Return lat and long from address and update profile
  getLatLong() {
    Geocoder.geocodeAddress(this.state.location).then(res => {
      res.map((element) => {
        this.setState({
          lat: element.position.lat,
          long: element.position.lng
        },
          this.saveData) //saving data
      })
      console.log(this.state.lat);
    })
      .catch(err => console.log(err))
  }


  //optiona; data
  // saveProfile = () => {


  //   if(this.state.mName && this.state.mAdd){
  //           updateProfile(this.state.userID,this.state.mName,this.state.mAdd,this.state.lat,this.state.long)
  //   }
  //   else {
  //       Alert.alert('Status', 'Empty Field(s)!')
  //   }     
  // }


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
      const imageRef = storage.ref('thumbnails_job').child(`${appendIDToImage}`);

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
    console.log("state", this.state)
    if (this.state.jobname && this.state.uniqueId && this.state.jobdesc && this.state.worktype && this.state.salary && this.state.peoplenum && this.state.date && this.state.location && this.state.url && this.state.lat && this.state.lng) {
      if (isNaN(this.state.salary && this.state.peoplenum)) {
        Alert.alert('Status', 'Invalid Figure!');
      }
      else {
        this.uploadImage().then(firebaseUrl => {
          this.dbRef.add({
            jobname: this.state.jobname,
            uniqueId: this.state.uniqueId,
            jobdesc: this.state.jobdesc,
            worktype: this.state.worktype,
            salary: this.state.salary,
            url: firebaseUrl,
            lat: this.state.lat,
            lng: this.state.lng,
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
              url: '',
              peoplenum: '',
              time: 0,
              location: '',
            })
          });
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
    //const { modalVisible } = this.state;
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

            <Text>Location:   {this.state.location.description}</Text>
            {/* <Input onChangeText={this.getLatLong} /> */}
            <ScrollView keyboardShouldPersistTaps="handled">
              <View keyboardShouldPersistTaps="handled">

                <GooglePlacesAutocomplete
                  placeholder='Search'
                  minLength={2} // minimum length of text to search
                  autoFocus={false}
                  returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                  listViewDisplayed='auto'    // true/false/undefined
                  fetchDetails={true}
                  renderDescription={row => row.description} // custom description render
                  onPress={(data, details = null) => {
                    // this.setState({
                    //   latitude: details.geometry.location.lat,
                    //   longitude: details.geometry.location.lng,
                    // }).then(
                    //   this.setLocation(data)
                    // )
                    console.log(data, details);
                    this.setLocation(data, details);
                    //console.log(data,details);
                  }}

                  getDefaultValue={() => ''}

                  query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: 'AIzaSyDLllM - _bxchMqm1dqUIhwE54Z99EgEdqw',
                    language: 'en', // language of the results
                    types: 'geocode', // default: 'geocode'
                    components: 'country:my'

                  }}
                  styles={{
                    textInputContainer: {
                      width: '100%',

                    },
                    listView: {
                      color: 'black', //To see where exactly the list is
                      zIndex: 16, //To popover the component outwards
                      position: 'relative',
                    },

                    description: {
                      fontWeight: 'bold'
                    },
                    predefinedPlacesDescription: {
                      color: '#1faadb'
                    }
                  }}

                  currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                  currentLocationLabel="Current location"
                  //nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                  nearbyPlacesAPI='GoogleReverseGeocoding'
                  GoogleReverseGeocodingQuery={{
                    // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                  }}
                  GooglePlacesDetailsQuery={{
                    fields: 'geometry',
                  }}
                  GooglePlacesSearchQuery={{
                    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                    rankby: 'distance',
                    types: 'food'
                  }}

                  filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                  //predefinedPlaces={[homePlace, workPlace]}

                  debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                // renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
                // renderRightButton={() => <Text>Custom text after the input</Text>}
                />



              </View>
            </ScrollView>
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

            {/* <Text>Location: {this.state.location}</Text>
            <ScrollView>


            </ScrollView> */}

            {/* <PlacesInput

                googleApiKey={"AIzaSyDLllM-_bxchMqm1dqUIhwE54Z99EgEdqw"}
                placeHolder={"Search Your Working Places"}
                language={"en-US"}
                onSelect={place =>
                  console.log(place)
                  //this.setState({ place })
                  // this.props.goToPoint(get(place, 'result.geometry.location.lat'), get(place, 'result.geometry.location.lng'))
                }
                clearQueryOnSelect={true}
                keyboardShouldPersistTaps="always"
                resultRender={place => place.description}
                //queryCountries={['sg', 'my']}
                //queryCountries={['pl', 'fr']}
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
                  this.setLocation(data, details);
                  //console.log(data,details);
                }}
                query={{
                  key: 'AIzaSyCz2vqdCuzXmMZ10CT21J_xe0GrfLEqIGg',
                  language: 'en',
                  components: 'country: my'
                }}
                keyboardShouldPersistTaps="always"
                listViewDisplayed={false}
                fetchDetails={true}
                returnKeyType={'search'}
                minLength={2}
                fetchDetails={true}
                autofocus={true}
                renderDescription={row => row.description}

                getDefaultValue={() => ''}
                currentLocation={true}
                nearbyPlacesAPI="GooglePlacesSearch"
                GooglePlacesSearchQuery={{
                  rankby: 'distance',
                  types: 'restaurant'
                }}
                GooglePlacesDetailsQuery={{
                  fields: 'formatted_address'
                }}
                filterReverseGeocodingByTypes={[
                  'locality',
                  'administrative_area_level_3'
                ]}
                debounce={200}
                fetchDetailscurrentLocationLabel='Current Location'

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
              /> */}


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