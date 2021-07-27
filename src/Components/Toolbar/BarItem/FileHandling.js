import {useEffect} from 'react'
import PublishIcon from "@material-ui/icons/Publish";
import GetAppIcon from '@material-ui/icons/GetApp';
import Tooltip from '@material-ui/core/Tooltip';
import {connect} from "react-redux"
import {SET_CODE, SET_UPLOADED_CODE} from "../../../store/Action/action"

function FileHandling(props){

    const chooseFileHandler = async(event)=>{
        const reader = new FileReader()
        reader.onload = async (event) => { 
         const text = (event.target.result)
         props.set_uploaded_code(text)
        };
        reader.readAsText(event.target.files[0])
        event.target.value = ""
      }

      const TextFile = () => {
        const element = document.createElement("a");
        const file = new Blob([props.code], {type: 'text/plain'});
        console.log(props.code)
        element.href = URL.createObjectURL(file);
        element.download = "myFile.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
      }
    
    return(
        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around',alignSelf:'center'}}>
            <label for="uploading">
                <Tooltip title="Upload your Code">
                    <PublishIcon style={{color:"#fff",cursor:'pointer'}} />                
                </Tooltip>
            </label>
            <input id="uploading" type="file" onChange={chooseFileHandler} style={{display:'none'}}/>
            <label for="downloading">
            <Tooltip title="Download the Editor's Code" onClick={TextFile}>
                <GetAppIcon style={{color:"#fff",cursor:'pointer'}} />                
            </Tooltip>
            </label>
        </div>
    )
}

const mapStateToProps = state=>{
    return{
        code:state.tools.code
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        setCode : (value)=>dispatch({type:SET_CODE,value}),
        set_uploaded_code : (value)=>dispatch({type:SET_UPLOADED_CODE,value})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(FileHandling)