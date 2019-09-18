import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  Share,
  Platform,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import getImageById from './store/actions/getImageById';
import { get } from 'lodash';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Progress from 'react-native-progress';
var RNFS = require('react-native-fs');
import CameraRoll from '@react-native-community/cameraroll';

// import RNFetchBlob from 'rn-fetch-blob';
var RNFetchBlob = require('rn-fetch-blob').default;
const PictureDir = RNFetchBlob.fs.dirs.PictureDir;

const ImageDetail = props => {
  const [downloadLoader, setDownloadLoader] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    props.getImageById(props.navigation.state.params.id);
  }, []);

  async function downloadImage() {
    console.log('downloadImage func');
    setDownloadLoader(true);

    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permission granted');
        // Fetch attachment
        RNFetchBlob.fetch('GET', props.image.urls.full)
          .then(response => {
            let base64Str = response.data;

            let imageLocation = PictureDir + '/' + `${props.image.id}.jpg`;

            //Save image
            RNFetchBlob.fs.writeFile(imageLocation, base64Str, 'base64');
            console.log('FILE CREATED!!');

            RNFetchBlob.fs
              .scanFile([{ path: imageLocation }])
              .then(() => {
                console.log('scan file success');
                setDownloadLoader(false);
                setDownloadSuccess(true);
              })
              .catch(err => {
                console.log('scan file error');
              });
          })
          .catch(error => {
            // error handling
            console.log('Error:', error);
          });
      }
    } else {
      CameraRoll.saveToCameraRoll(props.image.urls.full, 'photo').then(() => {
        setDownloadLoader(false);
        setDownloadSuccess(true);
      });

      console.log('savetocamreroll done');
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <View
        style={{
          flex: 1,
          backgroundColor: 'black',
          justifyContent: 'center'
        }}
      >
        {props.loading ? (
          <ActivityIndicator
            size="large"
            color="white"
            style={{ flex: 1 }}
          ></ActivityIndicator>
        ) : (
          <View style={{ flex: 1 }}>
            <FastImage
              source={{
                uri: get(props.image.urls, 'full')
              }}
              resizeMode="contain"
              style={{
                flex: 1
              }}
            />

            <View
              style={{
                flexDirection: 'row',

                justifyContent: 'flex-end'
              }}
            >
              <View
                style={{
                  height: 55,
                  width: 55,
                  borderRadius: 50,
                  backgroundColor: 'white',
                  marginRight: 40,
                  marginBottom: 40,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Icon
                  name={downloadSuccess ? 'check' : 'download'}
                  size={40}
                  onPress={!downloadSuccess ? () => downloadImage() : null}
                ></Icon>
                {downloadLoader && (
                  <Progress.CircleSnail
                    style={{ position: 'absolute', top: -4 }}
                    size={65}
                    thickness={4}
                    duration={500}
                    color={['red', 'green', 'blue']}
                  ></Progress.CircleSnail>
                )}
              </View>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    image: state.images.oneImage,
    loading: state.images.loading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getImageById: id => dispatch(getImageById(id))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageDetail);
