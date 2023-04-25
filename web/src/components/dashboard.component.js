import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Button from 'react-bootstrap/Button';
import AuthService from "../services/auth.service";
import AppService from "../services/app.service";

const ENDPOINT = process.env.REACT_APP_API_URL;

function Dashboard(){
  const [response, setResponse] = useState("");
  const [loadClient, setLoadClient] = useState(false);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data);
    });
    return () => socket.disconnect();
  }, []);

  return (
    <>
    <p>
      Message from server: {response}
    </p>
    </>
  );
}

export default Dashboard;