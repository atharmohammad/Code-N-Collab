import { useState, useEffect, useRef, useContext } from "react";
import { Grid } from "@material-ui/core";

import axios from "../../Axios/axios";
import ReactMarkdown from "react-markdown";
import SaveCancel from "./SaveCancel";
import HelperIcons from "./HelperIcons";
import WriterModal from "./WriterModal";
import UserBlogDescription from "./userBlogDescription/userBlogDescription";
import Spinner from "../Spinner/BlogSpinner";

const Reply = (props) => {
  const reply = props.replyData;
  const [editReply, setEditReply] = useState(false);
  const [initialReply, setInitialReply] = useState(reply.Body);
  const [deleted, setDeleted] = useState(false);
  const [showWriter, setShowWriter] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const divRef = useRef();

  const deleteHandler = async () => {
    if (window.confirm("Are you sure you want to delete this comment")) {
      setSpinner(true);
      try {
        await axios.delete("/reply/deleteReply/" + reply._id);
      } catch (e) {
        console.log(e);
      }
      setSpinner(false);
      setDeleted(true);
    }
  };

  const saveHandler = async () => {
    const data = divRef.current.value.trim();
    if (!data) {
      return alert("cant be empty");
    }
    setSpinner(true);
    try {
      const res = await axios.patch("/reply/updateReply/" + reply._id, {
        Body: data,
      });
      setEditReply(false);
      setInitialReply(res.data.Body);
    } catch (e) {
      console.log(e);
    }
    setSpinner(false);
  };

  if (spinner) {
    return (
      <div style={{ display: "flex", alignSelf: "center" }}>
        <Spinner />
      </div>
    );
  }

  if (deleted) {
    return <></>;
  }

  return (
    <>
      <div
        style={{
          width: "60vw",
          margin: "15px 0px 10px 0px",
          background: "#fff",
          borderRadius: "30px",
          padding: "10px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", background: "#fff" }}>
            <UserBlogDescription
              admin={{ User: reply.User }}
              date={reply.createdAt}
            />
          </div>
          {editReply === false ? (
            <div
              style={{
                background: "#fff",
                fontSize: "18px",
                padding: "15px",
                boxSizing: "border-box",
                overflow: "auto",
              }}
            >
              <ReactMarkdown>{initialReply}</ReactMarkdown>
            </div>
          ) : (
            <div style={{ margin: "2px" }}>
              <textarea
                ref={divRef}
                style={{
                  width: "100%",
                  minHeight: "150px",
                  resize: "vertical",
                  fontSize: "18px",
                  padding: "5px",
                  boxSizing: "border-box",
                }}
                placeHolder="Write your reply (Markdown is supported)"
              >
                {initialReply}
              </textarea>
            </div>
          )}
          <Grid
            style={{ display: "flex", marginTop: "0px", background: "#fff" }}
          >
            <Grid container direction="row" justify="flex-start">
              {editReply ? (
                <SaveCancel
                  type="reply"
                  saveHandler={saveHandler}
                  cancelHandler={() => setEditReply(false)}
                />
              ) : null}
            </Grid>

            <Grid container direction="row" justify="flex-end">
              <HelperIcons
                type="reply"
                admin={{ User: reply.User }}
                showEditBtn={!editReply}
                editHandler={() => setEditReply(true)}
                deleteHandler={deleteHandler}
                openWriter={() => setShowWriter(true)}
                likeRoute={"/reply/like/" + reply._id}
                likeArray={reply.Likes}
              />
            </Grid>
          </Grid>
        </div>
      </div>
      <div style={{ width: "55vw", alignSelf: "center", backgorund: "red" }}>
        {showWriter ? (
          <WriterModal
            Api="/reply/newReply/"
            parentId={reply.Comment}
            fetchData={props.fetchRepliesAgain}
            cancelHandler={() => setShowWriter(false)}
          />
        ) : null}
      </div>
    </>
  );
};

export default Reply;
