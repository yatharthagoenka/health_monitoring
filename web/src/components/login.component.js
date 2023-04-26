import React, { useState,Component } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { withRouter } from '../common/with-router';
import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

function Login(){
  const [info, setInfo] = useState({
    username: "",
    password: "",
    loading: false,
    message: ""
  });
  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    setInfo({...info,  username: e.target.value})
  };

  const onChangePassword = (e) => {
    setInfo({...info,  password: e.target.value})
  }

  const handleLogin = (e) => {
    e.preventDefault();

    AuthService.login(info.username, info.password).then(
      () => {
        navigate("/dashboard");
        window.location.reload();
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setInfo({...info,  message: e.target.value})
      }
    );
  }

  return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={info.username}
                onChange={onChangeUsername}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={info.password}
                onChange={onChangePassword}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={info.loading}
              >
                {info.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>

            {info.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {info.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
            />
          </Form>
        </div>
      </div>
    );
}

export default Login;