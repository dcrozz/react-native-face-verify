// import React, {Component} from 'react';
//
// import {
//     AppRegistry,
//     StyleSheet,
//     Text,
//     View,
//     Image
// } from 'react-native';
//
// import Detector from './components/Detector';
//
// const image_picker_options = {
//     title: 'Select Photo',
//     takePhotoButtonTitle: 'Take Photo...',
//     chooseFromLibraryButtonTitle: 'Choose from Library...',
//     cameraType: 'back',
//     mediaType: 'photo',
//     maxWidth: 480,
//     quality: 1,
//     noData: false,
//     path: 'images'
// };
//
// const api_key = '1bbe9de7486c44da8afefa78cbdaa277';
//
// class FaceDetector extends Component {
//     render() {
//         return (
//             <View style={styles.container}>
//               <Detector imagePickerOptions={image_picker_options} apiKey={api_key} />
//             </View>
//         );
//     }
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF',
//     }
// });
//
// export default FaceDetector;


import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View
} from 'react-native';

import SimilarFaces from './components/SimilarFaces';

const image_picker_options = {
    title: 'Select Photo',
    takePhotoButtonTitle: 'Take Photo...',
    chooseFromLibraryButtonTitle: 'Choose from Library...',
    cameraType: 'back',
    mediaType: 'photo',
    maxWidth: 480,
    quality: 1,
    noData: false,
};

//the API Key that you got from Microsoft Azure
const api_key = '1bbe9de7486c44da8afefa78cbdaa277';

class FaceDetector extends Component {

    render() {
        return (
            <View style={styles.container}>
                <SimilarFaces imagePickerOptions={image_picker_options} apiKey={api_key} />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc',
    }
});

export default FaceDetector;