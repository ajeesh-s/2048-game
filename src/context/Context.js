
import React from "react";
import { GlobalReducer, initialState } from "./Reducer";

const GlobalStateContext = React.createContext();

export function useGlobalState() {
  const context = React.useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalProvider");
  }
  return context;
}

export const GlobalStateProvider = ({ children }) => {
  const [globalState, dispatch] = React.useReducer(GlobalReducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ globalState: globalState, dispatch: dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};