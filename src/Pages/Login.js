import React, { useEffect, useState, useContext } from "react";
import {
  Avatar,
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
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { AuthContext } from "../context/auth-context";
import axios from "../Axios/axios";
import { useHistory } from "react-router-dom";
import Icon from "../Assets/images/Icon.png"
import Gmail from "../Assets/images/Gmail.png"


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
    color:'black',
    border:'10px double gray',
    padding:'7vh 10vh 4vh 10vh',
    borderRadius:'20px'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    color:'black'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontWeight:'bold'
  },
  gmail:{
    margin:'0 0 10px 0',
    border:'2px solid red',
    color:'black',
    display:'flex',
    alignItems:'center',
    background:'#fff',
    borderRadius:'10px',
    fontWeight:'bold',
    justifyContent:'space-around',
    padding:'8px 90px 8px 90px'
  }
}));

const SignIn = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(null);
  const [password, setPassword] = useState(null);

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

  const submitHandler = async(e) => {
    e.preventDefault();
    let ok = true;

    if (password === null || password.trim() === "") {
      ok &= false;
      setPassword("");
    }
    if (emailValid === null || !emailValid) {
      ok &= false;
      setEmailValid(false);
    }

    if (!ok) return alert("not ok");
    let res = null;

    try{
      res = await axios.post('/user/login',{Email:email.trim(),Password:password.trim()});
    }catch(e){
      return console.log(e);
    }
    console.log('login res',res.data.user);
    auth.login(res.data.user, res.data.token);
    history.push('/homepage')
  };

  return (
    <div style={{background: '#fff',height:'100vh',paddingTop:'5vh'}}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
            <img src={Icon} style={{height:"30%" , width:"30%"}} alt="Login" />
          <Typography component="h1" variant="h5" style={{color:'black',marginTop:'1vh'}}>
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
              color='primary'
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
                <p style={{textAlign:'center',fontWeight:'bold'}}>OR</p>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.gmail}
              >
                <img src={Gmail} style={{height:'100%',width:'20%'}} alt="login via gmail" />
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
  );
};
export default SignIn;
