
export const addHighScore = (dispatch,score) => {
  dispatch({ type: 'HIGHSCORE' ,data: score});
}