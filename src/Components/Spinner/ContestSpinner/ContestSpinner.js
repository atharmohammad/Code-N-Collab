import classes from "./ContestSpinner.module.css"

export default function Spinner (props){
  return(
    <div className={classes.wrap}>
      <div className={classes.spinner}></div>
    </div>
  )
}
