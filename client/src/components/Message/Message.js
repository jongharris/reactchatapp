import React from 'react';
import './Message.css';

const Message = ({ message: { text, user, nickColor }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();
    console.log(nickColor);
  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  const nickStyle = {
      color: nickColor
  }
  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10" style={nickStyle}>{trimmedName}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite" >{text}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{text}</p>
            </div>
            <p className="sentText pl-10 "style={nickStyle}>{user}</p>
          </div>
        )
  );
}

export default Message;