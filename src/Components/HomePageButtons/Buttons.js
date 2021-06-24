import classes from "./Buttons.module.css";
import { Box } from "@material-ui/core";

export default function Button(props) {
  return (
    <Box
      style={{
        minHeight: "8.5vh",
        width: "80vw",
        maxWidth:'300px',
        border: "4px solid #fff",
        borderRadius: "20px",
        textAlign: "center",
        color: "#fff",
        fontSize: "20px",
        marginTop: "5vh",
        cursor: "pointer",
        borderStyle: "double",
        borderWidth: "10px",
        alignItems:'center',
        display:'flex',
        justifyContent:'center',
        fontFamily: ["Fira Sans", "sans-serif"].join(),
      }}
      className={classes.scale}
      onClick={props.clicked}
    >
      {props.name}
    </Box>
  );
}
