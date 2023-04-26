import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import AuthService from "../services/auth.service";
import {socket} from "../services/socket.service"

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

  const handleSendTemp = (e) => {
    e.preventDefault();
    const userID = JSON.parse(localStorage.getItem('user')).user._id;
    if (tempValue && userID) {
      let i = 0;
      const intervalId = setInterval(() => {
        if (i >= 30) {
          clearInterval(intervalId);
          return;
        }
        socket.emit('temp_sender', Math.floor(Math.random() * 110) + 1);
        i++;
      }, 1000);
    }
  };

  return (
    <>
      {response}
      <br/>
      <input
          type="text"
          placeholder="Temp value"
          className="tempValue mt-5"
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
        />
        <br/>
      <Button className="sendBtn mt-3" onClick={handleSendTemp}>SEND</Button>
      
    </>
  );
}

export default Dashboard;