import { useState, useEffect } from "react";
import { Grid, Tooltip, IconButton } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";

const SaveCancel = (props) => {
  return (
    <div style={props.style}>
      <Tooltip title={`save ${props.type}`} onClick={props.saveHandler}>
        <IconButton>
          <SaveIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="cancel Changes" onClick={props.cancelHandler}>
        <IconButton>
          <CancelIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default SaveCancel;
