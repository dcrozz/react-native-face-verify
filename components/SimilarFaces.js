import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    ScrollView
} from 'react-native';

import React, {Component} from 'react';

var ImagePicker = require('react-native-image-picker');

import Button from 'react-native-button';

import Requestor from '../lib/Requestor';

let persongroup_id = 'persongroup_id';
let persongroup_data = {
    name: 'persongroup_name'
}
let person_data = {
    name: 'alex'
}

let face_api_base_url = 'https://westcentralus.api.cognitive.microsoft.com';

export default class SimilarFaces extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            photo_style: {
                width: 480,
                height: 480
            },
            photo: null,
            similar_photo: null,
            message: '',
            person_id: '',
            persistedFaceId: ''
        };
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Button
                        containerStyle={styles.button}
                        onPress={this._createPersonGroup.bind(this)}>
                        Create Person Group
                    </Button>

                    <Image
                        style={this.state.photo_style}
                        source={this.state.photo}
                        resizeMode={"contain"}
                    />

                    <Button
                        containerStyle={styles.button}
                        onPress={this._pickImage.bind(this)}>
                        Pick Image
                    </Button>

                    <TextInput
                        style={styles.text_input}
                        onChangeText={this._changeName.bind(this)}
                        value={this.state.name}
                        placeholder={"name"}
                    />

                    <Button
                        containerStyle={styles.button}
                        onPress={this._addFaceToPersonGroup.bind(this)}>
                        Add Face to PersonGroup
                    </Button>

                    <Button
                        containerStyle={styles.button}
                        onPress={this._verifyFace.bind(this)}>
                        Verify Face
                    </Button>

                    <Image
                        style={this.state.photo_style}
                        source={this.state.similar_photo}
                        resizeMode={"contain"}
                    />

                    <Text style={styles.message}>{this.state.message}</Text>
                </View>
            </ScrollView>

        );
    }

    _changeName(text) {
        this.setState({
            name: text
        });
    }

    _pickImage() {

        ImagePicker.showImagePicker(this.props.imagePickerOptions, (response) => {

            if (response.error) {
                alert('Error getting the image. Please try again.');
            } else {

                let source = {uri: response.uri};

                this.setState({
                    photo_style: {
                        width: response.width,
                        height: response.height
                    },
                    photo: source,
                    photo_data: response.data
                });
            }
        });

    }

    _createPersonGroup() {

        Requestor.request(
            face_api_base_url + '/face/v1.0/persongroups/' + persongroup_id,
            'PUT',
            this.props.apiKey,
            JSON.stringify(persongroup_data)
        )
            .then(function (res) {
                // console.log(res);
                alert('Person Group Created!');
            });

        Requestor.request(
            face_api_base_url + '/face/v1.0/persongroups/' + persongroup_id + '/persons',
            'POST',
            this.props.apiKey,
            JSON.stringify(person_data)
        )
            .then(
                (res) => {
                    console.log(res['personId']);

                    this.setState({
                        person_id: res['personId']
                    });
                }
            )
            .catch(function (error) {
                console.log(error);
            });
    }

    _addFaceToPersonGroup() {

        var user_data = {
            name: this.state.name,
            filename: this.state.photo.uri
        };

        Requestor.upload(
            face_api_base_url + '/face/v1.0/persongroups/' + persongroup_id + '/persons/' + this.state.person_id + '/persistedFaces',
            this.props.apiKey,
            this.state.photo_data,
            {
                userData: JSON.stringify(user_data)
            }
        )
            .then((res) => {
                console.log(res);

                this.setState({
                    persistedFaceId: res['persistedFaceId']
                });

                alert('Face was added to person group!');

            });

    }

    _verifyFace() {
        Requestor.upload(
            face_api_base_url + '/face/v1.0/detect',
            this.props.apiKey,
            this.state.photo_data
        )
            .then((facedetect_res) => {

                let face_id = facedetect_res[0].faceId;

                let data = {
                    faceId: face_id,
                    personId: this.state.person_id,
                    personGroupId: persongroup_id
                }

                Requestor.request(
                    face_api_base_url + '/face/v1.0/verify',
                    'POST',
                    this.props.apiKey,
                    JSON.stringify(data)
                )
                    .then((verify_res) => {

                        let result = verify_res.isIdentical;
                        let confidece = verify_res.confidence;

                        alert(result);

                    });

            });

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    button: {
        padding: 10,
        margin: 20,
        height: 45,
        overflow: 'hidden',
        backgroundColor: 'white'
    },
    text_input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: '#FFF'
    },
    message: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});

// AppRegistry.registerComponent('SimilarFaces', () => SimilarFaces);
