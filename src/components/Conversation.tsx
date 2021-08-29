import React from 'react';
import ChatList from "./ChatList";
import UserChat from "./UserChat";
import './conversation.css'
export const Conversation = () => {
    return (
        <div className="conversation">
            <ChatList />
            <UserChat />
        </div>
    )
}

export default Conversation;
