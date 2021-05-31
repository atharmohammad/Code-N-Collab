import { useState, useEffect } from "react";
import { Grid, Box, Button, Typography, Avatar } from "@material-ui/core";
import axios from "../../Axios/axios";
import BlogSpinner from "../Spinner/BlogSpinner";
import ReactMarkdown from "react-markdown";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import UserBlogDescription from "./userBlogDescription/userBlogDescription";

function Blogs(props) {
    const [blogs, setBlogs] = useState([]);
    const history = useHistory();

  const onClickHandler = (blogId)=>{
    return history.push("/blog/" + blogId);
  }

  useEffect(() => {
    axios
      .get("blogs/Allblogs")
      .then((res) => {
        console.log(res.data);
        setBlogs(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [props.blogPosted]);

  let allBlogs = <BlogSpinner />;

  if (blogs.length >= 1) {
    allBlogs = blogs.map((item) => {
      return (
        <Grid
          key={item._id}
          style={{
            border: "2px solid #e2e2e2",
            padding: "1vh",
            minHeight: "16vh",
            width: "100vh",
            marginTop: "3vh",
            backgroundColor: "#fff",
            borderRadius: "5px",
            cursor:"pointer"
          }}
          onClick={() => onClickHandler(item._id)}
        >
          <UserBlogDescription admin={item} />
          <Grid style={{ marginTop: "1vh" }}>
            <Typography>
              <ReactMarkdown>{item.Body}</ReactMarkdown>
            </Typography>
          </Grid>
        </Grid>
      );
    });
  }
  return <div>{allBlogs}</div>;
}

const mapStateToProps = (state) => {
  return {
    blogPosted: state.tools.blogPosted,
  };
};

export default connect(mapStateToProps, null)(Blogs);
