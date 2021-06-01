import { useEffect, useState } from "react";
import { Grid, Box, Button } from "@material-ui/core";
import Blogs from "../Components/Blogs/Blogs";
import TextEditor from "../Components/TextEditor/TextEditor";
import Stars from "../Components/Stars/Stars";
import BlogHead from "../Components/Blogs/BlogHead";
import classes from "../Assets/css/wrapstyle.module.css";

const BlogPage = (props) => {
  const [showEditor, setShowEditor] = useState(false);
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
                width: "80px",
                height: "40px",
                background: "#d82828",
                borderRadius: "5px",
                padding: "0 5px 0 5px",
                textAlign: "center",
                color: "#fff",
                marginTop: "1vh",
                float: "right",
                cursor: "pointer",
                textAlign:'center'
              }}
             onClick={()=>setShowEditor(false)}
            >
              Cancel
            </Box>
            <div style={{marginTop:'40px'}}>
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
                width: "100px",
                height: "40px",
                backgroundColor: "#4169E1",
                borderRadius: "5px",
                padding: "0 5px 0 5px",
                textAlign: "center",
                color: "#fff",
                marginTop: "1vh",
                float: "right",
                cursor: "pointer",
                textAlign:'center'
              }}
             onClick={()=>setShowEditor(true)}
            >
              Create Blog +{" "}
            </Box>
          </div>
        )}
        <Blogs />
      </Grid>
    </div>
  );
};

export default BlogPage;
