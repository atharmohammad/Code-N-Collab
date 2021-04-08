import axios from 'axios'

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
  }
  console.log("Error laguage not defined");
  return {};
};

const compilerFunc = async (lang, code, input) => {
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
  
  console.log('check this', sendData)
  let response = {};
  try {
    response = await axios({
      method: "post", //you can set what request you want to be
      url,
      data: sendData,
    });
    console.log("sucessfull", response.data);
  } catch (e) {
    response = e;
    console.log(e);
    return {data:{output:"404"}}
  }

  return response;
};

export default compilerFunc;