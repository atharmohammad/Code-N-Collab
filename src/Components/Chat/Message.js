import React from 'react';

import classes from'./Message.module.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;
  
  
  const trimmedName = name.trim().toLowerCase();
  
  const classJoin = (...args)=>{
    let s = ''
    for(let i=0;i<args.length;i++)
       s += args[i]+" ";
    return s;   
  }
  

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }
  console.log(user,name)
  
  return (
    isSentByCurrentUser
      ? (
        <div className = {classJoin(classes.messageContainer, classes.justifyEnd)}>
          <p className = {classJoin(classes.sentText, classes.pr)}>{trimmedName}</p>
          <div className = {classJoin(classes.messageBox, classes.backgroundBlue)}>
            <p className = {classJoin(classes.messageText,classes.colorWhite)} >{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
        )
        : (
          <div className={classJoin(classes.messageContainer,classes.justifyStart)}>
            <div className={classJoin(classes.messageBox,classes.backgroundLight)}>
              <p className={classJoin(classes.messageText,classes.colorDark)}>{ReactEmoji.emojify(text)}</p>
            </div>
            <p className={classJoin(classes.sentText ,classes.pl )}>{user}</p>
          </div>
        )
  );
}

export default Message;