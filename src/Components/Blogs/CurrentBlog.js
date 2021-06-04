import { useState, useEffect, useRef } from "react";
import { Grid, Tooltip, IconButton } from "@material-ui/core";
import { connect } from "react-redux";
import ReactMarkdown from "react-markdown";
import HelperIcons from "./HelperIcons";

import axios from "../../Axios/axios";
import TextEditor from "../TextEditor/TextEditor";
import BlogSpinner from "../Spinner/BlogSpinner";
import WriterModal from "./WriterModal";
import UserBlogDescription from "./userBlogDescription/userBlogDescription";
import Comments from "./Comments"

import * as TYPES from "../../store/Action/action";

const CurrentBlog = (props) => {
  const [deleted, setDeleted] = useState(false);
  const [editBlog, setEditBlog] = useState(false);
  const [showWriter, setShowWriter] = useState(false);
  const [initialBlog, setInitialBlog] = useState(null);
  const [showComment,setShowComment] = useState(false);
  const id = window.location.pathname.split("/")[2];

  useEffect(async () => {
    try {
      const currBlog = await axios.get(`blogs/currentBlog/${id}`);
      setInitialBlog(currBlog.data.Body);
    } catch (e) {
      console.log(e);
    }
  }, []);

  if (!initialBlog) {
    return <BlogSpinner />;
  }

  const deleteHandler = async() => {
    if (window.confirm("Are you sure you want to delete this Blog")) {

    }
  };

  const showCommentHandler = async()=>{
    if(!showComment){
      try{
        const data = await axios.get(`/comment/getComments/${id}`);
        console.log(data);
        setShowComment(true)
      }catch(e){
        console.log(e)
      }
    }else{
      setShowComment(false);
    }
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
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                background: "#fff",
              }}
            >
              <UserBlogDescription admin={false} />
            </div>
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
              showCommentHandler={showCommentHandler}
              showEditBtn={!editBlog}
              editHandler={() => setEditBlog(true)}
              deleteHandler={deleteHandler}
              openWriter={() => setShowWriter(true)}
            />
          </Grid>
        </div>
        {showWriter ? (
          <WriterModal cancelHandler={() => setShowWriter(false)} />
        ) : null}
      </div>
      <div
        style={{
          marginTop: "10px",
          background: "grey",
          boxShadow: "5px 5px 20px black",
          borderRadius: "10px",
        }}
      >
        {showComment ? <Comments /> : null}
      </div>
    </>
  );
};




const mapDispatchToProps = (dispatch) => {
  return {
    blogPosted: () => {
      dispatch({ type: TYPES.BLOGPOSTED });
    },
  };
};

export default connect(null, mapDispatchToProps)(CurrentBlog);
