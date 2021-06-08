import { useState, useEffect, useContext } from "react";
import { Grid, Box, Button, Typography, Avatar } from "@material-ui/core";
import axios from "../../Axios/axios";
import { useHistory } from "react-router-dom";
import Spinner from "../Spinner/BlogSpinner";
import ReactMarkdown from "react-markdown";
import UserBlogDescription from "./userBlogDescription/userBlogDescription";
import HelperIcons from "./HelperIcons";
import { AuthContext } from "../../context/auth-context";

export default function SingleBlog(props) {
  const blog = props.blog;
  const history = useHistory();
  const [spinner, setSpinner] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [viewerLiked, setViewerLiked] = useState(false);
  const [likesLength, setlikesLength] = useState(blog.Likes.length);
  const auth = useContext(AuthContext);

  useEffect(() => {
    if(auth.user){
      const isUserLiked = blog.Likes.find(
        (like) => like.toString().trim() == auth.user._id.toString().trim()
      );
      if (isUserLiked) {
        setViewerLiked(true);
      }
    }

  }, []);

  const onClickHandler = () => {
    return history.push("/blog/" + blog._id);
  };

  const deleteHandler = async () => {
    if (window.confirm("Are you sure you want to delete this Blog")) {
      setSpinner(true);
      try {
        await axios.delete("/blogs/delete/" + blog._id);
        setDeleted(true);
      } catch (e) {
        alert("delete error");
      }
      setSpinner(false);
    }
  };

  const likeHandler = async () => {
    if (!viewerLiked) {
      setlikesLength((state) => state + 1);
    } else {
      setlikesLength((state) => state - 1);
    }

    try {
      await axios.post("/blogs/like/" + blog._id);
      setViewerLiked((state) => !state);
    } catch (e) {
      alert("error liking");
      if (!viewerLiked) {
        setlikesLength((state) => state - 1);
      } else {
        setlikesLength((state) => state + 1);
      }
    }
  };

  if (spinner) {
    return <Spinner />;
  }

  if (deleted) {
    return <></>;
  }

  return (
    <div
      style={{
        border: "10px double #fff",
        padding: "10px",
        marginTop: "20px",
        borderRadius: "20px",
      }}
    >
      <Grid
        key={blog._id}
        style={{
          padding: "1vh",
          minHeight: "16vh",
          width: "100vh",
          background: "#fff",
          borderRadius: "20px",
        }}
      >
        <UserBlogDescription admin={{ User: blog.User }} />
        <Grid
          style={{ marginTop: "1vh", cursor: "pointer" }}
          onClick={onClickHandler}
        >
          <Typography>
            <ReactMarkdown>{blog.Body}</ReactMarkdown>
          </Typography>
        </Grid>
        <Grid container direction="row" justify="flex-end">
          <HelperIcons
            type="blog"
            allBlogPage={true}
            admin={{ User: blog.User }}
            deleteHandler={deleteHandler}
            likeHandler={likeHandler}
            likesLength={likesLength}
            commentsLength={blog.Comments.length}
          />
        </Grid>
      </Grid>
    </div>
  );
}
