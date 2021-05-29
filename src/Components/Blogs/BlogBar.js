import {
  Grid,
  Box,
  Button,
  Icon,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import CommentIcon from "@material-ui/icons/Comment";
import DeleteIcon from "@material-ui/icons/Delete";
import { connect } from "react-redux";
import * as TYPES from "../../store/Action/action";
import axios from "../../Axios/axios";

function BlogBar(props) {
  const deleteHandler = () => {
    axios
      .delete("blogs/delete/" + props._id)
      .then((res) => {
        props.blogPosted();
      })
      .catch((e) => console.log(e));
  };

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      style={{ marginTop: "3vh", width: "30vh" }}
    >
      <Tooltip title="Like/ Dislike">
        <IconButton>
        <ThumbUpAltIcon style={{ cursor: "pointer" }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="View Comment">
        <IconButton>
          
      <CommentIcon style={{ cursor: "pointer" }} onClick={props.showComment} />
        </IconButton>
      </Tooltip>
      <Tooltip title="delete Blog">
        <IconButton>
          
      <DeleteIcon onClick={deleteHandler} style={{ cursor: "pointer" }} />
        </IconButton>
      </Tooltip>
    </Grid>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    blogPosted: () => {
      dispatch({ type: TYPES.BLOGPOSTED });
    },
    showComment: () => {
      dispatch({ type: TYPES.SHOW_COMMENTS });
    },
  };
};

export default connect(null, mapDispatchToProps)(BlogBar);
