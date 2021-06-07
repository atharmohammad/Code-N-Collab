import { useState, useEffect } from "react";
import { Grid, Box, Button, Typography, Avatar } from "@material-ui/core";
import axios from "../../Axios/axios";
import BlogSpinner from "../Spinner/BlogSpinner";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import * as TYPES from "../../store/Action/action";
import SingleBlog from "./SingleBlog";

function Blogs(props) {
  const [blogs, setBlogs] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const history = useHistory();

  useEffect(async () => {
    if (props.blogPosted) {
      setBlogsLoading(true);
      try {
        const res = await axios.get("blogs/Allblogs");
        console.log(res.data);
        setBlogs(res.data);
      } catch (e) {
        alert("delete error", e);
      }
      setBlogsLoading(false);
      props.fetchBlog(false);
    }
  }, [props.blogPosted]);

  let allBlogs = <></>;

  if (!blogsLoading) {
    allBlogs = blogs.map((item) => {
      return <SingleBlog blog={item} />;
    });
  } else {
    return (
      <div>
        <BlogSpinner />
      </div>
    );
  }
  return <div>{allBlogs}</div>;
}

const mapStateToProps = (state) => {
  return {
    blogPosted: state.tools.blogPosted,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteBlog: () => {
      dispatch({ type: TYPES.BLOGPOSTED, value: true });
    },
    fetchBlog: (action) => {
      dispatch({ type: TYPES.BLOGPOSTED, value: action });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Blogs);
