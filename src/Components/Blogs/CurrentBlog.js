import { useState, useEffect, useRef } from "react";
import { Grid, Tooltip, IconButton, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import ReactMarkdown from "react-markdown";
import HelperIcons from "./HelperIcons";
import { useHistory } from "react-router-dom";
import axios from "../../Axios/axios";
import TextEditor from "../TextEditor/TextEditor";
import BlogSpinner from "../Spinner/BlogSpinner";
import WriterModal from "./WriterModal";
import UserBlogDescription from "./userBlogDescription/userBlogDescription";
import Comments from "./Comments";

import * as TYPES from "../../store/Action/action";

const CurrentBlog = (props) => {
  const [editBlog, setEditBlog] = useState(false);
  const [showWriter, setShowWriter] = useState(false);
  const [initialBlog, setInitialBlog] = useState(null);
  const [showComment, setShowComment] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [blogLoading, setBlogLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [dummy, setDummy] = useState(uuidv4());
  const [user, setUser] = useState("NA");

  const id = window.location.pathname.split("/")[2];

  const history = useHistory();

  useEffect(async () => {
    if (props.blogPosted) {
      setBlogLoading(true);
      try {
        const currBlog = await axios.get(`blogs/currentBlog/${id}`);
        setInitialBlog(currBlog.data.Body);
        setUser(currBlog.data.User);
      } catch (e) {
        console.log(e);
      }
      props.blogPostedOff(false);
      setEditBlog(false);
      setBlogLoading(false);
    }
  }, [props.blogPosted]);

  const deleteHandler = async () => {
    if (window.confirm("Are you sure you want to delete this Blog ?")) {
      try {
        await axios.delete(`/blogs/delete/${id}`);
        history.push("/blogs");
      } catch (e) {
        console.log(e);
      }
    }
  };

  const showCommentHandler = async () => {
    if (!showComment) {
      setCommentLoading(true);
      try {
        setShowComment(true);
        const data = await axios.get(`/comment/getComments/${id}`);
        setComments(data.data.Comments);
        setDummy(uuidv4());
      } catch (e) {
        console.log(e);
      }
      setCommentLoading(false);
    } else {
      setShowComment(false);
    }
  };

  const moreCommentClickHandler = () => {
    setCommentLoading(true);
    setTimeout(() => setCommentLoading(false), 2000);
  };

  const commentDeleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this comment")) {
      setCommentLoading(true);
      try{
        await axios.delete("/comment/deleteComment/" + id)
        const t = comments.filter((comment, key) => comment._id !== id);
        setComments(...t);
        setDummy(uuidv4());
      } catch (e) {
        console.log(e);
      }
    }
    setCommentLoading(false);
  };

  if (blogLoading) {
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
              <UserBlogDescription admin={{ User: user }} />
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
              updateBtnClick={() => setBlogLoading(true)}
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
              admin={{ User: user }}
              editHandler={() => setEditBlog(true)}
              deleteHandler={deleteHandler}
              openWriter={() => setShowWriter(true)}
            />
          </Grid>
        </div>
      </div>
      <div
        style={{
          marginTop: "10px",
          background: "grey",
          boxShadow: "5px 5px 20px black",
          borderRadius: "10px",
        }}
      >
        {showComment ? (
          commentLoading ? (
            <BlogSpinner />
          ) : (
            <>
              <Comments
                comments={comments}
                key={dummy}
                deleteHandler={commentDeleteHandler}
              />
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  onClick={moreCommentClickHandler}
                  style={{
                    background: "#3e2cd4",
                    color: "#fff",
                    width: "100px",
                    boxShadow: "5px 5px 5px #888888",
                    margin: "0px 10px 10px 2px",
                  }}
                >
                  More...
                </Button>
              </div>
            </>
          )
        ) : null}
      </div>
      {showWriter ? (
        <WriterModal parentId={id} cancelHandler={() => setShowWriter(false)} />
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    blogPosted: state.tools.blogPosted,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    blogPostedOff: (action) => {
      dispatch({ type: TYPES.BLOGPOSTED, value: action });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentBlog);
