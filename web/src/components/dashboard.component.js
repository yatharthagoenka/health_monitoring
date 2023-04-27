import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import AuthService from "../services/auth.service";
import {socket} from "../services/socket.service"
import Slider from "react-bootstrap-range-slider";

function Dashboard() {
  const [response, setResponse] = useState([]);
  const [tempValue, setTempValue] = useState(93);
  const [pulseValue, setPulseValue] = useState(75);
  const [SpO2Value, setSpO2Value] = useState(99);
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();
  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, []);

  useEffect(() => {
    socket.emit("temp_sender", tempValue);
  }, [tempValue]);

  useEffect(() => {
    socket.emit("pulse_sender", pulseValue);
  }, [pulseValue]);

  useEffect(() => {
    socket.emit("spo2_sender", SpO2Value);
  }, [SpO2Value]);

  const handleTempChange = (value) => {
    setTempValue(value);
  };
  
  const handlePulseChange = (value) => {
    setPulseValue(value);
  };

  const handleSpO2Change = (value) => {
    setSpO2Value(value);
  };

  return (
    <>
      {response}
      <br/>
      <p style={{fontWeight: 800}}>Temperature</p>
      <Slider
        value={tempValue}
        onChange={(e) => handleTempChange(e.target.value)}
        min={90}
        max={110}
        />
        <br/>
        <br/>
        <p style={{fontWeight: 800}}>Pulse</p>
      <Slider
        value={pulseValue}
        onChange={(e) => handlePulseChange(e.target.value)}
        min={40}
        max={120}
        />
        <br/>
        <br/>
      <p style={{fontWeight: 800}}>SpO2</p>
      <Slider
        value={SpO2Value}
        onChange={(e) => handleSpO2Change(e.target.value)}
        min={80}
        max={100}
      />
        <br/>
      {/* <Button className="sendBtn mt-3" onClick={handleSendTemp}>SEND</Button> */}
      
    </>
  );
}

export default Dashboard;