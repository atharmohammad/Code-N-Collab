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
  const date = new Date(props.date);
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const fetchUser = () => {
    history.push(`/profile/?user=${admin._id}`);
  };
  return (
    <div onClick={fetchUser} className={classes.cover}>
      <img
        className={classes.img}
        src={SelectAvatars(admin.Avatar)}
        alt="?"
      />
      <Grid className={classes.textCover}>
        <Typography>{admin ? admin.Name : "User"}</Typography>
        <Typography>{admin ? admin.Designation : null}</Typography>
        <Typography>{admin ? admin.Institution : null}</Typography>
      </Grid>
      <div className={classes.date}>
        {date.getDate()} {month[date.getMonth()]} {date.getYear()-100}
      </div>
    </div>
  );
}
