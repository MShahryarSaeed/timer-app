import React, { useEffect, useState } from 'react';
import './TimerApp.css';

const TimerApp = () => {

  const [condition, setCondition] = useState(true);

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [showTimerDiv, setShowTimerDiv] = useState(false);
  const [timerStatus, setTimerStatus] = useState("No Timer has been Setup");

  const[url,setUrl]=useState('');
  

  useEffect(() => {
    if (!condition) {
      const interval = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds === 59) {
            return 0;
          }
          else {
            return prevSeconds + 1;
          }
        })
      }, 1000);

      if (seconds > 0) {
        if (minutes === timerMinutes && seconds === timerSeconds) {
          setTimerStatus("TImer Finished");
          window.open(`${url}`);
        }
      }
      return () => clearInterval(interval);
    }


    if (seconds === 0 && minutes < 59) {
      setMinutes(prevMinutes => prevMinutes + 1);
    } else if (seconds === 0 && minutes === 59) {
      setMinutes(0);
      setHours(prevHours => prevHours + 1);
    }

  }, [condition, seconds]);








  return (
    <div className='main'>
      <div className="App">
        <h1>Timer App</h1>
        <div className='input-div'>
          <label htmlFor="url">Enter URL :</label>
          <input type="text" value={url} placeholder='Enter a URL..?' onChange={(e)=>setUrl(e.target.value)} />
          
        </div>

        <h1 className='timer'>{hours}.{minutes}.{seconds}</h1>
        <div className='buttonsdiv'>
          <button onClick={() => setCondition(!condition)}>{condition ? 'start' : 'stop'}</button>
          <button onClick={() => { setSeconds(0); setMinutes(0); setHours(0); }}>Reset</button>
          <button onClick={() => setShowTimerDiv(!showTimerDiv)}>Set Timer</button>
        </div>
        {showTimerDiv ? <SettingUpTimer showTimerDiv={showTimerDiv} setShowTimerDiv={setShowTimerDiv} timerMinutes={timerMinutes} setTimerMinutes={setTimerMinutes} timerSeconds={timerSeconds} setTimerSeconds={setTimerSeconds} /> : <h3>{timerStatus}</h3>}
      </div>
    </div>
  )
}



function SettingUpTimer({ showTimerDiv, setShowTimerDiv, setTimerMinutes, setTimerSeconds }) {

  return (
    <div className='timerdiv'>
      <input type="number" placeholder="Minutes." onChange={(e) => setTimerMinutes(Number(e.target.value))}></input>
      <input type="number" placeholder="Seconds" onChange={(e) => setTimerSeconds(Number(e.target.value))}></input>
      <button onClick={() => setShowTimerDiv(!showTimerDiv)}>Finish</button>
    </div>
  );
}

export default TimerApp;