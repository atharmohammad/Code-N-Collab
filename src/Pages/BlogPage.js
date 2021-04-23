import {useEffect} from 'react';
import {Grid,Box,Button} from '@material-ui/core';
import Blogs from '../Components/Blogs/Blogs';
import TextEditor from '../Components/TextEditor/TextEditor'
import stars from '../Assets/css/style.module.css'
import BlogHead from '../Components/Blogs/BlogHead'
import BlogBackground from '../Assets/images/BlogsBackground.jpg'

const BlogPage = (props)=>{

  return(
    <>
      <div className={stars.stars}></div>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ minHeight: "100vh"
          , padding:'0 0 10vh 0',
        backgroundColor:'#18191a' }}>
          <BlogHead/>
          <TextEditor/>
          <Blogs/>
        </Grid>
    </>
  )
}

export default  BlogPage;
