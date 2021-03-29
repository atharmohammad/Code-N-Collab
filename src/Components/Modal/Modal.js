import React from 'react';
import { Grid, makeStyles} from "@material-ui/core";
import Spinner from '../Spinner/Spinner';

const Modal = (props)=>{
  return(
    <Grid style={{  position: 'fixed',zIndex: '500',backgroundColor: 'black',height:'45vh',
              width: '90vh',border: '1px solid #ccc',boxShadow: '1px 1px 1px black',background:'rgb(39, 41, 43,0.8)',
              padding: '15vh',left: '30%',top: '25%',display:'flex',justifyContent:'center',
              boxSizing: 'border-box',transition: 'all 0.3s ease-out'}}>

      <Spinner/>
    </Grid>
  )
}

export default Modal
