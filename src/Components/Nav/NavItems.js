import "./NavItem.css";
import Gmail from "../../Assets/images/Gmail.png";
export default function NavItem(props) {
  return (
    <div className="wrapperss" onClick={props.clicked}>
      <div style={{ display: "flex" }}>
        {props.Name === "login" ? (
          <img
            src={Gmail}
            style={{ height: "20px", margin: "35% 10% 0 0" }}
            alt=""
          />
        ) : null}
        <p>{props.Name}</p>
      </div>
    </div>
  );
}
