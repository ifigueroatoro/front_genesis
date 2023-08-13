import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthUser from "../conecciones/authUsers";
import swal from "sweetalert";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { FcAcceptDatabase } from "react-icons/fc";
import { FcDeleteDatabase } from "react-icons/fc";

import Accordion from 'react-bootstrap/Accordion';

export default function Register() {
  const [cPassword, setCPassword] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [cPasswordClass, setCPasswordClass] = useState("w3-input w3-border w3-animate-input");
  const [isCPasswordDirty, setIsCPasswordDirty] = useState(false);

  useEffect(() => {
    if (isCPasswordDirty) {
      if (registerInput.password === cPassword) {
        setShowErrorMessage(false);
        setCPasswordClass("form-control is-valid");
      } else {
        setShowErrorMessage(true);
        setCPasswordClass("form-control is-invalid");
      }
    }
  }, [cPassword]);

  const handleCPassword = (e) => {
    setCPassword(e.target.value);
    setIsCPasswordDirty(true);
  };

  const navigate = useNavigate();
  const { http } = AuthUser();
  const [registerInput, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    cargo: "",
    role: "",
    error_list: [],
  });

  const [error, setError] = useState([]);
  const handleInput = (e) => {
    e.persist();
    setRegister({ ...registerInput, [e.target.name]: e.target.value });
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: registerInput.name,
      email: registerInput.email,
      password: registerInput.password,    
      role: registerInput.role,
        cargo: registerInput.cargo,
    };

    http.post("/ingresarUsuario", data).then((res) => {
      // console.log(res.data);

      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        navigate("/ingresarUsuario");
      } else if (res.data.status === 402) {
        swal("Usuario no autorizado para crear nuevos usuarios", "", "error");
        setError(res.data.errors);
      } else {
        setRegister({
          ...registerInput,
          error_list: res.data.validation_errors,
        });
      }
    });
  };

  return (
    <body>


      <br></br> <br></br> <br></br>
  <center> 
<div className="w3-container">
<form onSubmit={registerSubmit}>
                
                <div class="w3-card-4" style={{width:"40%"}}>
   <header className="w3-container w3-black">
      <h2>Ingrese Nuevo usuario</h2>
     
    </header>
 <br/>

  <input className="w3-input w3-border w3-animate-input"  type="text" style={{width:"70%"}}
     id="1"
     name="name"
     placeholder="Nombre y Apellido"
     onChange={handleInput}
     value={registerInput.name}/>
      <span className="badge bg-danger">
                        {registerInput.error_list.name}
                      </span>


   <input className="w3-input w3-border w3-animate-input" type="email" style={{width:"70%"}}
     id="2"
     name="email"
     placeholder="Email"
     onChange={handleInput}
     value={registerInput.email}   
   />
     <span className="badge bg-danger">
                        {registerInput.error_list.email}
                      </span>

    <input className="w3-input w3-border w3-animate-input" type="text" style={{width:"70%"}}
      id="4"
      name="role"
      min={1}
      max={2}
      placeholder="Role (1=Admistrador | 0=Usuario)"
      onChange={handleInput}
      value={registerInput.role}    
    />

<span className="badge bg-danger">
                        {registerInput.error_list.role}
                      </span>
   <input className="w3-input w3-border w3-animate-input" type="text" style={{width:"70%"}}
      id="7"
      name="cargo"
      min={1}
      max={2}
      placeholder="Cargo (1=Ejecutivo | 2=Coordinador)"
      onChange={handleInput}
      value={registerInput.cargo}   
   />
    <span className="badge bg-danger">
                        {registerInput.error_list.cargo}
                      </span>
    <input className="w3-input w3-border w3-animate-input" type="password" style={{width:"70%"}}    
    id="password"
    name="password"
    placeholder="Password (Minimo 8 digitos)"
    onChange={handleInput}
    value={registerInput.password}    
    />    
<span className="badge bg-danger">
                        {registerInput.error_list.password}
                      </span>
   <input class="w3-input w3-border w3-animate-input" type="password" style={{width:"70%"}}
   
   className={cPasswordClass}
   id="confirmPassword"
   value={cPassword}
   placeholder="Confirme Password"
   onChange={handleCPassword}   
   />

{showErrorMessage && isCPasswordDirty ? (
                        <div> Ingrese password correcto </div>
                      ) : (
                        ""
                      )}
 
  
 
<br></br>
  <footer class="w3-container w3-black">
  <div>
    <center>
                <div className="btn-group">
                  <button type="button" className="btn"></button>

                  <button
                    type="submit"
                    data-bs-toggle="tooltip"
                    title="Ingresar Usuario"
                    className="btn btn-outline-secondary"
                  >
                    <h3>
                      <FcAcceptDatabase />
                    </h3>
                  </button>

                  <button type="button" className="btn"></button>

                  <button type="submit" className="btn btn-outline-secondary">
                    <Link
                      data-bs-toggle="tooltip"
                      title="Volver"
                      className="nav-link"
                      to="/listaUsuario"
                    >
                      <h3>
                        <FcDeleteDatabase />
                      </h3>
                    </Link>
                  </button>

                  <button type="button" className="btn"></button>
                </div>
                </center>
              </div>
    </footer>
   </div>

   </form>
  
  </div>

  
  </center>

    </body>
  );
}
