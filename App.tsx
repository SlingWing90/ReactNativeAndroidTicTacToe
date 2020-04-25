import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import  Game from './Game';
import  Menu from './Menu';

export default class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      gameStart: false,
      useAi: false
    }
  }

  gameStart = (useAi = false) => {
    this.setState({ useAi: useAi,  gameStart: true });
  };

  gameOver = () => {
    this.setState({ gameStart: false });
  };

  render()
  {
    return (
        <React.Fragment>
          {!this.state.gameStart &&
            <Menu onGameStart={this.gameStart} /> }

          {this.state.gameStart &&
            <Game ai={this.state.useAi} onGameOver={this.gameOver} /> }
        </React.Fragment>
    );
  }

}