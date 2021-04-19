import * as TYPE from "../Action/action";

const initialState = {
  language: "cpp",
  theme: "vs-dark",
  nowCompile: false,
  isLoading: false,
  fontSize: 20,
  input: "",
  output: "",
  output_success:false,
  output_error:false,
  someOneSendIO:true,
};

const reducer = (state = initialState, action) => {

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

    case TYPE.NOTIFY_OUTPUT_SUCCESS:
      return { ...state, output_success: (state.output_success ? false : true) };

    case TYPE.NOTIFY_OUTPUT_ERROR:
      return { ...state, output_error: (state.output_error ? false : true) };
    
    case TYPE.SET_SOME_ONE_SEND_IO:
      return { ...state,someOneSendIO:true};  
    
    case TYPE.RESET_SOME_ONE_SEND_IO:
      return { ...state,someOneSendIO:false};
    default:return state
  }
};

export default reducer;
