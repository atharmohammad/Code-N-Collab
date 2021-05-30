import {useEffect} from "react";
import "./BlogSpinner.css";

export default function Spinner(props) {

  useEffect(()=>{
    let color = "#d5fff7"
    if(props.color){
      color = props.color
    }  
    document.documentElement.style.setProperty('--base',color);
  },[])

  return (
    <div className="spinner">
      <div className="head"></div>
    </div>
  );
}
