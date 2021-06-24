import { useHistory } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import Star from "../../../Assets/images/star.png";
import SelectAvatars from "../../SelectAvatars/SelectAvatars";
import classes from "./userBlogDescription.module.css";

export default function UserBlogDescription(props) {
  const history = useHistory();
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
      <img className={classes.img} src={SelectAvatars(admin.Avatar)} alt="?" />
      <Grid className={classes.textCover}>
        <Typography style={{ display: "flex",width:'70%' }}>
          {admin ? admin.Name : "User"}
          {admin && admin.SuperUser ? (
            <img
              style={{ height: "20px",marginLeft:'2%' }}
              src={Star}
              alt="Admin"
            />
          ) : null}
        </Typography>
        <Typography>{admin ? admin.Designation : null}</Typography>
        <Typography>{admin ? admin.Institution : null}</Typography>
      </Grid>
      <div className={classes.date}>
        {date.getDate()} {month[date.getMonth()]} {date.getYear() - 100}
      </div>
    </div>
  );
}
