import classes from "./UpdateSpinner.module.css";

export default function Spinner() {
  return (
    <div className={classes.loader}>
      <div className={classes.bar}></div>
      <div className={classes.bar}></div>
      <div className={classes.bar}></div>
    </div>
  );
}
