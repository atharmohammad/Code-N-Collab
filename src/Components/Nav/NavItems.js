import "./NavItem.css";
import Gmail from "../../Assets/images/Gmail.png";

export default function NavItem(props) {
  return (
      <div className="wrapperss button" onClick={props.clicked}>
        {props.Name === "login / signup" ? (
          <div className="login">
            <img
              src={Gmail}
              className="Img"
              alt=""
            />
            {props.Name}
          </div>
        ):(<div className="about">{props.Name}</div>)}
    </div>
  );
}
