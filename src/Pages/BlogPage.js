import { useEffect, useState, useContext, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  Grid,
  Box,
} from "@material-ui/core";

import TextEditor from "../Components/TextEditor/TextEditor";
import Stars from "../Components/Stars/Stars";
import BlogHead from "../Components/Blogs/BlogHead";
import classes from "../Assets/css/wrapstyle.module.css";
import BlogSpinner from "../Components/Spinner/BlogSpinner";
import SingleBlog from "../Components/Blogs/SingleBlog";
import axios from "../Axios/axios";
import { AuthContext } from "../context/auth-context";

const BlogPage = (props) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [showEditor, setShowEditor] = useState(false);
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [blogs, setBlogs] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [sortBy, setSortBy] = useState(
    searchParams.has("sortBy") ? searchParams.get("sortBy") : "creationTime"
  );
  const [skip, setSkip] = useState(
    searchParams.has("skip") ? parseInt(searchParams.get("skip")) : 0
  );
  const [posted, setPosted] = useState(false);
  const skipLimit = 10; 

  useEffect(async () => {
    fetchBlogs();
  }, [skip, sortBy, posted]);

  const fetchBlogs = async () => {
    setBlogsLoading(true);
    try {
      const res = await axios.get(
        `blogs/Allblogs?sortBy=${sortBy}&skip=${skip}`
      );
      setBlogs(res.data);
    } catch (e) {
      alert("error", e);
    }
    setBlogsLoading(false);
  };

  const showMoreBlogs = useCallback(() => {
    history.push(`/blogs?sortBy=${sortBy}&skip=${skip + skipLimit}`);
    setSkip((prev) => prev + skipLimit);
  },[history,sortBy,skip]);

  const showLessBlogs = useCallback(async () => {
    if (skip >= skipLimit) {
      history.push(`/blogs?sortBy=${sortBy}&skip=${skip - skipLimit}`);
      setSkip((prev) => prev - skipLimit);
    }
  },[history,sortBy,skip]);

  const setSortValue = useCallback((val) => {
    history.push(`/blogs?sortBy=${val}&skip=${skip}`);
    setSortBy(val);
  },[skip]);

  const showEditorHandler = useCallback(() => {
    if (!auth.token) {
      return history.push({
        pathname: "/homepage",
        state: { error: "Login Required !" },
      });
    }
    return setShowEditor(true);
  },[]);

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
          padding: "0 0 5vw 0",
          background: "#18191a",
        }}
      >
        <BlogHead />

        {showEditor ? (
          <div style={{ width: "80vw", maxWidth: "800px" }}>
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
                fetchBlog={() => {
                  history.push(`/blogs?sortBy=creationTime&skip=0`);
                  setSkip(0);
                  setSortBy("creationTime");
                  setPosted((prev) => !prev);
                }}
                initialValue=""
                method="post"
              />
            </div>
          </div>
        ) : (
          <>
            <Box
              style={{
                alignSelf: "flex-end",
                width: "120px",
                height: "40px",
                backgroundColor: "#4169E1",
                borderRadius: "5px",
                padding: "5px 5px 0 5px",
                textAlign: "center",
                color: "#fff",
                margin: "10px",
                cursor: "pointer",
                textAlign: "center",
                boxSizing: "border-box",
              }}
              onClick={showEditorHandler}
            >
              Create Blog|+{" "}
            </Box>
            <select
              style={{
                alignSelf: "flex-end",
                fontSize: "18px",
                fontStyle: "italic",
                cursor: "pointer",
                padding: "5px",
                borderRadius: "10px",
                outline: "none",
                border: "5px solid blue",
                margin: "10px",
              }}
              onChange={(e) => setSortValue(e.target.value)}
            >
              <option value="creationTime" selected={sortBy == "creationTime"}>
                Recent
              </option>
              <option value="popularity" selected={sortBy == "popularity"}>
                Popularity
              </option>
            </select>
          </>
        )}
        <div>
          {blogsLoading ? (
            <BlogSpinner />
          ) : blogs.length ? (
            blogs.map((item) => <SingleBlog blog={item} key={item._id} />)
          ) : (
            <p style={{ fontSize: "25px", color: "#fff" }}>
              Oops No result found !
            </p>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent:
              skip && blogs.length > 0 ? "space-between" : "center",
            width: "80vw",
            maxWidth: "800px",
          }}
        >
          {skip ? (
            <Box
              style={{
                width: "120px",
                height: "40px",
                backgroundColor: "#4169E1",
                borderRadius: "5px",
                padding: "5px 5px 0 5px",
                textAlign: "center",
                color: "#fff",
                marginTop: "30px",
                cursor: "pointer",
                textAlign: "center",
                boxSizing: "border-box",
              }}
              onClick={showLessBlogs}
            >
              Prev
            </Box>
          ) : null}

          {blogs.length > 0 ? (
            <Box
              style={{
                width: "120px",
                height: "40px",
                backgroundColor: "#4169E1",
                borderRadius: "5px",
                padding: "5px 5px 0 5px",
                textAlign: "center",
                color: "#fff",
                marginTop: "30px",
                cursor: "pointer",
                textAlign: "center",
                boxSizing: "border-box",
              }}
              onClick={showMoreBlogs}
            >
              Next
            </Box>
          ) : null}
        </div>
      </Grid>
    </div>
  );
};

export default BlogPage;
