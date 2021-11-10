import { ManageLocalStorage } from "../services/ManageLocalStorage";

const initialStateValue = ManageLocalStorage.get("global_state")
  ? JSON.parse(ManageLocalStorage.get("global_state"))
  : "";

export const initialState = initialStateValue ? initialStateValue : {
  highScore: 0, mileStone: 64
};

export const GlobalReducer = (initialState, action) => {
  switch (action.type) {
    case "GLOBALSTATE":
      const stateValue = {
        ...initialState,
        ...action.data
      };
      ManageLocalStorage.set('global_state', stateValue);
      return stateValue;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};