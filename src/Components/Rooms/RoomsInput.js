import classes from './RoomsInput.module.css'

export default function Input(props){
  return(
    <input
      onChange={(value) => props.changeHandler}
      className={classes.input}
    />
  )
}
