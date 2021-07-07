import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import * as TYPES from "../../store/Action/action";

const Timer = (props) => {
  const location = useLocation();
  const socket = props.socket;

  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  useEffect(() => {
    const x = setInterval(() => {
      let now = new Date().getTime();
      const distance = props.stopAt - now;
      let h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let s = Math.floor((distance % (1000 * 60)) / 1000);

      // If the count down is over, write some text
      if (distance < 0) {
        clearInterval(x);
        props.showContestEndModal();
        props.contestEnded(true);
        const searchParams = new URLSearchParams(location.search);
        socket.emit("Contest-Update", { roomId: searchParams.get("room") });
        return;
      }
      setHours(h);
      setMinutes(m);
      setSeconds(s);
    }, 1000);
  }, [location]);

  return (
    <div style={{ color: "#fff", width: "100%", textAlign: "center" }}>
      <div style={{ margin: "2px" }}>Timer</div>
      <h1 style={{ margin: "0px" }}>
        {hours !== "" ? `${hours}:${minutes}:${seconds}` : "----"}
      </h1>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    showContestEndModal: () =>
      dispatch({ type: TYPES.SHOW_CONTEST_ENDED_MODAL }),
    contestEnded: (status) =>
      dispatch({ type: TYPES.CONTEST_ENDED, data: status }),
  };
};

export default connect(null, mapDispatchToProps)(Timer);
