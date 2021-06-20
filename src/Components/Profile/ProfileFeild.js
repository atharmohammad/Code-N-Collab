import classes from './profile.module.css'

const ProfileFeild = (props) => {
  return (
    <div
    className={classes.ProfileField}
    >
      <div className={classes.ProfileField_label}>{props.title}:</div>
      <div className={classes.ProfileField_value} >
        {props.value}
      </div>
    </div>
  );
};

export default ProfileFeild;
