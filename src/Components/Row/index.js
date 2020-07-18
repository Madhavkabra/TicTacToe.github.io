import React from "react";
import Square from "../Square"
import styles from "./index.module.css";

const Row = ({ winner, rowItems, handleSquareClick, winningBox }) => {
  return <div className={styles.row}>
    {rowItems.map(rowItem =>
      (
        <Square winningBox={winningBox} winner={winner} config={rowItem} handleSquareClick={handleSquareClick} />
      )
    )}
  </div>
}

export default Row