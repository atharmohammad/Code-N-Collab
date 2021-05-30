import NavItem from "./NavItems";
import "./NavItem.css";
import {useHistory} from "react-router-dom";

export default function(){

  const history = useHistory();

  const signUpHandler = ()=>{
    history.push("/signup");
  }
  const loginHandler = ()=>{
    history.push("/login");
  }
  const aboutHandler = ()=>{
    history.push("/about");
  }

  return(
    <div className="header">
      <NavItem Name="login" clicked={loginHandler}/>
      <NavItem Name="sign-up" clicked={signUpHandler} />
      <NavItem Name="about" clicked={aboutHandler} />
    </div>
  )
}
