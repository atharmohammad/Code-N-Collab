import * as TYPE from "../Action/action";

const initialState = {
  minRating:500,
  maxRating:3000,
  contest:null,
  ProblemTags:[],
};

const reducer = (state = initialState, action) => {
  console.log(action.type)
  switch (action.type) {
    case TYPE.CONTEST_UPDATED:
      return{...state,contest:action.data}

    case TYPE.UPDATE_PROBLEM_TAGS:{
      return {...state,ProblemTags:action.data}
    }

    case TYPE.UPDATE_MIN_RATING:
      return {...state,minRating:action.data}

    case TYPE.UPDATE_MAX_RATING:
      return{...state,maxRating:action.data}

    default:return state
  }
};

export default reducer;
