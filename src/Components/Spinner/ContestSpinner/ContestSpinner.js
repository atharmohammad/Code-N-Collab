import classes from "./ContestSpinner.module.css"

export default function Spinner (props){
  return(
    <div className={classes.wrap} style={{margin:(props.margin?props.margin:'-12px')}}>
      <div className={classes.spinner}></div>
    </div>
  )
}
