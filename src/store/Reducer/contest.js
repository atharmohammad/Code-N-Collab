import * as TYPE from "../Action/action";

const initialState = {
  minRating: 500,
  maxRating: 3000,
  contest: null,
  ProblemTags: [],
  questionLoading: false,
  showContestEndedModal: false,
  contestEnded: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPE.CONTEST_ENDED:
      return { ...state, contestEnded: action.data };

    case TYPE.SHOW_CONTEST_ENDED_MODAL:
      return { ...state, showContestEndedModal: true };

    case TYPE.HIDE_CONTEST_ENDED_MODAL:
      return { ...state, showContestEndedModal: false };

    case TYPE.SET_QUESTION_LOADING:
      return { ...state, questionLoading: true };

    case TYPE.RESET_QUESTION_LOADING:
      return { ...state, questionLoading: false };

    case TYPE.CONTEST_UPDATED:
      return { ...state, contest: action.data };

    case TYPE.UPDATE_PROBLEM_TAGS: {
      return { ...state, ProblemTags: action.data };
    }

    case TYPE.UPDATE_MIN_RATING:
      return { ...state, minRating: action.data };

    case TYPE.UPDATE_MAX_RATING:
      return { ...state, maxRating: action.data };

    default:
      return state;
  }
};

export default reducer;
