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
  const [language, setLanguage] = React.useState('c_cpp');
  const handleChange = (event) => {
    setLanguage(event.target.value);
    // console.log(event.target.value)
  };
  return (
    <Grid style={{display:'flex',margin:'.8vh 0 0 30vh'}}>
        <select className={classes.select} onChange={handleChange} value={language}>
            <option value='c_cpp' selected>C++</option>
            <option value='java'>Java</option>
            <option value='python'>Python</option>
            <option value='javascript'>Javascript</option>
        </select>
    </Grid>
  );
}
