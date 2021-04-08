import * as TYPE from "../Action/action";

const initialState = {
  userName:'',
  roomName:'',
  room:false
};

const reducer = (state = initialState, action) => {
  console.log(action);

  switch (action.type) {

    case TYPE.CREATE_ROOM:
      return {
          ...state,
          room:true,
          userName:action.data.userName,
          roomName:action.data.roomName
        }

    case TYPE.LEAVE_ROOM:
      return {...state,room:false}

    default:return state

  }

};

export default reducer;
