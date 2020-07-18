import React from "react";
import styles from "./index.module.css";
import cx from "classnames";

const Square = ({ handleSquareClick, config, winner, winningBox }) => {
  return (
    <button
      disabled={config.player || winner}
      onClick={() => handleSquareClick(config.box)}
      className={cx(
        styles.square,
        { [styles.xPlayer]: config.player === "X" },
        { [styles.oPlayer]: config.player === "O" })}
    >
      {config.player || ' '}
    </button>
  )
};

export default Square