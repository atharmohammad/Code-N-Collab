import { useState, useEffect } from "react";
import { Grid, Box, Button, Typography, Avatar } from "@material-ui/core";
import axios from "../../Axios/axios";
import BlogSpinner from "../Spinner/BlogSpinner";
import BlogBar from "./BlogBar";

const ParticularBlog = (props) => {
  return (
    <div
      style={{
        alignItems: "center",
        padding: "10px",
        margin:'10px 0px 10px 0px',
        display: "flex",
        flexDirection: "column",
        borderRadius:'20px',
        border:'',
        boxShadow:"5px 5px 10px #888888",
      }}
    >
      <h1>LOREM</h1>
      <div>
        What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing
        and typesetting industry. Lorem Ipsum has been the industry's standard
        dummy text ever since the 1500s, when an unknown printer took a galley
        of type and scrambled it to make a type specimen book. It has survived
        not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with
        the release of Letraset sheets containing Lorem Ipsum passages, and more
        recently with desktop publishing software like Aldus PageMaker including
        versions of Lorem Ipsum
      </div>
      <BlogBar _id={props._id} />
    </div>
  );
};

export default ParticularBlog;
