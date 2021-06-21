import classes from "./ContestSpinner.module.css";

export default function Spinner(props) {
  return (
    <div className={classes.wraped} style={{ marginTop: props.marginTop }}>
      <div className={classes.spinneer}></div>
    </div>
  );
}
