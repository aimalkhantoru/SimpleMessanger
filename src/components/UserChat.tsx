import React, { KeyboardEventHandler, useEffect, useState } from "react";
import "./userChat.css";
import { useStore } from "../hooks/useStore";
import { ActionTypes } from "../reducer";

export const UserChat = () => {
  const [messageText, setMessageText] = useState("");
  const {
    state: { currentChat },
    dispatch,
  } = useStore();
  useEffect(() => {
    setMessageText("");
  }, [currentChat]);
  const onEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      dispatch({
        type: ActionTypes.ADD_MESSAGE,
        payload: {
          userId: currentChat?.id || "",
          message: {
            message: messageText,
            date: new Date(),
          },
        },
      });
      setMessageText("");
    }
  };
  return (
    <div className="chat-body">
      <div className="messages-list">
        {currentChat &&
          currentChat.messages.map((item, index) => (
            <div key={'chat_item_' + index} className="message-body">
              <div className="message-text" key={"chatId" + index}>
                {item.message}
              </div>
            </div>
          ))}
      </div>
      <input
        value={messageText}
        onChange={({ target: { value } }) => {
          setMessageText(value);
        }}
        onKeyDown={onEnter}
        type="text"
      />
    </div>
  );
};

export default UserChat;
