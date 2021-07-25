import * as TYPE from "../Action/action";

const initialState = {
  language: "cpp",
  theme: "monokai",
  nowCompile: false,
  isLoading: false,
  fontSize: 25,
  input: "",
  output: "",
  output_success: false,
  output_error: false,
  showGraph: false,
  uploadedCode : ""
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
      return { ...state, output_success: action.value};

    case TYPE.NOTIFY_OUTPUT_ERROR:
      return { ...state, output_error: action.value };

    case TYPE.SHOW_GRAPH:
      return { ...state, showGraph: true };

    case TYPE.HIDE_GRAPH:
      return { ...state, showGraph: false };
    
    case TYPE.UPLOAD_CODE_FILE:
      return {...state , uploadedCode:action.value}

    default:
      return state;
  }
};

export default reducer;
