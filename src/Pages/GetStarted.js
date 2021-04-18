import React from 'react';
import {connect} from 'react-redux'
import Title from '../Assets/images/Title.png'
import GetStartedImg from '../Assets/images/GetStarted.png'
import {useHistory} from 'react-router-dom'
import classes from '../Assets/css/style.module.css'

import {
  Grid,
  makeStyles,
  TextField,
  Button,
  Divider,
  Typography,Box
} from "@material-ui/core";

function GetStarted(){
  const history = useHistory();

  const homeHandler = ()=>{
    history.push('/homepage')
  }

    return (
      <div className={classes.wrap}>
        <div className={classes.stars}/>
        <Grid   container
          direction="column"
          justify="center"
          alignItems="center"
          style={{minHeight:'100vh'}}>
            <img src={Title} alt='Code-N-Collab' />

            <Box style={{height:'6vh' ,
             width:'25vh',
             color:'#fff',
             margin:'10vh auto',
             border:'2px solid #fff',
             textAlign:'center',
             paddingTop:'2vh',
             cursor:'pointer'
          }}
          onClick={homeHandler}>
              <img src={GetStartedImg} alt='GetStarted'/>
            </Box>
        </Grid>
      </div>
    )
}

const mapStateToProps = state=>{
  return{

  }
}

const mapDispatchToProps = dispatch=>{
  return{

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(GetStarted)
