import {useEffect} from 'react'
import PublishIcon from "@material-ui/icons/Publish";
import GetAppIcon from '@material-ui/icons/GetApp';
import Tooltip from '@material-ui/core/Tooltip';


export default function FileHandling(props){

    const chooseFileHandler = async(event)=>{
        const reader = new FileReader()
        reader.onload = async (event) => { 
          const text = (event.target.result)
          console.log(text)
        };
        reader.readAsText(event.target.files[0])
      }
    
    return(
        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
            <label for="uploading">
                <Tooltip title="Upload your Code">
                    <PublishIcon style={{color:"#fff",height:'100px',cursor:'pointer'}} />                
                </Tooltip>
            </label>
            <input id="uploading" type="file" onChange={chooseFileHandler} style={{display:'none'}}/>
            <label for="downloading">
            <Tooltip title="Download the Editor's Code">
                <GetAppIcon style={{color:"#fff",height:'100px',cursor:'pointer'}} />                
            </Tooltip>
            </label>
            <input id="downloading" type="file" onChange={chooseFileHandler} style={{display:'none'}}/>
        </div>
    )
}