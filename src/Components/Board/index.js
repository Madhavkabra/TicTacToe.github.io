import React from "react";
import { getWinningBoxes, getCurrentBoard } from "../../Utils/boardUtils";
import Row from '../Row'
import styles from "./index.module.css";

const players = ['X', 'O']

const initialBoard = {
  playerOneBoxes: [],
  playerTwoBoxes: [],
  currentPlayer: players[0],
  currentBoard: [],
  winner: null,
}

class Board extends React.Component {
  constructor(props) {
    super();
    this.players = players
    this.state = {
      totalSize: 3 * 3,
      boxes: [...Array(9).keys()],
      winningBoxes: getWinningBoxes([...Array(9).keys()], 3),
      playerOneBoxes: [],
      playerTwoBoxes: [],
      currentPlayer: this.players[0],
      currentBoard: [],
      winner: null,
      winningBox: [],
      boardSize: 3
    }
  }

  componentDidMount() {
    this.refreshBoard();
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.playerOneBoxes !== this.state.playerOneBoxes || previousState.playerTwoBoxes !== this.state.playerTwoBoxes) {
      const { playerOneBoxes, playerTwoBoxes } = this.state
      const won = this.checkWin(playerOneBoxes, playerTwoBoxes)
      if (won) {
        const board = getCurrentBoard(playerOneBoxes, playerTwoBoxes, this.state.boxes, this.players)
        const winner = this.state.currentPlayer === this.players[0] ? this.players[1] : this.players[0]
        this.setState({ ...this.state, winner, currentBoard: board })
      } else {
        const board = getCurrentBoard(playerOneBoxes, playerTwoBoxes, this.state.boxes, this.players)
        this.setState({ ...this.state, currentBoard: board })
      }
    }
  }

  refreshBoard = () => {
    const { playerOneBoxes, playerTwoBoxes } = this.state
    const board = getCurrentBoard(playerOneBoxes, playerTwoBoxes, this.state.boxes, this.players)
    this.setState({ ...this.state, currentBoard: board, winningBox: [] })
  }


  resetGame = () => {
    this.setState({
      ...initialBoard
    }, () => {
      this.refreshBoard()
    })
  }

  setBoardSize = (size) => {
    const totalSize = size * size;
    const board = getCurrentBoard([], [], [...Array(totalSize).keys()], this.players)
    this.setState({
      ...this.state,
      boardSize: size,
      totalSize: totalSize,
      boxes: [...Array(totalSize).keys()],
      winningBoxes: getWinningBoxes([...Array(totalSize).keys()], size),
      currentBoard: board,
      playerOneBoxes: [],
      playerTwoBoxes: [],
      currentPlayer: this.players[0],
    })
  }

  handleSquareClick = (box) => {
    if (this.state.currentPlayer === this.players[0]) {
      const newBoxes = [box, ...this.state.playerOneBoxes]
      this.setState({
        ...this.state,
        playerOneBoxes: newBoxes,
        currentPlayer: this.players[1]
      });
    }
    else {
      const newBoxes = [box, ...this.state.playerTwoBoxes]
      this.setState({
        ...this.state,
        playerTwoBoxes: newBoxes,
        currentPlayer: this.players[0]
      });
    }
  }

  checkWin = (playerOneBoxes, playerTwoBoxes) => {
    let currentPlayerWon = false

    // We check moves for opposite palyer since current player has been toggled
    const currentBox = this.state.currentPlayer === this.players[0] ? playerTwoBoxes : playerOneBoxes
    if (currentBox.length) {
      this.state.winningBoxes.forEach(winningBox => {
        if (winningBox.every(winIndex => currentBox.includes(winIndex))) {
          this.setState({
            ...this.state,
            winningBox: winningBox
          })
          currentPlayerWon = true
        }
      })
    }
    return currentPlayerWon
  }

  render() {
    const { currentPlayer, currentBoard, winner } = this.state
    return (
      <div className={styles.container}>
        <div className={styles.infoWrapper}>
          <div className={styles.playerTextWrapper}>
            <div className={styles.playerText}>Next Player: {winner ? '-' : currentPlayer}</div>
            <div className={styles.playerText}>Winner: {winner ? winner : 'None'}</div>
          </div>
          <div className={styles.optionWrapper}>
            <fieldset className={styles.sizeSelect}>
              <legend>Game size</legend>
              <select
                className={styles.select}
                value={this.state.boardSize}
                onChange={(event) => this.setBoardSize(Number(event.target.value))}
              >
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
              </select>
            </fieldset>
            <button className={styles.resetBtn} onClick={this.resetGame}>Reset Game</button>
          </div>
        </div>
        <div className={styles.squareGrid}>
          {
            [...Array(this.state.boardSize).keys()].map(item => {
              const startIndex = item * this.state.boardSize;
              const endIndex = startIndex + this.state.boardSize;
              return (
                <Row
                  winningBox={this.state.winningBox}
                  winner={winner}
                  handleSquareClick={this.handleSquareClick}
                  rowItems={currentBoard.slice(startIndex, endIndex)}
                />)
            })
          }
        </div>
      </div>
    );
  }
}

export default Board