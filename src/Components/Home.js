import React from "react";
import { Grid, makeStyles, TextField, Button ,InputLabel } from "@material-ui/core";
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import * as TYPE from '../store/Action/action'

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function Home(props) {
  const classes = useStyles();
  const history = useHistory();

  const createRoomHandler = async(e)=>{
    try{
       await props.createRoom();
      history.push('/editor')
    }catch(err){
      console.log(err);
    }
  }
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ minHeight: "100vh", backgroundColor: "#1f273d" }}
    >
      <Grid
        container
        direction="column"
        justify="space-around"
        alignItems="center"
        style={{
          backgroundColor: "#f2f2f2",
          minHeight: "65vh",
          width: "60vh",
          borderRadius: "20px",
          padding:'10vh'
        }}
      >
      <Grid>
        <InputLabel style={{marginBottom:'2vh',color:'black',fontWeight:'bold'}}>Username</InputLabel>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            style={{
              backgroundColor: "#f2f2f2",
            }}
          />
      </Grid>
      <Grid>
      <InputLabel style={{margin:'2vh 0 0 0',color:'black',fontWeight:'bold'}}>Room</InputLabel>
        <TextField
          id="outlined-basic"
          label="Room Name"
          variant="outlined"
          style={{
            backgroundColor: "#f2f2f2",
            marginTop: "2vh",
          }}
        />
      </Grid>

        <Button
          variant="contained"
          style={{
            backgroundColor: "#1f273d",
            color: "#fff",
            marginTop: "2vh",
            padding:'2vh',
            width:'30vh'
          }}
          onClick={createRoomHandler}
        >
          Join / Create
        </Button>
      </Grid>

    </Grid>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    createRoom: () => dispatch({ type: TYPE.CREATE_ROOM}),
  };
};

export default connect(null, mapDispatchToProps)(Home);
