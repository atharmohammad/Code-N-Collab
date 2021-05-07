import classes from "./BlogSpinner.module.css";

export default function Spinner(props) {
  return (
    <div className={classes.spinner}>
      <div className={classes.head}></div>
    </div>
  );
}
