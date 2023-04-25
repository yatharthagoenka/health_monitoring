import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import AuthService from "../services/auth.service";
import AppService from "../services/app.service";

function Home({socket}){
  const [response, setResponse] = useState("");
  const [serverHello, setServerHello] = useState("");

  useEffect(() => {
    socket.on("TempAPI", data => {
      setResponse(data);
    });
    AppService.getTestContent().then(
      response => {
        setServerHello(response.data);
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }, []);

  return (
    <>
    {response}
    <div className="container">
        <p style={{ position: 'fixed', bottom: 0, left: '1em' }}>{serverHello}</p>
    </div>
    </>
  );
}

export default Home;