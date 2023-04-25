import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import AuthService from "../services/auth.service";

function Dashboard({socket}) {
  const [response, setResponse] = useState("");
  const [tempValue, setTempValue] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (!user) {
      navigate('/')
    }
    socket.on("TempAPI", data => {
      setResponse(data);
    });
  }, []);

  const handleSendTemp = (e) => {
    e.preventDefault();
    const userID = JSON.parse(localStorage.getItem('user')).user._id;
    if (tempValue && userID) {
      console.log(tempValue);
      socket.emit('message', {
        text: tempValue,
        userID: userID,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
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