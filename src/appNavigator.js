import React from 'react';
import { View, Share, Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Main from './Main';
import ImageDetail from './ImageDetail';
import ImageSearch from './ImageSearch';
onShare = async navigation => {
  try {
    const result = await Share.share({
      message: navigation.state.params.urls.full
    });
  } catch (error) {
    alert(error.message);
  }
};

const MainNavigator = createStackNavigator({
  Main: {
    screen: Main,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'WALLPAPERs',
      headerTitleStyle: {
        textAlign: 'center',
        fontFamily: Platform.OS === 'android' ? 'sans-serif-condensed' : null,
        fontSize: 18,
        fontWeight: '200',
        flex: 1,
        backgroundColor: 'white'
      },
      headerLeft: <View></View>,
      headerRight: (
        <View style={{ marginRight: 10 }}>
          <Icon2
            name={'theme-light-dark'}
            size={20}
            style={{ color: 'black' }}
            onPress={() => this.toggleTheme()}
          ></Icon2>
        </View>
      )
    })
  },
  ImageDetail: {
    screen: ImageDetail,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: 'black'
      },
      headerTitle: navigation.state.params.user.name,
      headerTitleStyle: {
        color: 'white',
        textAlign: 'center',
        fontFamily:
          Platform.OS === 'ios' ? 'ChalkboardSE-Light' : 'sans-serif-light',
        fontSize: 18,
        fontWeight: '200',
        flex: 1
      },
      headerLeft: (
        <Icon
          name="chevron-left"
          size={40}
          style={{ color: 'white' }}
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),

      headerRight: (
        <View style={{ marginRight: 10 }}>
          <Icon
            name={Platform.OS === 'android' ? 'share-google' : 'share-apple'}
            size={30}
            style={{ color: 'white' }}
            onPress={() => this.onShare(navigation)}
          ></Icon>
        </View>
      )
    })
  },
  ImageSearch: {
    screen: ImageSearch,
    navigationOptions: ({ navigation }) => ({
      headerTitle: navigation.state.params,
      headerStyle: {
        backgroundColor: 'white'
      },
      headerTitleStyle: {
        color: 'black',
        textAlign: 'center',
        fontFamily:
          Platform.OS === 'ios' ? 'ChalkboardSE-Light' : 'sans-serif-light',
        fontSize: 18,
        fontWeight: '200',
        flex: 1
      },
      headerLeft: (
        <Icon
          name="chevron-left"
          size={40}
          style={{ color: 'black' }}
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: <View></View>
    })
  }
});

const AppNavigator = createAppContainer(MainNavigator);

export default AppNavigator;
