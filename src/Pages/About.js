import { Container } from "@material-ui/core";
import Stars from "../Components/Stars/Stars";
import Nav from "../Components/Nav/Nav";
import Back from "../Components/Back/Back";
import Title from "../Assets/images/currBlog.png";
import Github from "../Assets/images/Github.png";
import Admin from "../Components/About/Admin/Admin";
import AboutContent from "../Components/About/AboutContent";
import classes from "./pages.module.css";

export default function About(props) {

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingBottom: "20px",
        background: "radial-gradient(ellipse, #1b2735 0%, #090a0f 100%)",
      }}
    >
      <Stars />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Back/>
        <Nav />
      </div>
      <Container component="main" maxWidth="md" style={{ marginTop: "5px" }}>
        <div className={classes.contain}>
          <div className={classes.paper_about}>
            <img
              src={Title}
              style={{
                height: "40%",
                width: "50%",
                minWidth: "205px",
                alignSelf: "center",
              }}
              alt="Code-N-Collab"
            />
            <div className={classes.About}>
              <p>About</p>
              <a
                title="Code-N-Collab Git Repo"
                href="https://github.com/atharmohammad/Code-N-Collab/tree/master"
                target="_blank"
                style={{ width: "100%", height: "100%" }}
              >
                <img
                  src={Github}
                  alt="Github"
                  style={{
                    width: "20%",
                    height: "10%",
                    minWidth: "50px",
                    margin: "30px 0 0 10%",
                  }}
                />
              </a>
            </div>
            <AboutContent />
            <div
              style={{
                width: "100%",
                borderRadius: "20px",
                background:
                  "radial-gradient(ellipse, #1b2735 0%, #090a0f 100%)",
              }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: "10px",
                  margin: "10px",
                  padding: "5px",
                  fontSize: "25px",
                  fontWeight: "bold",
                  border: "2px solid gray",
                  fontFamily: ["edgwick Ave Display", "cursive"].join(),
                }}
              >
                Developed By :
              </div>

              <div className={classes.AdminContainer}>
                <div className={classes.admin_div}>
                  <Admin
                    Name="Mohd Athar"
                    linkedIn="https://www.linkedin.com/in/athar-mohammad-34068a157/"
                    github="https://github.com/atharmohammad"
                    codeForces="https://codeforces.com/profile/KickAss"
                    portFolio="https://atharmohammad.github.io/Portfolio/"
                  />
                </div>
                <div className={classes.admin_div}>
                  <Admin
                    Name="Adnan Shamsi"
                    linkedIn="https://www.linkedin.com/in/adnan-shamsi-5830301b3/"
                    github="https://github.com/Adnan-shamsi"
                    codeForces="https://codeforces.com/profile/AdnanShamsi"
                    portFolio={null}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
