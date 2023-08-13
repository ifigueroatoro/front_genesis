import { useState } from "react";
import AuthUser from "../conecciones/authUsers";
/* import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Accordion from 'react-bootstrap/Accordion';
import Card from "react-bootstrap/Card";
import Collapse from "react-bootstrap/Collapse";
import Badge from "react-bootstrap/Badge";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom"; */
import swal from "sweetalert";

export default function Home() {
  const { http, setToken } = AuthUser();

  const [loginInput, setLogin] = useState({
    email: "",
    password: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value });
  };

  const data = { email: loginInput.email, password: loginInput.password };

  const loginSubmit = (e) => {
    e.preventDefault();
    http.post("login", data).then((res) => {
      if (res.data.status === 200) {
        setToken(res.data.user, res.data.access_token);
        <div className="spinner-grow text-success"></div>;
          swal("Bienvenido",res.data.message,"success");
      } else if (res.data.status === 401) {
         swal("Sus credenciales no son correctas!!",res.data.message,"warning");
      } else {
        setLogin({ ...loginInput, error_list: res.data.validation_errors });
      }
    });
  };

  return (
    <div className="fondologin">
      {/* <div  className="bg">  --> Trae el fondo de pantalla desde App.css */}

      <div className="row justify-content-center pt-5">
        <div className="col-sm-3">
          <div>
            <form onSubmit={loginSubmit}>
              <br></br>

              <div className="form-floating mb-3 mt-3">
                <input
                  type="text"
                  className="form-control"
                  id="uname"
                  placeholder="Enter username"
                  name="email"
                  onChange={handleInput}
                  value={loginInput.email}
                />
                <label className="form-label">Email:</label>
                <span className="badge bg-danger">
                  {loginInput.error_list.email}
                </span>
              </div>

              <div className="form-floating mt-3 mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="myInput"
                  placeholder="Enter password"
                  name="password"
                  onChange={handleInput}
                  value={loginInput.password}
                />
                <label className="form-label">Password:</label>
                <span className="badge bg-danger">
                  {loginInput.error_list.password}
                </span>
              </div>
              <div className="d-grid gap-3">
                <button type="submit" className="btn btn-secondary btn-block">
                  Ingresar  !!!!
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
