import { useState, useEffect, useRef } from "react";
import {
  Grid,
  Box,
  Button,
  Icon,
  Tooltip,
  IconButton,
} from "@material-ui/core";

import ReactMarkdown from "react-markdown";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import CommentIcon from "@material-ui/icons/Comment";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import AddIcon from "@material-ui/icons/Add";
import {useLocation} from "react-router-dom";
import axios from "../../Axios/axios"
import TextEditor from "../TextEditor/TextEditor"

import BlogSpinner from "../Spinner/BlogSpinner";

import { connect } from "react-redux";
import * as TYPES from "../../store/Action/action";

const CurrentBlog = (props) => {
  const titleRef = useRef();
  const bodyRef = useRef();
  const location = useLocation();
  const [deleted, setDeleted] = useState(false);
  const [editBlog, setEditBlog] = useState(false);

  const [initialBlog, setInitialBlog] = useState(null);
  const id = window.location.pathname.split("/")[2];

  useEffect(async()=>{
    try{
      const currBlog =  await axios.get(`blogs/currentBlog/${id}`);
      setInitialBlog(currBlog.data.Body);
    }catch(e){
      console.log(e);
    }
  },[initialBlog])

  if(!initialBlog){
    return <BlogSpinner color="black"/>
  }


  return (
    <>
        
        <div
          style={{
            alignItems: "center",
            padding: "10px",
            marginTop: "30px",
            display: "flex",
            flexDirection: "column",
            borderRadius: "20px",
            border:"2px solid grey",
            background:'#fff',
            zIndex:'2',
          }}
        >
          {editBlog === false ? (
            <>
              <ReactMarkdown>{initialBlog}</ReactMarkdown>
            </>
          ) : (
            <>
              <TextEditor initialValue={initialBlog} Api= {"/blogs/currBlog/"+id} method = "patch" ></TextEditor>
            </>
          )}
          <div>
            <Grid
              container
              direction="row"
              justify="space-between"
              style={{ marginTop: "3vh", width: "30vw" }}
            >
              {editBlog === true ? (
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                >
                  <>
                    <Tooltip
                      title="cancel Changes"
                      onClick={() => setEditBlog(false)}
                    >
                      <IconButton>
                        <CancelIcon />
                      </IconButton>
                    </Tooltip>
                  </>
                </Grid>
              ) :null}
              <>
              <Tooltip title="Like/ Dislike">
                <IconButton>
                  <ThumbUpAltIcon style={{ cursor: "pointer" }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="View Comment" onClick={props.showComment}>
                <IconButton>
                  <CommentIcon style={{ cursor: "pointer" }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="write comment">
                <IconButton>
                  <AddIcon title="write comment" />
                </IconButton>
              </Tooltip>
              </>
              {editBlog === false ? (
                <Tooltip title="edit Reply" onClick={() => setEditBlog(true)}>
                  <IconButton>
                    <EditIcon style={{ cursor: "pointer" }} />
                  </IconButton>
                </Tooltip>
              ) : null}
              <Tooltip title="delete Blog" onClick={() => setDeleted(true)}>
                <IconButton>
                  <DeleteIcon style={{ cursor: "pointer" }} />
                </IconButton>
              </Tooltip>
            </Grid>
          </div>
        </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    blogPosted: () => {
      dispatch({ type: TYPES.BLOGPOSTED });
    },
    showComment: () => {
      dispatch({ type: TYPES.SHOW_COMMENTS });
    },
  };
};

export default connect(null, mapDispatchToProps)(CurrentBlog);
