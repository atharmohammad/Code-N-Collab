import React,{useEffect,useState} from 'react';
import Editor from '@uiw/react-md-editor'
import {Grid,Box} from '@material-ui/core'
import axios from '../../Axios/axios'

export default function TextEditor(props){
  const [value,setValue] = useState("");
  const postHandler = ()=>{
    axios.post('blogs/write',{Body:value}).then(res=>{
      window.location.reload()
    }).catch(e=>console.log(e))
  }
  return(
    <Grid style={{width:'100vh',marginTop:'10vh'}}>
      <Editor height={300} value={value} onChange={setValue} />
      <Box style={{width:'5vh',
      backgroundColor:'#4169E1',
      borderRadius:'10px',
      padding:'1vh',
      textAlign:'center',
      color:'#fff',
      marginTop:'1vh',
      float:'right',
      cursor:'pointer'
    }} onClick={postHandler}>Post</Box>
    </Grid>
  )
}
