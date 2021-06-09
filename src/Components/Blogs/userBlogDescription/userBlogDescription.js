import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../context/auth-context";
import { useContext } from "react";
import { Grid, Avatar, Typography } from "@material-ui/core";
import SelectAvatars from "../../SelectAvatars/SelectAvatars";
import classes from "./userBlogDescription.module.css";

export default function UserBlogDescription(props) {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const admin = props.admin.User;

  const fetchUser = () => {
    history.push(`/profile/?user=${admin._id}`);
  };
  return (
    <Grid
      container
      direction="row"
      onClick={fetchUser}
      className={classes.cover}
    >
      <img
        className={classes.img}
        src={SelectAvatars(admin.Avatar.slice(-1))}
        alt="?"
      />
      <Grid className={classes.textCover}>
        <Typography>{admin ? admin.Name : "User"}</Typography>
        <Typography>{admin ? admin.Designation : null}</Typography>
        <Typography>{admin ? admin.Institution : null}</Typography>
      </Grid>
    </Grid>
  );
}
