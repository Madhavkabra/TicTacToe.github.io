import React from "react";
import Board from './Components/Board'
import styles from "./App.module.css";

const App = ({ size = 3 }) => {
  return (
    <div className={styles.app}>
      <h1>Welcome to Tic Tac Toe!</h1>
      <Board size={size} />
    </div>
  );
};

export default App;
