export const languageMapper = (lang_mode) => {

  switch(lang_mode){
   case 'c_cpp': return {language:'cpp14',versionIndex:'3'}
   case 'python': return {language:'python3',versionIndex:'3'}
   case 'java': return {language:'java',versionIndex:'3'}
   case 'kotlin': return {language:'kotlin',versionIndex:'2'}

  }
  console.log("Error laguage not defined")
  return {};
}
