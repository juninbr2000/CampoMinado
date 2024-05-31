import { StatusBar } from 'expo-status-bar';
import { Component, useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import params from './src/Params';
import MineField from './src/components/MineField';
import { createMinedBoard, cloneBoard, openField, hasExploded, wowGame, showMines, invertFlag, flagsUsed } from './src/functions';
import Header from './src/components/Header';
import LevelSelection from './src/screen/LevelSelection';

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = this.createState()
  }

  minesAmount = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowAmount();
    return Math.ceil(cols * rows * params.difficultLevel)
  }

  createState = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowAmount();
    return {
      board: createMinedBoard(rows, cols, this.minesAmount()),
      won: false,
      lost: false,
      showLevelSelection: false,
    }
  }

  onOpenField = (row, column) => {
    const board = cloneBoard(this.state.board);
    openField(board, row, column);
    const lost = hasExploded(board);
    const won = wowGame(board)

    if(lost) {
      showMines(board);
      Alert.alert('loserrrrr')
    }
    if(won){
      Alert.alert('you win!');
    }

    this.setState({ board, lost, won })
  }

  onSelectField = (row, column) => {
    const board = cloneBoard(this.state.board);
    invertFlag(board, row, column)
    const won = wowGame(board)

    if(won){
      Alert.alert('Você ganhou');
    }

    this.setState({board, won})
  }

  onLevelSelected = (level) => {
    params.difficultLevel = level;
    this.setState(this.createState())
  }


  render() {
    return(
    <View style={styles.container}>
      <LevelSelection isVisible={this.state.showLevelSelection} onLevelSelected={this.onLevelSelected} onCancel={() => this.setState({showLevelSelection: false })} />
      <Header flagsLeft={this.minesAmount() - flagsUsed(this.state.board)} onNewGame={() => this.setState(this.createState())} onFlagPress={() => this.setState({ showLevelSelection: true })} />
      <View style={styles.board}>
        <MineField board={this.state.board} onOpenField={this.onOpenField} onSelectField={this.onSelectField}/>
      </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#aaa',
  }
});
