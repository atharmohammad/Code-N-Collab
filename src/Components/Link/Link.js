import React ,{useState,useEffect} from 'react';
import { Grid, Typography } from "@material-ui/core";
import {useLocation} from 'react-router-dom'

export default function Link(props) {
  const location = useLocation();
  const [path,setPath] = useState();

  useEffect(()=>{
      const current = window.location.href;
      const searchParams = new URLSearchParams(location.search);
      if(searchParams.has("room")){
        const place = current.split('?')[0] + '?room=' + searchParams.get("room");
        setPath(place);
      }
  })

  return (
    <Grid
      container
      direction="row"
      justify="flex-end"
      alignContent="flex-end"
      style={{
        top: "0",
        right: "0",
        position: "absolute",
        margin: "1vh 5vh 1vh 1vh",
      }}
    >
      <Typography
        style={{ marginRight: "4vh", color: "#fff", fontSize: "20px" }}
      >
        Link
      </Typography>
      <div
        style={{
          width: "70vh",
          backgroundColor: "#fff",
          minHeight: "4vh",
          border: "2px double #fff",
          borderRadius: "10px",
          padding: ".5vh 0 0 1vh",
        }}
      >
        {path}
      </div>
    </Grid>
  );
}
