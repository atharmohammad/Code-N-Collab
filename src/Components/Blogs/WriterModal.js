import { useEffect, useState } from "react";
import { Grid, Typography, Tooltip, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import SendIcon from "@material-ui/icons/Send";
import CancelIcon from "@material-ui/icons/Cancel";
import classes from './blogs.module.css'
import axios from "../../Axios/axios"

const WriterModal = (props) => {
  const { cancelHandler, parentId} = { ...props };
  const [body,setBody] = useState("")

  const submitHandler = async()=>{

    try{
      await axios.post(`/comment/createComment/${parentId}`,{Body:body});
    }catch(e){
      console.log(e);
    }
  }

  return (
    <>
      <Grid
        onClick={props.cancelHandler}
        className={classes.backdrop}

      ></Grid>
      <Grid
      className={classes.modal}
      >
        <div style={{ height: "100%", width: "100%" }}>
          <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              className={classes.textArea}
          ></textarea>
          <div
           className={classes.toolTipGrid}
          >
            <Tooltip title="cancel" onClick={props.cancelHandler}>
              <IconButton>
                <CancelIcon style={{ cursor: "pointer", color: "#fff" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Post" onClick={submitHandler}>
              <IconButton>
                <SendIcon style={{ cursor: "pointer", color: "#fff" }} />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </Grid>
    </>
  );
};

export default WriterModal;
