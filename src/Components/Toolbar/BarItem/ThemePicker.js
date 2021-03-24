import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  select: {
    borderRadius: 4,
    background:'transparent',
    position: 'relative',
    fontSize: 12,
    border: '1px solid black',
    height:'4vh'
  },
}));

export default function CustomizedSelects() {
  const classes = useStyles();
  const [theme, settheme] = React.useState('c_cpp');
  const handleChange = (event) => {
    settheme(event.target.value);
    console.log(event.target.value)
  };
  return (
    <Grid style={{display:'flex',margin:'.8vh 0 0 4vh'}}>
        <select className={classes.select} onChange={handleChange} value={theme}>
            <option value='monokai' selected>monokai</option>
            <option value='tomorrow'>tomorrow</option>
            <option value='kuroir'>kuroir</option>
        </select>
    </Grid>
  );
}
