import React, {Component} from 'react';
import {StyleSheet, ScrollView, Image} from 'react-native';
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
    Button } from 'native-base';
import ProgressBar from 'react-native-progress/Bar';
import * as Progress from 'react-native-progress';


  export default class HireProgress extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        progress: 0,
        indeterminate: true,
      };
    }
  
    componentDidMount() {
      this.animate();
    }
  
    animate() {
      let progress = 0;
      this.setState({ progress });
      setTimeout(() => {
        this.setState({ indeterminate: false });
        setInterval(() => {
          progress += Math.random() / 5;
          if (progress > 1) {
            progress = 1;
          }
          this.setState({ progress });
        }, 500);
      }, 1500);
    }
  
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>Progress Example</Text>
          <Progress.Bar
            style={styles.progress}
            progress={this.state.progress}
            indeterminate={this.state.indeterminate}
          />


        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingVertical: 20,
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    circles: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    progress: {
      margin: 10,
    },
  });
  