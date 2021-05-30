import { useState, useEffect, useRef } from "react";
import { Grid, Tooltip, IconButton } from "@material-ui/core";
import { connect } from "react-redux";
import ReactMarkdown from "react-markdown";
import HelperIcons from './HelperIcons'

import axios from "../../Axios/axios";
import TextEditor from "../TextEditor/TextEditor";
import BlogSpinner from "../Spinner/BlogSpinner";
import * as TYPES from "../../store/Action/action";



const CurrentBlog = (props) => {
  const [deleted, setDeleted] = useState(false);
  const [editBlog, setEditBlog] = useState(false);

  const [initialBlog, setInitialBlog] = useState(null);
  const id = window.location.pathname.split("/")[2];

  useEffect(async () => {
    try {
      const currBlog = await axios.get(`blogs/currentBlog/${id}`);
      setInitialBlog(currBlog.data.Body);
    } catch (e) {
      console.log(e);
    }
  }, [initialBlog]);

  if (!initialBlog) {
    return <BlogSpinner color="black" />;
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
          border: "2px solid grey",
          background: "#fff",
          zIndex: "2",
        }}
      >
        {editBlog === false ? (
          <>
            <ReactMarkdown>{initialBlog}</ReactMarkdown>
          </>
        ) : (
          <>
            <TextEditor
              initialValue={initialBlog}
              Api={"/blogs/currBlog/" + id}
              method="patch"
            ></TextEditor>
          </>
        )}
        <div>
          <Grid
            container
            direction="row"
            justify="space-between"
            style={{ marginTop: "3vh", width: "30vw" }}
          >
            <HelperIcons
              type="blog"
              showCommentHandler={props.showComment}
              showEditBtn={!editBlog}
              editHandler={()=>setEditBlog(true)}
              deleteHandler={() => setDeleted(true)}
            />
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
