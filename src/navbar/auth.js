import { useEffect, useState } from "react";
//import { Routes, Route,Link } from "react-router-dom";
//import Home from "../componentes/home";
import AuthUser from "../conecciones/authUsers";
//import Dashboard from "../componentes/dashboard";

//import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
//import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
//import Offcanvas from 'react-bootstrap/Offcanvas';
import Rutas from "./rutas";




function Auth() {
     const {token,logout}=AuthUser(); 
     const logoutUser=()=>{
        if(token !== undefined){
            logout();
        }
    }

    const { http } = AuthUser();

    const [userProfile, setUserProfile] = useState("");

    useEffect(() => {
      fetchUserProfile();
    }, []);

    const fetchUserProfile = () => {
      http.post("/userProfile").then((res) => {
        setUserProfile(res.data);
      });
    };

    

  return(
<div>
    <Navbar bg="light" expand="lg">
    <Container fluid>
      <Navbar.Brand href="#">Leasing</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
        
          <NavDropdown title="Cotizacion" id="navbarScrollingDropdown">
           {/*  <NavDropdown.Item href="/cotizacion">Ingreso Cotizacion</NavDropdown.Item> */}
            <NavDropdown.Item href="/listaCotizacion">Cotizaciones</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">
              Something else here
            </NavDropdown.Item>
          </NavDropdown>


          <NavDropdown title="Mantenedor" id="navbarScrollingDropdown">
           {/*  <NavDropdown.Item href="/cotizacion">Ingreso Cotizacion</NavDropdown.Item> */}
           <NavDropdown.Item href="/listaUsuario">Lista Usuario</NavDropdown.Item>
           <NavDropdown.Item href="">Ingreso Empresa</NavDropdown.Item>
            <NavDropdown.Item href="">Ingreso Contrato</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">
              Something else here
            </NavDropdown.Item>
          </NavDropdown>




          <Nav.Link href="#" onClick={logoutUser} >Salir</Nav.Link>
         
        
        </Nav>
        <Nav>
           <Nav.Link href="#">{userProfile.name}</Nav.Link>
        </Nav>
     
      </Navbar.Collapse>

          
    
    </Container>
   
  </Navbar>

  <Rutas></Rutas> 
 
</div>
  

  )

}

 

export default Auth;