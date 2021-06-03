import { useEffect, useState, useContext } from "react";
import { Grid, Box, Button } from "@material-ui/core";
import Blogs from "../Components/Blogs/Blogs";
import TextEditor from "../Components/TextEditor/TextEditor";
import Stars from "../Components/Stars/Stars";
import BlogHead from "../Components/Blogs/BlogHead";
import classes from "../Assets/css/wrapstyle.module.css";
import { AuthContext } from "../context/auth-context";
import { useHistory } from "react-router-dom";

const BlogPage = (props) => {
  const [showEditor, setShowEditor] = useState(false);
  const auth = useContext(AuthContext);
  const history = useHistory();

  const showEditorHandler = () => {
    if (!auth.token) {
      return history.push("/login?redirect" + "blogs");
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
                fontSize:'15px',
                border:'2px solid #fff'
              }}
              onClick={() => setShowEditor(false)}
            >
              X
            </Box>
            <div style={{ marginTop: "40px" }}>
              <TextEditor
                showUpdateBtn={true}
                Api="/blogs/write"
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
                boxSizing:'border-box',
              }}
              onClick={showEditorHandler}
            >
              Create Blog|+{" "}
            </Box>
          </div>
        )}
        <Blogs />
      </Grid>
    </div>
  );
};

export default BlogPage;
