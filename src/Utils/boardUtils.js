export const getCurrentBoard = (playerOneBoxes, playerTwoBoxes, boxes, players) => {
  return boxes.map(box => {
    if (playerOneBoxes.includes(box)) {
      return ({
        player: players[0],
        box
      })
    }
    if (playerTwoBoxes.includes(box)) {
      return ({
        player: players[1],
        box
      })
    }
    else {
      return ({
        player: null,
        box
      })
    }
  })
}

export const getWinningBoxes = (array, parts) => {
  let verticalBoxes = [];
  let horizontalBoxes = [];
  let rightDiagonal = [];
  let leftDiagonal = [];
  console.log(array, parts)
  // console.log(verticalBoxes, horizontalBoxes, rightDiagonal, leftDiagonal)

  for (let i = 0; i < parts; i++) {
    let verticalChunks = [];
    let horizontalChunks = [];
    for (let j = 0; j < array.length; j = j + parts) {
      verticalChunks.push(array[i + j]);
      horizontalChunks.push(array[(j / parts) + (i * parts)])
      if (j / parts === i) {
        rightDiagonal.push(i + j)
      }
      if (((array.length - parts) - (i * parts)) === j) {
        leftDiagonal.push(i + j)
      }
    }
    verticalBoxes.push(verticalChunks);
    horizontalBoxes.push(horizontalChunks);
  }

  return [...verticalBoxes, ...horizontalBoxes, rightDiagonal, leftDiagonal];
}