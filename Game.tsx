import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Dimensions, TouchableHighlight } from 'react-native';

export default class Game extends Component {

    constructor(props){
        super(props);

        this.state = {
            player: [],
            computer: [],
            gameOver: false,
            turn: 0,
            field: ["", "", "", "", "", "", "", "", ""],
            winner: ""

        };
    }

    processTurn = (val = 0) => {
        var field = this.state.field;
        if(field[val] === ""){

            field[val] = this.state.turn % 2 == 0 ? "X" : "O";

            if(field[val] == "X"){
                this.setState({
                    player: this.state.player.concat(val),
                    turn: ++this.state.turn,
                    field: field
                }, () => {
                    this.checkWinningCondition(this.state.player, field[val]);

                    ////////// USE AI
                    if(this.props.ai){
                        const available_fields = [];
                        this.state.field.forEach((element, index) => {
                            if(element == ""){
                                available_fields.push(index);
                            }
                        });

                        var ai_field = available_fields[Math.floor(Math.random() * available_fields.length)];
                        field[ai_field] = "O";

                        this.setState({
                            computer: this.state.computer.concat(ai_field),
                            turn: ++this.state.turn,
                            field: field
                        }, () => {
                            this.checkWinningCondition(this.state.computer, field[val]);
                        })
                    }
                    //////////
                });
            }else{
                //if(!this.props.ai){
                    this.setState({
                        computer: this.state.computer.concat(val),
                        turn: ++this.state.turn,
                        field: field
                    }, () => {
                        this.checkWinningCondition(this.state.computer, field[val]);
                    });
                //}
            }

            if(this.state.turn >= 9){
                this.setState({gameOver: true})
            }
        }

    };

    resetGame = () => {
        this.setState({
            player: [],
            computer: [],
            gameOver: false,
            turn: 0,
            field: ["", "", "", "", "", "", "", "", ""],
            winner: ""
        });
    };

    winningConditions = () => {
        return [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [6, 4, 2],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
        ];
    };

    checkWinningCondition = (player_select = [], player = "" ) => {
        const winningConditions = this.winningConditions();

        winningConditions.forEach((element, index) => {
            var matches = 0;
            player_select.forEach((item, nr) => {
                if(element.includes(item)){
                    matches++;
                }
            });

            if(matches >= 3){
                this.setState({gameOver: true, winner: player});
            }
        });
    };

    render()
    {
        return (
            <React.Fragment>
                {this.state.gameOver &&
                    <View style={styles.centeredView}>
                        {this.state.winner == "" &&
                            <Text>Unentschieden!</Text>
                        }

                        {this.state.winner != "" &&
                            <Text>{this.state.winner} hat Gewonnen!</Text>
                        }
                        <Button title={"Zurück"} onPress={ this.props.onGameOver } />
                        <Button title={"Nochmal!"} onPress={ this.resetGame } />
                    </View>
                }

                {!this.state.gameOver &&
                    <React.Fragment>
                        <View style={styles.centeredView}>

                            <Text>Runde {Math.floor(this.state.turn / 2)+1}</Text>
                            <Text>{this.state.turn % 2 == 0 ? "X" : "O"} ist dran!</Text>

                        </View>
                        <View style={styles.container}>
                            <View>
                                <TouchableHighlight style={styles.button} onPress={() => this.processTurn(0)}><View style={styles.centeredView}><Text style={{fontSize: 30}}> { this.state.field[0] } </Text></View></TouchableHighlight>
                                <TouchableHighlight style={styles.button} onPress={() => this.processTurn(3)}><View style={styles.centeredView}><Text style={{fontSize: 30}}> { this.state.field[3] } </Text></View></TouchableHighlight>
                                <TouchableHighlight style={styles.button} onPress={() => this.processTurn(6)}><View style={styles.centeredView}><Text style={{fontSize: 30}}> { this.state.field[6] } </Text></View></TouchableHighlight>
                            </View>
                            <View>
                                <TouchableHighlight style={styles.button} onPress={() => this.processTurn(1)}><View style={styles.centeredView}><Text style={{fontSize: 30}}> { this.state.field[1] } </Text></View></TouchableHighlight>
                                <TouchableHighlight style={styles.button} onPress={() => this.processTurn(4)}><View style={styles.centeredView}><Text style={{fontSize: 30}}> { this.state.field[4] } </Text></View></TouchableHighlight>
                                <TouchableHighlight style={styles.button} onPress={() => this.processTurn(7)}><View style={styles.centeredView}><Text style={{fontSize: 30}}> { this.state.field[7] } </Text></View></TouchableHighlight>
                            </View>
                            <View>
                                <TouchableHighlight style={styles.button} onPress={() => this.processTurn(2)}><View style={styles.centeredView}><Text style={{fontSize: 30}}> { this.state.field[2] } </Text></View></TouchableHighlight>
                                <TouchableHighlight style={styles.button} onPress={() => this.processTurn(5)}><View style={styles.centeredView}><Text style={{fontSize: 30}}> { this.state.field[5] } </Text></View></TouchableHighlight>
                                <TouchableHighlight style={styles.button} onPress={() => this.processTurn(8)}><View style={styles.centeredView}><Text style={{fontSize: 30}}> { this.state.field[8] } </Text></View></TouchableHighlight>
                            </View>
                        </View>
                        <View style={styles.centeredView}>
                            <Button title={"Zurück"} onPress={() => { this.props.onGameOver() }} />
                        </View>
                    </React.Fragment>
                }
            </React.Fragment>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    button: {
        width: Dimensions.get('window').width*0.2, height: Dimensions.get('window').width*0.2, marginBottom:10, marginLeft:10, backgroundColor: 'powderblue'
    }
});
