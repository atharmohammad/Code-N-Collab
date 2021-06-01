import { useState, useEffect, useRef } from "react";
import { Grid, Tooltip, IconButton } from "@material-ui/core";
import { connect } from "react-redux";
import ReactMarkdown from "react-markdown";
import HelperIcons from "./HelperIcons";

import axios from "../../Axios/axios";
import TextEditor from "../TextEditor/TextEditor";
import BlogSpinner from "../Spinner/BlogSpinner";
import WriterModal from "./WriterModal";

import * as TYPES from "../../store/Action/action";

const CurrentBlog = (props) => {
  const [deleted, setDeleted] = useState(false);
  const [editBlog, setEditBlog] = useState(false);
  const [showWriter, setShowWriter] = useState(false);
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
    return <BlogSpinner />;
  }

  return (
    <>
      <div
        style={{
          alignItems: "center",
          padding: "15px",
          marginTop: "30px",
          display: "flex",
          flexDirection: "column",
          border: "2px solid grey",
          background: "#fff",
          zIndex: "2",
          fontFamily: ["Baloo Tammudu 2", "cursive"].join(" "),
          lineHeight: "170%",
          fontSize: "20px",
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
              closeTextEditor={() => setEditBlog(false)}
            ></TextEditor>
          </>
        )}
        <div>
          <Grid
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "3vh",
              width: "50vw",
              gap: "100px",
            }}
          >
            <HelperIcons
              type="blog"
              showCommentHandler={props.showComment}
              showEditBtn={!editBlog}
              editHandler={() => setEditBlog(true)}
              deleteHandler={() => setDeleted(true)}
              openWriter={() => setShowWriter(true)}
            />
          </Grid>
        </div>
        {showWriter ? (
          <WriterModal cancelHandler={() => setShowWriter(false)} />
        ) : null}
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
