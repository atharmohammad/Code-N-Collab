import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  select: {
    borderRadius: '7px',
    background:'#3b362a',
    position: 'relative',
    fontSize: 12,
    height:'4vh',
    cursor:'pointer',
    color:'#fff',

  },
}));

export default function CustomizedSelects() {
  const classes = useStyles();
  const [font, setFont] = React.useState('md');
  const handleChange = (event) => {
    setFont(event.target.value);
    // console.log(event.target.value)
  };
  return (
    <Grid style={{display:'flex',margin:'.8vh 0 0 5vh'}}>
        <select className={classes.select} onChange={handleChange} value={font}>
            <option value='sm'>small</option>
            <option value='md' selected>Medium</option>
            <option value='lg'>Large</option>
        </select>
    </Grid>
  );
}
