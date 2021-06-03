import Stars from "../Components/Stars/Stars"
import Nav from "../Components/Nav/Nav"
export default function About(props){

  return(
      <div style={{height:"100vh",background: "radial-gradient(ellipse, #1b2735 0%, #090a0f 100%)"}}>
        <Stars/>
        <Nav/>
      </div>
  )
}
