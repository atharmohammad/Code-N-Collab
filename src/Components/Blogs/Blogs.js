import { useState, useEffect } from "react";
import { Grid, Box, Button, Typography, Avatar } from "@material-ui/core";
import axios from "../../Axios/axios";
import BlogSpinner from "../Spinner/BlogSpinner";
import ReactMarkdown from "react-markdown";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import UserBlogDescription from "./userBlogDescription/userBlogDescription";
import HelperIcons from "./HelperIcons";
import * as TYPES from "../../store/Action/action";

function Blogs(props) {
  const [blogs, setBlogs] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(true);

  const history = useHistory();

  const onClickHandler = (blogId) => {
    return history.push("/blog/" + blogId);
  };

  const deleteHandler = (blogId) => {
    if (window.confirm("Are you sure you want to delete this Blog")) {
      axios
        .delete("/blogs/delete/" + blogId)
        .then((res) => {
          props.deleteBlog();
          console.log("deleted");
        })
        .catch((e) => alert("delete error"));
    }
  };

  useEffect(() => {
    if (props.blogPosted) {
      setBlogsLoading(true);
      axios
        .get("blogs/Allblogs")
        .then((res) => {
          console.log(res.data);
          setBlogs(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
      setBlogsLoading(false);
      props.fetchBlog(false);
    }
  }, [props.blogPosted]);

  let allBlogs = <BlogSpinner />;

  if (!blogsLoading) {
    allBlogs = blogs.map((item) => {
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
            key={item._id}
            style={{
              border: "2px double #e2e2e2",
              padding: "1vh",
              minHeight: "16vh",
              width: "100vh",
              backgroundColor: "#fff",
              borderRadius: "20px",
              cursor: "pointer",
            }}
          >
            <UserBlogDescription admin={{ User: item.User }} />
            <Grid
              style={{ marginTop: "1vh" }}
              onClick={() => onClickHandler(item._id)}
            >
              <Typography>
                <ReactMarkdown>{item.Body}</ReactMarkdown>
              </Typography>
            </Grid>
            <Grid container direction="row" justify="flex-end">
              <HelperIcons
                type="blog"
                allBlogPage={true}
                admin = {{User:item.User}}
                deleteHandler={() => deleteHandler(item._id)}
              />
            </Grid>
          </Grid>
        </div>
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
