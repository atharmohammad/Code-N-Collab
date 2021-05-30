import {useEffect} from "react"
import "../../Assets/css/style.css";

export default function Stars(props){

  useEffect(()=>{
    document.documentElement.style.setProperty('--base',props.color);
  },[])
  return(
      <div className="stars" ></div>
  )
}
