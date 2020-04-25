import React, { Component } from 'react';
import {StyleSheet, Text, View, Button, Image} from 'react-native';

export default class Menu extends Component {

    constructor(props){
        super(props);
    }

    render()
    {
        return (
            <View style={styles.container}>
                <Image source={require("./TicTacToe.png")} style={styles.logo} />
                <Text>Das spannende Spiel für 2. D-D-D-Duel!</Text>
                <Button title="Start (2 Player)" style={styles.buttons} onPress={() => this.props.onGameStart(false)} />
                <Button title="Start (Computer)" style={styles.buttons} onPress={() => this.props.onGameStart(true)} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 50
    },
    logo: {
        width: "100%",
        height: "50%",
        margin:"auto",
        resizeMode: 'stretch'
    }
});