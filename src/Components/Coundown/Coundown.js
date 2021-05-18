import { useEffect, useState } from "react";

const Timer = (props) => {
  
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  
  useEffect(() => {
    const x = setInterval(()=>{
      let now = new Date().getTime();
      let distance = props.stopAt - now;
      let h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let s = Math.floor((distance % (1000 * 60)) / 1000);
      
      // If the count down is over, write some text 
      if (distance < 0) {
        clearInterval(x);
      }
      setHours(h);  
      setMinutes(m);  
      setSeconds(s);  
    }, 1000);
  });

  return (
    <div style={{color:'#fff',width:'100%',textAlign:'center'}} >
    <div style={{margin:'2px'}}>Timer</div>
      <h1 style={{margin:'0px'}}>
        {hours !== '' ? `${hours}:${minutes}:${seconds}`:'----'}
      </h1>
    </div>
  );
};

export default Timer;
