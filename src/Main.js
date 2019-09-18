import React, { Fragment, useState, useEffect, Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import Masonry from 'react-native-masonry';
import axios from 'axios';
import Unsplash from 'unsplash-js/native';
import getImages from './store/actions/getImages';
import Icon from 'react-native-vector-icons/EvilIcons';
import LinearGradient from 'react-native-linear-gradient';

const Main = props => {
  unsplash = new Unsplash({
    applicationId:
      'a87ce2969e51acf89894a8aa76db4b33676e40cf54dfacd3f073fd202639f2a9',
    secret: '42bf2aabc7a456a2df87307909e4f22fb6809cd6599014133dcb26d6f38d8a42'
  });
  useEffect(() => {
    props.getImages();
    console.log('images reducer', props.images);
  }, []);

  const randomHeight = [250, 300, 400];
  const randomWidth = [400, 500, 800, 300];
  const [searchQuery, setSearchQuery] = useState('');

  function endReached() {
    console.log('endReached');
    // props.getImages();
  }

  function handleClick(index, item) {
    console.log('handleClick', index, item);
    props.navigation.navigate('ImageDetail', item);
  }

  function onSearch(text) {
    setSearchQuery(text);
  }

  function onSearchSubmit() {
    console.log('searchQuery', searchQuery);
    props.navigation.navigate('ImageSearch', searchQuery);
    setSearchQuery('');
  }
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => console.log('statusbar onPress')}>
        <StatusBar barStyle="default" />
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          top: 20,
          backgroundColor: 'transparent',
          borderColor: 'white',
          borderWidth: 1,
          borderRadius: 30,
          width: '80%',
          height: 40,
          alignSelf: 'center',
          zIndex: 10002
        }}
      >
        <Icon
          name="search"
          size={30}
          style={{
            color: 'white',
            flex: 0.1,
            marginLeft: 10,
            alignSelf: 'center'
          }}
        ></Icon>
        <TextInput
          style={{
            height: 40,
            textAlign: 'left',
            flex: 0.9,
            fontFamily:
              Platform.OS === 'android' ? 'sans-serif-condensed' : null,
            color: 'white',
            alignSelf: 'center'
          }}
          onChangeText={text => {
            onSearch(text);
          }}
          value={searchQuery}
          placeholder={'Search photos'}
          placeholderTextColor={'white'}
          onSubmitEditing={() => onSearchSubmit()}
        />
      </View>

      <View>
        <FlatList
          // ref="listRef"
          data={props.images}
          onEndReachedThreshold={0.5}
          onEndReached={() => endReached()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={1}
              style={{
                height: 600,
                // randomHeight[Math.floor(Math.random() * randomHeight.length)],
                width: '100%'
                // randomWidth[Math.floor(Math.random() * randomWidth.length)]
              }}
              onPress={() => handleClick(index, item)}
            >
              <FastImage
                source={{
                  uri: item.urls.regular
                }}
                style={{
                  height: '100%',
                  width: '100%'
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: 15,
                  left: 15
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontFamily: Platform.OS === 'android' ? 'Roboto' : null,
                    fontSize: 13,
                    fontWeight: '200'
                  }}
                >
                  {item.user.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
  //   }
};

const mapStateToProps = state => {
  return {
    images: state.images.allImages
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getImages: () => dispatch(getImages())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
