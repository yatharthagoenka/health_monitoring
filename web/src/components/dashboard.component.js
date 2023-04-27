import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import AuthService from "../services/auth.service";
import {socket} from "../services/socket.service"
import Slider from "react-bootstrap-range-slider";

function Dashboard() {
  const [response, setResponse] = useState([]);
  const [tempValue, setTempValue] = useState(0);
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();
  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, []);

  useEffect(() => {
    socket.emit("temp_sender", tempValue);
  });


  const handleSendTemp = (e) => {
    e.preventDefault();
    const userID = JSON.parse(localStorage.getItem('user')).user._id;
    if (userID) {
      let i = 0;
      const intervalId = setInterval(() => {
        if (i >= 30) {
          clearInterval(intervalId);
          return;
        }
        socket.emit('temp_sender', tempValue);
        i++;
      }, 1000);
    }
  };

  const handleSliderChange = (value) => {
    setTempValue(value);
    // console.log(tempValue)
  };

  return (
    <>
      {response}
      <br/>
      <Slider
        value={tempValue}
        onChange={(e) => handleSliderChange(e.target.value)}
        min={90}
        max={110}
      />
        <br/>
      {/* <Button className="sendBtn mt-3" onClick={handleSendTemp}>SEND</Button> */}
      
    </>
  );
}

export default Dashboard;