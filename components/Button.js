import React, {Component} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image
} from 'react-native';

export default class Button extends Component {

    render(){
        return (
            <View>
                <TouchableHighlight underlayColor={"#E8E8E8"} onPress={this.props.onpress} style={this.props.button_styles}>
                    <View>
                        <Text style={this.props.button_text_styles}>{this.props.text}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

// AppRegistry.registerComponent('Button', () => Button);