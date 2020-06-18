import React, { Component } from 'react';
import { SafeAreaView, View, Text, Image } from 'react-native';
import { Button } from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import Hire from './src/main/hire';
import Search from './src/main/search';
import Progress from './src/main/progress';
import Profile from './src/main/profile';
import Notification from './src/drawer/notifications';
import Payment from './src/drawer/payment';
import Account from './src/drawer/account_settings';
//import Inbox from './src/screen/drawer/Inbox';
import UploadJob from './src/screen/job_post/UploadJob';
import TaskList from './src/components/task/task';
import UploadSuccess from './src/screen/job_post/UploadSuccess';
import UserProfile from './src/screen/user_profile/UserProfile';
import HireDetails from './src/screen/Hire/HireDetails';
import HireOverview from './src/screen/Hire/HireOverview';
import Icon from 'react-native-vector-icons/Ionicons';
import PaidNow from './src/screen/billing/PaidNow';
import ViewCalendar from './src/screen/ViewCalendar';
import MyJob from './src/screen/job_post/myorder';
import ProgressList from './src/screen/progress/ProgressList';
import PaymentMethod from './src/screen/billing/PaymentMethod';
import PaymentDetails from './src/screen/billing/PaymentDetails';
import MyOrderDetail from './src/screen//job_post/MyOrderDetail';
import JobSettings from './src/screen/job_post/JobSettings';
import OnGoingJob from './src/screen/user_profile/OnGoingJob';
import AvailabilityView from './src/screen/user_profile/availabilityView';
import JobComplete from './src/screen/user_profile/jobComplete';
import GoogleLogin from './src/screen/auth/googlelogin';
import Loading from './src/loading';

const DashboardTabNavigator = createBottomTabNavigator(
  {
    Hire: Hire,
    Progress: Progress,
    Search: Search,
    Profile: Profile
  },

  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName,

        // headerRight: () =>
        //   <Button
        //     title='Log Out'
        //     onPress={() => this.signOut()} />
      };
    }
  }
);
const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: DashboardTabNavigator,
    PaymentDetails: PaymentDetails,
    UserProfile: UserProfile,
    HireDetails: HireDetails,
    ProgressList: ProgressList,
    //HireProgress: HireProgress,
    UploadJob: UploadJob,
    MyJob: MyJob,
    UploadSuccess: UploadSuccess,
    PaymentMethod: PaymentMethod,
    JobSettings: JobSettings,
    PaidNow: PaidNow,
    HireOverview: HireOverview,
    ViewCalendar: ViewCalendar,
    MyOrderDetail: MyOrderDetail,
    JobComplete: JobComplete,
    OnGoingJob: OnGoingJob,
    AvailabilityView: AvailabilityView,
    TaskList: TaskList,
    GoogleLogin: GoogleLogin
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: () =>
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />



      };
    }
  }
);

const CustomDrawerContentComponent = (props) => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{ height: 150, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
      <Image source={require('./src/img/dude.jpg')} style={{ height: 120, width: 120, borderRadius: 60 }} />
    </View>
    <View style={{ justifyContent: 'center', alignItems: 'center', fontSize: 20, fontWeight: 'bold' }}>
      <Text style={{ justifyContent: 'center', alignItems: 'center', fontSize: 20, fontWeight: 'bold' }}>
        Hamzah
    </Text>
    </View>
    <View>
      <DrawerItems {...props} />
    </View>
  </SafeAreaView>
)

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: DashboardStackNavigator
  },
  Notification: {
    screen: Notification
  },
  Billing: {
    screen: Payment
  },
  // Messaging:{
  //   screen: Inbox
  // },
  Settings: {
    screen: Account
  },


},
  {
    contentComponent: CustomDrawerContentComponent
  });



const AppSwitchNavigator = createSwitchNavigator({
  //Login: { screen: Login},
  //Welcome: { screen: WelcomeScreen },
  Loading: { screen: Loading },
  Dashboard: { screen: AppDrawerNavigator }
});

export default AppContainer = createAppContainer(AppSwitchNavigator);