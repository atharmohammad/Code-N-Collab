import Athar from "../../../Assets/images/athar.jpg";
import Adnan from "../../../Assets/images/Adnan.jpg";
import Linkedin from "../../../Assets/images/Linkedin.png";
import Codeforces from "../../../Assets/images/Codeforces.png";
import AtharPortfolio from "../../../Assets/images/AtharPortfolio.jpg";
import Github from "../../../Assets/images/Github.png";
import classes from "./admin.module.css";

export default function Admin(props) {
  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <img
          className={classes.pic}
          src={props.Name === "Mohd Athar" ? Athar : Adnan}
        />
        <p className={classes.name}>{props.Name}</p>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          flexDirection: "row",
          padding: "1vw",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        <a
          title="linkedIn"
          target="_blank"
          rel="noreferrer"
          href={props.linkedIn}
          className={classes.iconImg}
        >
          <img style={{ width: "100%" }} src={Linkedin} alt="Linkedin" />
        </a>
        <a
          title="Github"
          href={props.github}
          className={classes.iconImg}
          rel="noreferrer"
          target="_blank"
        >
          <img style={{ width: "100%" }} src={Github} alt="Github" />
        </a>
        <a
          title="Codeforces"
          href={props.codeForces}
          className={classes.iconImg}
          rel="noreferrer"
          target="_blank"
        >
          <img style={{ width: "80%" }} src={Codeforces} alt="Codeforces" />
        </a>
        <a
          title="My Portfolio"
          href={props.portFolio}
          className={classes.iconImg}
          target="_blank"
          rel="noreferrer"
        >
          <img
            style={{ width: "85%", }}
            src={AtharPortfolio}
            alt="My Portfolio"
          />
        </a>
      </div>
    </>
  );
}
