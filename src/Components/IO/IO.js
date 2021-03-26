import React from "react";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import styles from './IO.module.css';

import {
  Typography,
  CssBaseline,
  Box,
  Button,makeStyles,Grid
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({

}));

export default function App() {
  const classes = useStyles();


  return (
    <Grid style={{display:'flex',minHeight:'28vh',backgroundColor:'#fad87a'}}>
      <Grid lg={6} style={{ backgroundColor: "#FAFAFA",height:'15vh',zIndex:'100',border:'2px solid black',borderRadius:'5px' }} >
      <textarea placeholder="Input" rows="3" cols="44" style={{border:'none',resize:'none',overflowY:'scroll'
      ,fontSize:'18px',padding:'1vh'}}/>
       </Grid>
       <Grid style={{height:'5vh',width:'5vh',borderRadius:'50%',backgroundColor:'#872e2e',
       zIndex:'200',transform:'translateY(-25px)', cursor:'pointer'}} className={styles.bounce} >
          <Grid style={{alignItem:'center',}}>
           <Grid className={styles.left}></Grid>
           <Grid className={styles.right}></Grid>
          </Grid>
       </Grid>
      <Grid lg={6} style={{ backgroundColor: "#FAFAFA",height:'15vh',zIndex:'200',border:'2px solid black',borderRadius:'5px'}} >
      <textarea disabled placeholder="Output" rows="3" cols="44" style={{border:'none',resize:'none',overflowY:'scroll'
      ,fontSize:'18px',padding:'1vh'}}/>
      </Grid>
    </Grid>
  );
}
