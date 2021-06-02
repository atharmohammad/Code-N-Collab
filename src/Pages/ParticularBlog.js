import { useState, useEffect } from "react";
import { Grid, Box, Button, Typography, Avatar } from "@material-ui/core";
import CurrentBlog from "../Components/Blogs/CurrentBlog";
import Comments from "../Components/Blogs/Comments";
import { connect } from "react-redux";
import * as TYPES from "../store/Action/action";
import classes from "../Assets/css/wrapstyle.module.css";
import Stars from "../Components/Stars/Stars";
import BlogHead from "../Components/Blogs/BlogHead";

const ParticularBlog = (props) => {
  useEffect(() => {
    props.resetShowComment();
  }, []);

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
            <div
              style={{
                marginTop: "10px",
                background: "grey",
                boxShadow: "5px 5px 20px black",
                borderRadius: "10px",
              }}
            >
              {props.showComment ? <Comments /> : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    showComment: state.tools.showComment,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetShowComment: () => dispatch({ type: TYPES.RESET_SHOW_COMMENTS }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ParticularBlog);
