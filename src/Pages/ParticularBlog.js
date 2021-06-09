import { useEffect, useState } from "react";
import { Grid, Box, Button, Typography, Avatar } from "@material-ui/core";
import CurrentBlog from "../Components/Blogs/CurrentBlog";
import { connect } from "react-redux";
import * as TYPES from "../store/Action/action";
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
              width: "70vw",
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
