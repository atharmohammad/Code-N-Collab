import {Grid,Box,Button,Icon} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import CommentIcon from '@material-ui/icons/Comment';
import DeleteIcon from '@material-ui/icons/Delete';

export default function BlogBar(props){
  return(
    <Grid container direction='row' justify='space-between'
     style={{marginTop:'3vh',width:'30vh'}}>
      <ThumbUpAltIcon style={{cursor:'pointer'}}/>
      <CommentIcon style={{cursor:'pointer'}}/>
      <DeleteIcon style={{cursor:'pointer'}}/>
    </Grid>
  )
}
