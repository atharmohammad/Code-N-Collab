import { useState, useEffect } from "react";
import { Grid, Box, Button, Typography, Avatar } from "@material-ui/core";
import CurrentBlog from "../Components/Blogs/CurrentBlog";
import Comments from "../Components/Blogs/Comments";
import { connect } from "react-redux";
import * as TYPES from "../store/Action/action";

const ParticularBlog = (props) => {
  useEffect(() => {
    props.resetShowComment();
  }, []);

  return (
    <>
    <div style={{background:'white',height:'100%',minHeight:'100vh',}}>
      <div
        style={{
          width: "80vw",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CurrentBlog _id={123} />
        <div style={{background:'grey'}}>{props.showComment ? <Comments _id={123} /> : null}</div>
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
