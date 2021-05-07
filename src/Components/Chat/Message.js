import React from "react";

import classes from "./Message.module.css";

import ReactEmoji from "react-emoji";

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }
  console.log(user, name);

  return isSentByCurrentUser ? (
    <div className={`${classes.messageContainer} ${classes.justifyEnd}`}>
      <p className={`${classes.sentText} ${classes.pr}`}>{trimmedName}</p>
      <div className={`${classes.messageBox} ${classes.backgroundBlue}`}>
        <p className={`${classes.messageText} ${classes.colorWhite}`}>
          {ReactEmoji.emojify(text)}
        </p>
      </div>
    </div>
  ) : (
    <div className={`${classes.messageContainer} ${classes.justifyStart}`}>
      <div className={`${classes.messageBox} ${classes.backgroundLight}`}>
        <p className={`${classes.messageText} ${classes.colorDark}`}>
          {ReactEmoji.emojify(text)}
        </p>
      </div>
      <p className={`${classes.sentText} ${classes.pl}`}>{user}</p>
    </div>
  );
};

export default Message;
