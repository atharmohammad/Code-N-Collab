import Stars from "../Components/Stars/Stars"
import Nav from "../Components/Nav/Nav"
import Back from "../Components/Back/Back"
import {Container} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import {useHistory} from "react-router-dom"
import Title from "../Assets/images/currBlog.png"
import Github from "../Assets/images/Github.png"
import Admin from "../Components/About/Admin/Admin"
import AboutContent from "../Components/About/AboutContent"


const useStyles = makeStyles((theme) => ({

  paper: {
    display: "flex",
    flexDirection: "column",
    color: "black",
    padding: "7vh 10vh 4vh 10vh",
    borderRadius: "20px",
    boxSizing: "border-box",
    background:"#fff",
    margin:'10px'
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
            <AboutContent/>
            <div style={{width:'100%',borderRadius:'20px',padding:'5px',
            background: "radial-gradient(ellipse, #1b2735 0%, #090a0f 100%)"}}>
              <div style={{
                background:'#fff',
                borderRadius:'10px',
                margin:'10px',
                padding:'5px',
                fontSize:'25px',
                fontWeight:'bold',
                border:'2px solid gray',
                fontFamily: ["edgwick Ave Display", "cursive"].join(),}}>
                Developed By :
              </div>

              <div style={{border: "10px double white",
                display:'flex',
                justifyContent:'space-between',
                borderRadius:'20px',
                margin:'10px',
                padding:'10px'}}>

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
