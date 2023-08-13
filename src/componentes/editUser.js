import {useState, useEffect} from "react";
import React, { lazy, Suspense } from 'react';
import {useNavigate} from "react-router-dom";
import AuthUser from "../conecciones/authUsers";
import swal from "sweetalert";
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";
import {FiUser} from "react-icons/fi";
import {RiArrowGoBackFill} from "react-icons/ri";
import Loading from "./loading";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";


export default function EditUser() {
    const {http} = AuthUser();
    const navigate = useNavigate();
    const {id} = useParams();
    const [trayendo, setTrayendo] = useState(true);
    const [loading,setLoading]=useState(true);
  

    const [editInput, setEditInput] = useState({
        id: null,
        name: "",
        email: "",
        role: "",
        cargo: "",
        error_list: []
    });
    const [error, setError] = useState([]);

 // trae los datos del usuario a editar
    useEffect(() => {        
        http.get(`/editaUsuarios/${id}`).then((res) => { // console.log(res.data.user);
            if (res.data.status === 200) {
                setEditInput(res.data.user);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate("/listaUsuario");
            }
            setTrayendo(false);
            setLoading(false);
        });
    }, [id, navigate]);

    const handleInput = (e) => {
        e.persist();

        setEditInput({
            ...editInput,
            [e.target.name]: e.target.value
        });
    };

    const editUsuario = (e) => {
        e.preventDefault();
        const data = {
            id: editInput.id,
            name: editInput.name,
            email: editInput.email,
            role: editInput.role,
            cargo:editInput.cargo
        };



        // Ruta para cambiar los datos con el id.
        http.put(`/editarUsuarios/${id}`, data).then((res) => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                navigate("/listaUsuario");
                // setError([]);
            } else if (res.data.status === 422) {
                swal("Datos deben estar completos", "", "error");
                setError(res.data.errors);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate("/listaUsuario");
            }
        }
        
        );
    }
if(loading){
    return (
        <div>
          <button className="btn btn-secondary" type="button"  disabled>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          Trayendo usuario <h3><FiUser/> </h3> 
          </button>
        </div>
      );

}else{

    return (   
      
        <div className="container-sm">         
            <br></br>
         
            <Link className="w3-bar-item w3-button" to="/listaUsuario">
                <RiArrowGoBackFill/>
                Volver
            </Link>

                    
            <form onSubmit={editUsuario}
                class="row g-3 needs-validation" novalidate>
                <center>
                    <div className="card"
                        style={
                            {width: 500}
                    }>
                        <div class="card-header"> Editar Usuario </div>
                     

                        <div className="card-body">

                            <div className="form-floating mb-3">
                             
                           <input type="text" className="form-control" id="floatingInput"
                                    onChange={handleInput} value={editInput.name}
                                    name="name"placeholder="Nombre"/>


                                <label for="floatingInput">  <FiUser/> Nombre</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="email" class="form-control" id="floatingPassword"
                                    onChange={handleInput}
                                    value={
                                        editInput.email
                                    }
                                    name="email"
                                    placeholder="Email"/>
                                <label for="floatingPassword">Email</label>
                            </div>

                            <div className="form-floating mb-3">
                                <select class="form-select" aria-label="Default select example" name="role" onChange={handleInput}>
                                    <option value={
                                        editInput.role
                                    }>
                                        {
                                        editInput.role
                                    } </option>
                                    <option value="1">1 Administrador</option>
                                    <option value="2">2 Usuario</option>
                                </select>
                                <label for="floatingInput">Role</label>
                            </div>

                            <div className="form-floating mb-3">
                                <select className="form-select" aria-label="Default select example" name="cargo" onChange={handleInput}>
                                    <option value={ editInput.cargo
                                    }>
                                        {
                                        editInput.cargo
                                    } </option>
                                    <option value="1">1 Administrador</option>
                                    <option value="2">2 Usuario</option>
                                    <option value="3">3 Cliente</option>
                                </select>
                                <label for="floatingInput">Cargo</label>
                            </div>

                            <div className="d-grid gap-2">

                                <button className="btn btn-secondary" type="submit">Grabar</button>
                            </div>
                        </div>

                          
                    </div>
                </center>
               
            </form>
             
        </div>

        
     
    );
                                }
  
}
