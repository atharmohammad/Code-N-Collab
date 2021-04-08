import * as TYPE from "../Action/action";

const initialState = {
  language: "cpp",
  theme: "vs-dark",
  nowCompile: false,
  isLoading: false,
  fontSize: 25,
  input: "",
  output: "",
  room:false
};

const reducer = (state = initialState, action) => {
  console.log(action);

  switch (action.type) {
    case TYPE.SET_COMPILE_ON:
      return { ...state, nowCompile: true };

    case TYPE.SET_COMPILE_OFF:
      return { ...state, nowCompile: false };

    case TYPE.SET_LOADING:
      return { ...state, isLoading: true };

    case TYPE.RESET_LOADING:
      return { ...state, isLoading: false };

    case TYPE.SET_LANGUAGE:
      return { ...state, language: action.value };

    case TYPE.SET_THEME:
      return { ...state, theme: action.value };

    case TYPE.SET_FONT_SIZE:
      return { ...state, fontSize: action.value };

    case TYPE.SET_INPUT:
      return { ...state, input: action.value };

    case TYPE.SET_OUTPUT:
      return { ...state, output: action.value };

    case TYPE.CREATE_ROOM:
      return {...state,room:true}

    case TYPE.LEAVE_ROOM:
      return {...state,room:false}
  }
  return state;
};

export default reducer;
