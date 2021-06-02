import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../context/auth-context";
import axios from "../Axios/axios";
import { useHistory } from "react-router-dom";
import Icon from "../Assets/images/Icon.png";
import Title from "../Assets/images/currBlog.png";
import Gmail from "../Assets/images/Gmail.png";
import Back from "../Components/Back/Back";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import BlogSpinner from "../Components/Spinner/BlogSpinner";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:3000">
        Code - N - Collab
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "black",
    border: "10px double gray",
    padding: "7vh 10vh 4vh 10vh",
    borderRadius: "20px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    color: "black",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontWeight: "bold",
    border: "2px solid black",
    borderRadius: "10px",
  },
  gmail: {
    margin: "2px 0 10px 0",
    border: "2px solid red",
    color: "black",
    display: "flex",
    alignItems: "center",
    background: "#fff",
    borderRadius: "10px",
    fontWeight: "bold",
    justifyContent: "space-around",
    padding: "8px 90px 8px 90px",
  },
}));

const SignIn = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const validateEmail = () => {
      const mailformat =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (email.toLowerCase().match(mailformat)) setEmailValid(true);
      else setEmailValid(false);
    };
    if (emailValid !== null || email) {
      validateEmail();
    }
  }, [email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    let ok = true;

    if (emailValid === null || !emailValid) {
      ok &= false;
      return setError("Invalid Email");
    }

    if (password === null || password.trim() === "") {
      ok &= false;
      setPassword("");
      return setError("Password must not be empty");
    }

    if (password.trim().length < 6) {
      ok &= false;
      return setError("Length of Password must be atleast 6");
    }

    let res = null;

    try {
      setLoading(true);
      res = await axios.post("/user/login", {
        Email: email.trim(),
        Password: password.trim(),
      });
    } catch (e) {
      console.log(e);
      setLoading(false);
      return setError("oops some thing went wrong");
    }
    console.log("login res", res);
    auth.login(res.data.user, res.data.token);
    history.push("/homepage");
  };

  const backHandler = () => {
    history.push("/homepage");
  };

  return !loading ? (
    <>
      <div style={{ background: "#fff", height: "90vh", marginTop: "10px" }}>
        <div
          style={{ position: "fixed", left: "10px", top: "5px", zIndex: "2" }}
        >
          <Back clicked={backHandler} />
        </div>
        <Container component="main" maxWidth="sm">
          <div className={classes.paper}>
            <img
              src={Title}
              style={{ height: "70%", width: "70%" }}
              alt="Code-N-Collab"
            />
            <img
              src={Icon}
              style={{
                height: "15%",
                width: "15%",
                marginTop: "10px",
                boxSizing: "border-box",
              }}
              alt="Login"
            />
            <Typography
              component="h1"
              variant="h5"
              style={{ color: "black", marginTop: "1vh" }}
            >
              Login
            </Typography>
            <form className={classes.form} noValidate onSubmit={submitHandler}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={emailValid === false ? true : false}
                onChange={(event) => setEmail(event.target.value)}
              />
              <TextField
                variant="outlined"
                value={password}
                color="primary"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={password === "" ? true : false}
                onChange={(event) => setPassword(event.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                Login
              </Button>
              <div style={{ textAlign: "center", fontWeight: "bold" }}>OR</div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.gmail}
              >
                <img
                  src={Gmail}
                  style={{ height: "100%", width: "20%" }}
                  alt="login via gmail"
                />
                {"   "}Sign in with Gmail
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
            <Box mt={2}>
              <Copyright />
            </Box>
          </div>
        </Container>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={error !== null}
        autoHideDuration={8000}
        onClose={() => setError(null)}
      >
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </>
  ) : (
    <BlogSpinner
      spinneredStyle={{
        borderTop: "1em solid black",
        position: "fixed",
        top: "35%",
      }}
      headedStyle={{
        background:'black',
      }}
    />
  );
};
export default SignIn;
