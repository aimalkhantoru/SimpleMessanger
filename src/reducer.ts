
export interface Message {
  message: string;
  date: Date;
}

export type UserChat = {
  id: string;
  name: string;
  messages: Message[];
  lastMessage?: Message;
};

export interface IState {
  allChats: UserChat[];
  currentChat: UserChat;
}
export type IReducer = {
  [key in keyof IState]: (state: any, action: any) => any;
};

export const initialState: IState = {
  allChats: [
    {
      id: "321",
      name: "Ali Khan",
      messages: [],
    },
    {
      id: "457",
      name: "James",
      messages: [],
    },
    {
      id: "389",
      name: "Mathew",
      messages: [],
    },
  ],
  currentChat: {
    id: "457",
    name: "James",
    messages: [],
  },
};

export enum ActionTypes {
  ADD_MESSAGE = "ADD_MESSAGE",
  SET_CURRENT_CHAT = "SET_CURRENT_CHAT",
}

export type IAction =
  | {
      type: ActionTypes.ADD_MESSAGE;
      payload: { message: Message; userId: string };
    }
  | { type: ActionTypes.SET_CURRENT_CHAT; payload: UserChat };

export const CurrentChatReducer = (
  state = initialState.currentChat,
  action: IAction
) => {
  if (action.type === ActionTypes.SET_CURRENT_CHAT) {
    return { ...action.payload };
  }
  if (action.type === ActionTypes.ADD_MESSAGE && state) {
    return { ...state, messages: [...state.messages, action.payload.message] };
  }
  return state;
};

export const AllChatReducer = (
  state = initialState.allChats,
  action: IAction
) => {
  if (action.type === ActionTypes.ADD_MESSAGE) {
    return state.map((item) =>
      item.id === action.payload.userId
        ? {
            ...item,
            messages: [...item.messages, action.payload.message],
            lastMessage: action.payload.message,
          }
        : item
    );
  }
  return state;
};

export const combineReducer = (reducers: IReducer) => {
  const reducerKeys = Object.keys(reducers) as Array<keyof IReducer>;
  return (state: IState = initialState, action: IAction) => {
    const newState: IState = initialState;
    for (let key of reducerKeys) {
      const reducer = reducers[key];
      newState[key] = reducer(state[key], action);
    }
    return newState;
  };
};

const combineReducers =  (state = initialState, actions: IAction) => {
  return {
    currentChat: CurrentChatReducer(state.currentChat, actions),
    allChats: AllChatReducer(state.allChats, actions),
  };
};

export default combineReducers;
