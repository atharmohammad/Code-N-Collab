import axios from "axios";

const languageMapper = (lang_mode) => {
  switch (lang_mode) {
    case "cpp":
      return { language: "cpp14", versionIndex: "3" };
    case "python":
      return { language: "python3", versionIndex: "3" };
    case "java":
      return { language: "java", versionIndex: "3" };
    case "kotlin":
      return { language: "kotlin", versionIndex: "2" };
    case "sql":
      return { language: "sql", versionIndex: "3" };
    case "go":
      return { language: "go", versionIndex: "3" };
    case "scala":
      return { language: "scala", versionIndex: "3" };
    case "shell":
      return { language: "bash", versionIndex: "3" };
    case "pascal":
      return { language: "pascal", versionIndex: "2" };
    case "csharp":
      return { language: "csharp", versionIndex: "3" };
    case "php":
      return { language: "php", versionIndex: "3" };
    case "perl":
      return { language: "perl", versionIndex: "3" };
    case "ruby":
      return { language: "ruby", versionIndex: "3" };
    case "swift":
      return { language: "swift", versionIndex: "3" };
    case "lua":
      return { language: "lua", versionIndex: "2" };
    case "rust":
      return { language: "rust", versionIndex: "3" };
    case "r":
      return { language: "r", versionIndex: "3" };
    case "nodejs":
      return { language: "nodejs", versionIndex: "3" };
  }
  console.log("Error laguage not defined");
  return {};
};

export const compilerFunc = async (lang, code, input) => {
  const { language, versionIndex } = languageMapper(lang);
  const url = "/execute";
  const sendData = {
    clientId: "d4b7771b3992895017e5ac5f42ec46e6",
    clientSecret:
      "37f00b6e1c5f23675ff6bd195a0e6d6631b9f8384dd9c25d1a82a5d274256db3",
    script: code,
    stdin: input,
    language,
    versionIndex,
  };

  let response = {};
  try {
    response = await axios({
      method: "post", //you can set what request you want to be
      url,
      data: sendData,
    });
  } catch (e) {
    response = e;
    return { data: { output: "Error:404\nOops Something went wrong\n:-(" } };
  }

  return response;
};
