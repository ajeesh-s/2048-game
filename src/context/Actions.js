
export const updateGlobalState = (dispatch,data) => {
  dispatch({ type: 'GLOBALSTATE' ,data: data});
}
