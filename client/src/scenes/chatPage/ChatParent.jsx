// ChatParent.jsx
import React from "react";
import Conversation from "components/Conversation";
import ChatBox from "components/ChatBox";
import WidgetWrapper from "components/WidgetWrapper";

const ChatParent = ({ chats, user, currentChat, setCurrentChat, setIsChatClicked, isMobileScreens, onlineUsers, setSendMessage, receivedMessage }) => {
  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <div className="Chat">
      {/* Left Side */}
      <div className={`Left-side-chat ${currentChat && !isMobileScreens ? 'hide' : ''}`}>
        <div className="Chat-container">
          <WidgetWrapper>
            <h2>Chats</h2>
            <div className="Chat-list">
              {chats.map((chat) => (
                <div
                  key={chat._id}
                  onClick={() => {
                    setCurrentChat(chat);
                    setIsChatClicked(true);
                  }}
                >
                  <Conversation data={chat} currentUser={user._id} online={checkOnlineStatus(chat)} />
                </div>
              ))}
            </div>
          </WidgetWrapper>
        </div>
      </div>

      {/* Right Side */}
      <div className={`Right-side-chat ${!isMobileScreens && !currentChat ? 'hide' : 'show'}`}>
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  );
};

export default ChatParent;
