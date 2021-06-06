import { useEffect, useState,useContext} from "react";
import Profile from "../Components/Profile/Profile";
import {useLocation,useHistory} from  "react-router-dom"
import { AuthContext } from "../context/auth-context";
import Spinner from "../Components/Spinner/BlogSpinner"
import Stars from "../Components/Stars/Stars"
import Nav from "../Components/Nav/Nav"
import Back from "../Components/Back/Back"
import axios from "../Axios/axios"

const Me = (props) => {
  const auth = useContext(AuthContext);
  const [user,setUser] = useState(null);
  const [startSpinner,setSpinner] = useState(true);
  const location = useLocation();
  const history = useHistory();


  useEffect(async()=>{
    const searchParams = new URLSearchParams(location.search);
    if(searchParams.get('user') && searchParams.get("user").trim() !== ""){
      try{
        const id = searchParams.get("user");
        const data = await axios.get("user/userProfile/" + id);
        setUser(data.data)
        setSpinner(false);
      }catch(e){
          console.log(e);
          history.push('/homepage');
      }
    }else{
        setUser(auth.user);
        setSpinner(false)
    }
  },[])

  const backHandler = ()=>{
    history.push('/blogs');
  }

  return(
  <div
    style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse, #1b2735 0%, #090a0f 100%)",
      paddingBottom: "50px",
      boxSizing: "border-box",
    }}
  >
    <Stars />
    <Back clicked={backHandler} />
    <Nav />
    {startSpinner ? <Spinner /> :
      <Profile user={user} />
    }
  </div>)
};

export default Me;
