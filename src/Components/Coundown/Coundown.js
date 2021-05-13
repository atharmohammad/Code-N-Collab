import { useEffect, useState } from "react";

const Timer = (props) => {
  const { initialMinute = 0, initialSeconds = 0 } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div style={{color:'#fff',width:'100%',textAlign:'center'}} >
    <div style={{margin:'2px'}}>Timer</div>
      <h1 style={{margin:'0px'}}>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </h1>
    </div>
  );
};

export default Timer;
