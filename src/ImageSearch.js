import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import getSearchedImage from './store/actions/getSearchedImage';
import FastImage from 'react-native-fast-image';
const ImageSearch = props => {
  useEffect(() => {
    props.getSearchedImage(props.navigation.state.params);
  }, []);

  function handleClick(index, item) {
    props.navigation.navigate('ImageDetail', item);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {props.loading ? (
        <ActivityIndicator
          size="large"
          color="black"
          style={{ flex: 1 }}
        ></ActivityIndicator>
      ) : (
        <FlatList
          data={props.searchedImages}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={1}
              style={{
                height: 300,
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
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.images.loading,
    searchedImages: state.images.searchedImages
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getSearchedImage: query => dispatch(getSearchedImage(query))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageSearch);
