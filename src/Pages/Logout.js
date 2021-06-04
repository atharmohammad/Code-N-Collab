import { useEffect ,useContext} from "react";
import { Grid, Box, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth-context";


const Logout = (props) => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  useEffect(()=>{
   auth.logout();
   history.push('/homepage');
  },[auth.logout])
  
  return (
    <div>Logout</div>
  );
};

export default Logout;
