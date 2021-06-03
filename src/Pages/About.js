import Stars from "../Components/Stars/Stars"
import Nav from "../Components/Nav/Nav"
import Back from "../Components/Back/Back"
import {useHistory} from "react-router-dom"

export default function About(props){

  const history = useHistory();

  const backHandler = ()=>{
    history.push("/homepage");
  }

  return(
      <div style={{height:"100vh",
          overflow:"hidden",
          background: "radial-gradient(ellipse, #1b2735 0%, #090a0f 100%)"}}>
        <Stars/>
        <Nav/>
        <Back clicked={backHandler}/>
      </div>
  )
}
