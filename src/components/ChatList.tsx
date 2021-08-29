import React, { useEffect } from "react";
import { useStore } from "hooks/useStore";

import "./chatList.css";
import { ActionTypes, UserChat } from "../reducer";

const ChatList = () => {
  const {
    state: { allChats, currentChat },
    dispatch,
  } = useStore();
  useEffect(() => {
    console.log("currentChat: ", currentChat);
  }, [currentChat]);

  const onUserClick = (chat: UserChat) => {
    dispatch({ type: ActionTypes.SET_CURRENT_CHAT, payload: chat });
  };
  return (
    <div className="chat-list">
      <ul>
        {allChats.map((chat, index) => (
          <li
            onClick={() => {
              onUserClick(chat);
            }}
            key={chat.id}
            className={chat.id === currentChat?.id ? "active-chat" : ""}
          >
            <div className="conversation-box">
              <div className="avatar">{chat.name.charAt(0)}</div>
              <div className="chat-content">
                <span className="user-name">{chat.name}</span>
                {chat.lastMessage && (
                  <>
                    <span className="msg-text">{chat.lastMessage.message}</span>
                    <span className="msg-date">
                      {chat.lastMessage.date.toDateString()}{" "}
                      {chat.lastMessage.date.toLocaleTimeString()}
                    </span>
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ChatList;
