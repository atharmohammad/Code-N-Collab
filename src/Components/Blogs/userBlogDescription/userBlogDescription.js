import {useHistory} from "react-router-dom";
import {AuthContext} from "../../../context/auth-context";
import {useContext} from "react"
import {Grid , Avatar , Typography} from "@material-ui/core"
import SelectAvatars from "../../SelectAvatars/SelectAvatars"


export default function UserBlogDescription(props){
  const history = useHistory();
  const auth = useContext(AuthContext);
  const admin = props.admin.User;

  const fetchUser = ()=>{
    history.push(`/profile/:${admin._id}`);
  }
  return (
    <Grid container direction="row" onClick={fetchUser} style={{borderBottom:'2px solid gray'}}>
      <img style={{height:'60px'}} src={SelectAvatars(admin.Avatar.slice(-1))} alt='?' />
      <Grid style={{ margin: "1vh 0 0 3vh" }}>
        <Typography>{admin ? admin.Name : "User"}</Typography>
        <Typography style={{ fontStyle: "italic", fontSize: "14px" }}>
          {admin ? admin.Designation : null}
        </Typography>
        <Typography style={{ fontStyle: "italic", fontSize: "14px" }}>
          {admin ? admin.Institution : null}
        </Typography>
      </Grid>
    </Grid>
  )
}
