import { useState, useEffect, useRef } from "react";
import {
  Grid,
  Box,
  Button,
  Typography,
  Avatar,
  Tooltip,
  IconButton,
} from "@material-ui/core";

import ReactMarkdown from "react-markdown";
import SaveCancel from "./SaveCancel";
import HelperIcons from "./HelperIcons";
import WriterModal from "./WriterModal";
import UserBlogDescription from "./userBlogDescription/userBlogDescription";

const Reply = (props) => {
  const [editReply, setEditReply] = useState(false);
  const [initialReply, setInitialReply] = useState(props.replyData);
  const [deleted, setDeleted] = useState(false);
  const [showWriter, setShowWriter] = useState(false);
  const divRef = useRef();

  const deleteHandler = () => {
    setDeleted(true);
  };

  const saveHandler = () => {
    const data = divRef.current.value.trim();

    if (!data) {
      return alert("cant be empty");
    }
    setInitialReply(data);
    setEditReply(false);
  };

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
            <UserBlogDescription admin={false} />
          </div>
          {editReply === false ? (
            <div
              style={{
                background: "#fff",
                fontSize: "18px",
                padding: "15px",
              }}
            >
              <pre>
                <ReactMarkdown>{initialReply}</ReactMarkdown>
              </pre>
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
                showEditBtn={!editReply}
                editHandler={() => setEditReply(true)}
                deleteHandler={deleteHandler}
                openWriter={() => setShowWriter(true)}
              />
            </Grid>
          </Grid>
        </div>
      </div>
      <div style={{ width: "55vw", alignSelf: "center", backgorund: "red" }}>
        {showWriter ? (
          <WriterModal cancelHandler={() => setShowWriter(false)} />
        ) : null}
      </div>
    </>
  );
};

export default Reply;
