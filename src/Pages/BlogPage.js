import {useEffect} from 'react';
import {Grid,Box,Button} from '@material-ui/core';
import Blogs from '../Components/Blogs/Blogs';
import TextEditor from '../Components/TextEditor/TextEditor'
import Stars from "../Components/Stars/Stars"
import BlogHead from '../Components/Blogs/BlogHead'
import classes from "../Assets/css/wrapstyle.module.css";


const BlogPage = (props)=>{

  return(
    <div className={classes.wrap}>
      <Stars color="#fff"/>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
          style={{ minHeight: "140vh"
          , padding:'0 0 10vh 0',
        backgroundColor:'#18191a' }}>
          <BlogHead color="black" textColor="#fff" back="/homePage"/>
          <TextEditor Api="blogs/write" initialValue="" method="post"/>
          <Blogs/>
        </Grid>
    </div>
  )
}

export default  BlogPage;