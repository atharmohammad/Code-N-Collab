import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Grid } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";

import HelperIcons from "./HelperIcons";
import axios from "../../Axios/axios";
import TextEditor from "../TextEditor/TextEditor";
import BlogSpinner from "../Spinner/BlogSpinner";
import WriterModal from "./WriterModal";
import UserBlogDescription from "./userBlogDescription/userBlogDescription";
import Comment from "./Comment";
import classes from "./blogs.module.css";

const CurrentBlog = (props) => {
  const [editBlog, setEditBlog] = useState(false);
  const [showWriter, setShowWriter] = useState(false);
  const [blog, setBlog] = useState(null);
  const [showComment, setShowComment] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [blogLoading, setBlogLoading] = useState(true);
  const [totalCommentLength, setTotalCommentLength] = useState(0);
  const [comments, setComments] = useState([]);
  const [dummy, setDummy] = useState(uuidv4());

  let id;

  try {
    id = window.location.pathname.split("/")[2];
  } catch (e) {
    alert("Window location pathname error!  try again!")
  }

  const history = useHistory();

  useEffect(async () => {
    setBlogLoading(true);
    try {
      const currBlog = await axios.get(`blogs/currentBlog/${id}`);
      if (!currBlog.data.Body || !currBlog.data.User) {
        throw new Error("bad request");
      }
      setBlog(currBlog.data);
      setTotalCommentLength(currBlog.data.Comments.length);
    } catch (e) {
      alert("Get currrentBlog error!  try again!")
    }
    setEditBlog(false);
    setBlogLoading(false);
  }, []);

  function resizeImageForMarkdown(props) {
    return (
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <img {...props} style={{ maxWidth: "80%" }} />
      </div>
    );
  }

  const deleteHandler = async () => {
    if (window.confirm("Are you sure you want to delete this Blog ?")) {
      try {
        await axios.delete(`/blogs/delete/${id}`);
        history.push("/blogs");
      } catch (e) {
        alert("Delete blog error!  try again!")
      }
    }
  };

  const fetchBlog = async () => {
    if (blogLoading) {
      return;
    }
    setBlogLoading(true);
    try {
      const currBlog = await axios.get(`blogs/currentBlog/${id}`);
      if (!currBlog.data.Body || !currBlog.data.User) {
        throw new Error("bad request");
      }
      setBlog(currBlog.data);
    } catch (e) {
      alert("Get blog error! try again!")
    }
    setEditBlog(false);
    setBlogLoading(false);
  };

  const fetchComment = async () => {
    if (commentLoading) {
      return;
    }
    setCommentLoading(true);
    try {
      setShowComment(true);
      const data = await axios.get(`/comment/getComments/${id}`);
      setComments(data.data.Comments);
      setDummy(uuidv4());
    } catch (e) {
      alert("Get comment error!  try again!")
    }
    setCommentLoading(false);
  };

  const toggleCommentHandler = async () => {
    if (!showComment) {
      fetchComment();
    } else {
      setShowComment(false);
    }
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
          borderRadius: "20px",
        }}
      >
        {editBlog === false ? (
          <>
            <UserBlogDescription
              admin={{ User: blog.User }}
              date={blog.createdAt}
            />
              <ReactMarkdown renderers={{ image: resizeImageForMarkdown }} children={blog.Body} />
          </>
        ) : (
          <>
            <TextEditor
              initialValue={blog.Body}
              Api={"/blogs/currBlog/" + id}
              method="patch"
              closeTextEditor={() => setEditBlog(false)}
              postBtnClick={() => setBlogLoading(true)}
              fetchBlog={fetchBlog}
            ></TextEditor>
          </>
        )}
        <div>
          <Grid className={classes.IconsMainGrid}>
            <HelperIcons
              type="blog"
              toggleCommentHandler={toggleCommentHandler}
              showEditBtn={!editBlog}
              admin={{ User: blog.User }}
              editHandler={() => setEditBlog(true)}
              deleteHandler={deleteHandler}
              openWriter={() => setShowWriter(true)}
              commentsLength={totalCommentLength}
              likeArray={blog.Likes}
              likeRoute={"/blogs/like/" + id}
            />
          </Grid>
        </div>
      </div>
      <div
        style={{
          margin: "10px 0 100px 0",
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
              <div
                style={{
                  margin: "30px 10px 30px 10px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div>
                  {comments.map((item, key) => (
                    <Comment comment={item} key={key} dummy={dummy} />
                  ))}
                </div>
              </div>
            </>
          )
        ) : null}
      </div>
      {showWriter ? (
        <WriterModal
          Api="/comment/createComment/"
          parentId={id}
          fetchData={() => {
            setTotalCommentLength((state) => state + 1);
            fetchComment();
          }}
          cancelHandler={() => setShowWriter(false)}
        />
      ) : null}
    </>
  );
};

export default CurrentBlog;
