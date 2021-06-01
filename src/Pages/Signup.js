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
import Title from "../Assets/images/currBlog.png"
import Gmail from "../Assets/images/Gmail.png"
import Back from "../Components/Back/Back"


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
    fontWeight:'bold',
    border:'2px solid black',
    borderRadius:'10px',
  },
  gmail:{
    margin:'2px 0 10px 0',
    border:'2px solid red',
    color:'black',
    display:'flex',
    alignItems:'center',
    background:'#fff',
    borderRadius:'10px',
    fontWeight:'bold',
    justifyContent:'space-around',
    padding:'8px 250px 8px 250px'
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

  const backHandler = ()=>{
    history.push('/homepage');
  }

  return (
    <>
      <div style={{background: '#fff',minHeight:'100vh',marginBottom:'5vh'}}>
        <Back clicked={backHandler} />
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <div className={classes.paper}>
              <img src={Title} style={{height:'40%',width:'40%'}} alt="Code-N-Collab" />
              <img src={Icon} style={{height:"8%" , width:"8%" ,marginTop:'1vh'}} alt="Login" />
            <Typography component="h1" variant="h5" style={{color:'black',marginTop:'1vh'}}>
              Sign Up
            </Typography>
            <form className={classes.form} noValidate onSubmit={submitHandler}>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="Name"
                label="UserName"
                name="UserName"
                autoComplete="UserName"
                autoFocus
                style={{width:'30%'}}
                error={emailValid === false ? true : false}
                onChange={(event) => setEmail(event.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="Email"
                label="Email Adress"
                name="Email"
                autoComplete="Email"
                autoFocus
                style={{width:'67%',}}
                error={emailValid === false ? true : false}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
            <TextField
              variant="outlined"
              margin="normal"
              id="Codeforces"
              label="Codeforces Handle"
              placeholder="Codeforces UserName"
              name="CodeforcesHandle"
              autoComplete="CodeforcesHandle"
              style={{width:'48%'}}
              autoFocus
              error={emailValid === false ? true : false}
              onChange={(event) => setEmail(event.target.value)}
            />

              <TextField
                variant="outlined"
                margin="normal"
                style={{width:'48%',}}
                id="Designation"
                label="Designation"
                placeholder="eg: software-dev ,Competitive Coder ,etc"
                name="Designation"
                autoComplete="Designation"
                autoFocus
                error={emailValid === false ? true : false}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
              <TextField
                variant="outlined"
                value={password}
                color='primary'
                margin="normal"
                required
                name="password"
                label="Password"
                type="password"
                id="password"
                style={{width:'48%',}}
                autoComplete="current-password"
                error={password === "" ? true : false}
                onChange={(event) => setPassword(event.target.value)}

              />
              <TextField
                variant="outlined"
                value=""
                color='primary'
                margin="normal"
                required
                fullWidth
                name="ConfirmPassword"
                label="Confirm-Password"
                type="password"
                id="ConfirmPassword"
                style={{width:'48%',}}
                autoComplete="current-password"
                error={password === "" ? true : false}
                onChange={(event) => setPassword(event.target.value)}

              />
              </div>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className={classes.submit}
                >
                  SignUp
                </Button>
                  <div style={{textAlign:'center',fontWeight:'bold'}}>OR</div>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className={classes.gmail}
                >
                  <img src={Gmail} style={{height:'20%',width:'15%'}} alt="singup via gmail" />
                   {"   "}Sign up with Gmail
                </Button>
                  <Grid item>
                    <Link href="/login" variant="body2">
                      {"Already have an account? Sign in"}
                    </Link>
                </Grid>
            </form>
            <Box mt={2}>
              <Copyright />
            </Box>
          </div>
        </Container>
      </div>
    </>
  );
};
export default SignIn;
