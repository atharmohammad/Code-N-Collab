import {useHistory} from "react-router-dom";
import {AuthContext} from "../../../context/auth-context";
import {useContext} from "react"
import {Grid , Avatar , Typography} from "@material-ui/core"
export default function UserBlogDescription(props){
  const history = useHistory();
  const auth = useContext(AuthContext);
  const admin = props.admin.User;

  const fetchUser = ()=>{
    history.push(`/profile/:${props.admin._id}`);
  }

  return (
    <Grid container direction="row" onClick={fetchUser}>
      <Avatar style={{ margin: "1vh 0 0 0" }}>{admin ? admin.Name[0] : "?"}</Avatar>
      <Grid style={{ margin: "1vh 0 0 3vh" }}>
        <Typography>{admin ? admin.Name : "User"}</Typography>
        <Typography style={{ fontStyle: "italic", fontSize: "14px" }}>
          Software Engineer
        </Typography>
      </Grid>
    </Grid>
  )
}
