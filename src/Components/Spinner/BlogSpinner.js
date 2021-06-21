import { useEffect } from "react";
import "./BlogSpinner.css";

export default function Spinner(props) {
  return (
    <div className="spinneredStone" style={{ ...props.spinneredStyle }}>
      <div className="headedStone" style={{ ...props.headedStyle }}></div>
    </div>
  );
}
