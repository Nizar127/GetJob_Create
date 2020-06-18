import React, { Component } from 'react';
import { Alert } from 'react-native';
import { removeJob } from '../../service/DataService'
import { Text, ListItem, Left, Right, Icon } from 'native-base';
import PropTypes from 'prop-types';

export default class JobList extends Component {

  static propTypes = {
    jobs: PropTypes.array.isRequired
  };

  //    onPress = (matricno) => {
  //     this.props.onPress(matricno);
  //   }

  //   onLongPress = (matricno) => {
  //     this.props.onLongPress(matricno);
  //   }

  onPress = (jobname, uniqueId, jobdesc, worktype, salary, peoplenum, chosenDate, location) => {
    this.props.onPress(jobname, uniqueId, jobdesc, worktype, salary, peoplenum, chosenDate, location);
  }

  deleteConfirmation = (jobname) => {
    Alert.alert(
      'Status',
      'Are you sure you want to delete this Job?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => removeJob(jobname) }
      ],
      { cancelable: false }
    );
  }

  render() {
    return (
      this.props.jobs.map((data, index) => {
        return (
          <ListItem key={index} onLongPress={(jobname) => { this.deleteConfirmation(jobname) }} onPress={() => this.onPress(data.jobname, data.uniqueId, data.jobdesc, data.worktype, data.salary, data.peoplenum, data.chosenDate, data.location)}>
            <Left>
              <Text>{data.jobname}</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
        )
      })
    )
  }
}