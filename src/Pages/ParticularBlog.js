import React from "react";
import CurrentBlog from "../Components/Blogs/CurrentBlog";
import classes from "../Assets/css/wrapstyle.module.css";
import Stars from "../Components/Stars/Stars";
import BlogHead from "../Components/Blogs/BlogHead";

const ParticularBlog = (props) => {
  return (
    <>
      <div className={classes.wrap}>
        <Stars color="#fff" />
        <BlogHead back="/blogs" />
        <div
          style={{ background: "#18191a", opacity: "1", minHeight: "100vh" }}
        >
          <div
            style={{
              width: "95vw",
              maxWidth: "1000px",
              margin: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CurrentBlog />
          </div>
        </div>
      </div>
    </>
  );
};

export default ParticularBlog;
