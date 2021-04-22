import { Box } from "@material-ui/core";
import classes from "./Buttons.module.css";

export default function Button(props) {
  return (
    <Box
      style={{
        height: "6vh",
        width: "40vh",
        border: "4px solid #fff",
        borderRadius: "20px",
        textAlign: "center",
        paddingTop: "2.3vh",
        color: "#fff",
        fontSize: "20px",
        marginTop: "5vh",
        cursor: "pointer",
        borderStyle: "double",
        borderWidth: "10px",
        fontFamily: ["edgwick Ave Display", "cursive"].join(),
      }}
      className={classes.scale}
      onClick={props.clicked}
    >
      {props.name}
    </Box>
  );
}
