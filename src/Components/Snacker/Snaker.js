import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Snacker = (props) => {
  const {
    position = { vertical: "bottom", horizontal: "left" },
    timer = 3000,
    message,
    severity,
    open,
  } = props;

  return (
    <Snackbar
      anchorOrigin={position}
      open={open}
      autoHideDuration={timer}
      onClose={props.onClose}
    >
      <Alert onClose={props.onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Snacker;
