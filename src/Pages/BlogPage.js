import { useEffect, useState, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
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
  const [sortBy, setSortBy] = useState("creationTime");
  const [skip, setSkip] = useState(
    searchParams.has("skip") ? parseInt(searchParams.get("skip")) : 0
  );

  useEffect(() => {
    history.push(`/blogs?sortBy=${sortBy}&skip=${skip}`);
    fetchBlogs();
  }, [skip, sortBy]);

  const fetchBlogs = async () => {
    console.log("felthing");
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

  const showMoreBlogs = () => {
    history.push(`/blogs?sortBy=${sortBy}&skip=${skip + 5}`);
    setSkip((prev) => prev + 5);
  };

  const showLessBlogs = async () => {
    if (skip >= 5) {
      history.push(`/blogs?skip=${skip - 5}`);
      setSkip((prev) => prev - 5);
    }
  };

  const showEditorHandler = () => {
    if (!auth.token) {
      return history.push({
        pathname: "/homepage",
        state: { error: "Login Required !" },
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
          padding: "0 0 5vw 0",
          background: "#18191a",
        }}
      >
        <BlogHead back="/homePage" />

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
                fetchBlog={fetchBlogs}
                initialValue=""
                method="post"
              />
            </div>
          </div>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "80vw",
                maxWidth: "800px",
              }}
            >
              <Grid>
                <FormControl
                  style={{
                    color: "#fff",
                    fontSize: "20px",
                  }}
                >
                  <InputLabel
                    style={{
                      color: "#fff",
                      fontSize: "20px",
                    }}
                  >
                    SortBy
                  </InputLabel>
                  <Select
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      setSkip(0);
                    }}
                    style={{ color: "#fff" }}
                  >
                    <MenuItem value="creationTime" selected>
                      <em>creationTime</em>
                    </MenuItem>
                    <MenuItem value="popularity">popularity</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </div>
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
                marginTop: "30px",
                marginRight: "10px",
                cursor: "pointer",
                textAlign: "center",
                boxSizing: "border-box",
              }}
              onClick={showEditorHandler}
            >
              Create Blog|+{" "}
            </Box>
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
        <div style={{ display: "flex" }}>
          {skip > 0 ? (
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
                marginRight: "10px",
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
                marginRight: "10px",
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
