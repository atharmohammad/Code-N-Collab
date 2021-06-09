import { useEffect, useState, useContext } from "react";
import { Grid, Box, Button, Typography, Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import TextEditor from "../Components/TextEditor/TextEditor";
import Stars from "../Components/Stars/Stars";
import BlogHead from "../Components/Blogs/BlogHead";
import classes from "../Assets/css/wrapstyle.module.css";
import BlogSpinner from "../Components/Spinner/BlogSpinner";
import SingleBlog from "../Components/Blogs/SingleBlog";
import axios from "../Axios/axios";
import { AuthContext } from "../context/auth-context";


const BlogPage = (props) => {
  const [showEditor, setShowEditor] = useState(false);
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [blogs, setBlogs] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setBlogsLoading(true);
    try {
      const res = await axios.get("blogs/Allblogs");
      setBlogs(res.data);
    } catch (e) {
      alert("error", e);
    }
    setBlogsLoading(false);
  };

  const showEditorHandler = () => {
    if (!auth.token) {
      return history.push({
        pathname: "/homepage",
        state:{error:'Login Required !'},
      });
    }
    return setShowEditor(true);
  };

  return (
    <div className={classes.wrap}>
      <Stars color="#fff" />
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
        style={{
          minHeight: "140vh",
          padding: "0 0 10vh 0",
          backgroundColor: "#18191a",
        }}
      >
        <BlogHead back="/homePage" />
        {showEditor ? (
          <div style={{ width: "100vh" }}>
            <Box
              style={{
                width: "20px",
                height: "20px",
                background: "#d82828",
                borderRadius: "5px",
                padding: "0 5px 0 5px",
                textAlign: "center",
                color: "#fff",
                marginTop: "1vh",
                float: "right",
                cursor: "pointer",
                textAlign: "center",
                fontSize: "15px",
                border: "2px solid #fff",
              }}
              onClick={() => setShowEditor(false)}
            >
              X
            </Box>
            <div style={{ marginTop: "40px" }}>
              <TextEditor
                showUpdateBtn={true}
                Api="/blogs/write"
                postBtnClick={() => setShowEditor(false)}
                fetchBlog = {fetchBlogs} 
                initialValue=""
                method="post"
              />
            </div>
          </div>
        ) : (
          <div style={{ width: "100vh" }}>
            <Box
              style={{
                width: "120px",
                height: "40px",
                backgroundColor: "#4169E1",
                borderRadius: "5px",
                padding: "5px 5px 0 5px",
                textAlign: "center",
                color: "#fff",
                marginTop: "1vh",
                float: "right",
                cursor: "pointer",
                textAlign: "center",
                boxSizing: "border-box",
              }}
              onClick={showEditorHandler}
            >
              Create Blog|+{" "}
            </Box>
          </div>
        )}
        <div>
          {blogsLoading ? (
            <BlogSpinner />
          ) : (
            blogs.map((item) => <SingleBlog blog={item} />)
          )}
        </div>
      </Grid>
    </div>
  );
};

export default BlogPage;
