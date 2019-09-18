import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import getImages from './store/actions/getImages';
import Icon from 'react-native-vector-icons/EvilIcons';

const Main = props => {
  useEffect(() => {
    props.getImages();
  }, []);

  const [searchQuery, setSearchQuery] = useState('');

  function endReached() {
    // props.getImages();
  }

  function handleClick(index, item) {
    props.navigation.navigate('ImageDetail', item);
  }

  function onSearch(text) {
    setSearchQuery(text);
  }

  function onSearchSubmit() {
    props.navigation.navigate('ImageSearch', searchQuery);
    setSearchQuery('');
  }
  return (
    <SafeAreaView>
      <StatusBar barStyle="default" />

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
          data={props.images}
          onEndReachedThreshold={0.5}
          onEndReached={() => endReached()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={1}
              style={{
                height: 600,
                width: '100%'
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
