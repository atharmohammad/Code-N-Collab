import Stars from "../Components/Stars/Stars"
import Nav from "../Components/Nav/Nav"
import Back from "../Components/Back/Back"
import {Container} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import {useHistory} from "react-router-dom"
import Title from "../Assets/images/currBlog.png"
import Github from "../Assets/images/Github.png"
import Admin from "../Components/Admin/Admin"

const useStyles = makeStyles((theme) => ({

  paper: {
    display: "flex",
    flexDirection: "column",
    color: "black",
    padding: "7vh 10vh 4vh 10vh",
    borderRadius: "20px",
    boxSizing: "border-box",
    background:"#fff",
  },
  About:{
    color:"black",
    fontSize:"30px",
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-start',
    width:'50%',
    fontFamily: ["edgwick Ave Display", "cursive"].join(),
    marginTop:'20px'
  },

}))

export default function About(props){

  const history = useHistory();
  const classes = useStyles();

  const backHandler = ()=>{
    history.push("/homepage");
  }

  return(
      <div style={{minHeight:"110vh",paddingBottom:'30px',
          background: "radial-gradient(ellipse, #1b2735 0%, #090a0f 100%)"}}>
        <Stars/>
        <Nav/>
        <Back clicked={backHandler}/>
        <Container component="main" maxWidth="md" style={{marginTop:'30px'}}>
        <div style={{border: "10px double white",
        borderRadius:'20px',padding:'10px'}}>
          <div className={classes.paper}>
          <div  style={{display:'flex',justifyContent:'center'}}>
            <img
              src={Title}
              style={{ height: "35%", width: "50%" }}
              alt="Code-N-Collab"
            />
          </div>
            <div className={classes.About}>
              <p>About</p>
              <a title="Code-N-Collab Git Repo"
                href="https://github.com/atharmohammad/Code-N-Collab/tree/master"
                style={{width:'100%',height:'100%'}}>

                <img src={Github} alt="Github" style={{width:'20%',
                height:'10%',margin:'6% 0 0 10%'}}/>

              </a>
            </div>
            <div>
                Code - N - Collab is a Collaboration Website
                for Competitive Coders ,software developers and all those
                who love to code and collaborate with others to build new
                creative things and learn from each other
              <p>
                It has a Real-time Code editor with a feature to chat with friends,
                and discuss problems , for competitive coders , they can fetch question from
                the popular websites such as codeforces , codechef , etc
              </p>

              <p>
                It also has a lockout championShip so that friends can compete
                with each others , and also can filter type of problems they want to compete
                on.
              </p>
              <p>
                To connect with the community or share knowledge or want to ask something
                you can also post on Blogs section
              </p>
              <p>
                Code-N-Collab is an opensource and we would love to hear from you and see you collaborate with us
                to solve issues or build a new feature
              </p>
            </div>
            <div style={{width:'100%',borderRadius:'20px',padding:'5px',
            background: "radial-gradient(ellipse, #1b2735 0%, #090a0f 100%)"}}>

              <div style={{border: "10px double white",
                display:'flex',
                justifyContent:'space-between',
                borderRadius:'20px',padding:'10px'}}>

                <Admin Name="Mohd Athar"/>
                <Admin Name="Adnan Shamsi"/>

              </div>

            </div>
          </div>
        </div>
        </Container>
      </div>
  )
}
