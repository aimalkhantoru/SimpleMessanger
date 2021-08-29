import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useReducer,
} from "react";
import reducers, { IAction, initialState, IState } from "reducer";

const storeContext = createContext<{
  state: IState;
  dispatch: React.Dispatch<IAction>;
}>({
  state: initialState,
  dispatch: () => null,
});
storeContext.displayName = "Store";

export const useStore = () => useContext(storeContext);

export const StoreProvider: FC<{ initialValue: IState }> = ({
  children,
  initialValue,
}) => {
  const [state, dispatch] = useReducer(reducers, initialValue);
  useEffect(() => {
    console.log("state current: ", state.currentChat);
    console.log("state all: ", state.allChats);
  }, [state]);
  return (
    <storeContext.Provider value={{ state, dispatch }}>
      {children}
    </storeContext.Provider>
  );
};
