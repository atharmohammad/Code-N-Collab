import { Grid } from "@material-ui/core";
import classes from "./AvatarModal.module.css";
import { AllAvatars } from "../SelectAvatars/SelectAvatars";

const WriterModal = (props) => {
  return (
    <>
      <Grid onClick={props.cancelHandler} className={classes.backdrop}></Grid>
      <Grid className={classes.modal}>
        <Grid className={classes.AvatarGridone}>
          {AllAvatars().map((e, idx) => (
            <div className={classes.background} key={idx}>
              <img
                onClick={() => {
                  props.cancelHandler();
                  props.changeHandler(idx);
                }}
                src={e}
                alt="avatar"
                className={classes.avatar}
              />
            </div>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default WriterModal;
