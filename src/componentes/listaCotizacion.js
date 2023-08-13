import { useEffect, useState} from "react";
import AuthUser from "../conecciones/authUsers";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
//import ReactPaginate from "react-paginate";
import { FcAddDatabase } from "react-icons/fc";
import {RiMailSendLine}from "react-icons/ri"


import Paginacion from "../paginaciones/paginacion";
import { BiMenu } from "react-icons/bi";
import { TiDeleteOutline } from "react-icons/ti";
import { BiSitemap } from "react-icons/bi";
import swal from "sweetalert";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import "primereact/resources/themes/lara-light-indigo/theme.css";

export default function ListaCotizacion() {
  const { http } = AuthUser();
  //const [userProfile, setUserProfile] = useState("");
  const [loading, setLoading] = useState(true);
  const [listaCotizacion, setlistaCotizacion] = useState([]);

  const [tablaFlota, setTablaFlota] = useState([]);
  const [busqueda, setBusqueda] = useState([]);

  // +++++++++++++++++++++++++++++++paginacion++++++++++++++++++++++++++++++++++++++++
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  // +++++++++++++++++++++++++++++++paginacion++++++++++++++++++++++++++++++++++++++++
 

  useEffect(() => {
    http.get("/listaCotizacion").then((res) => {
      if (res.status === 200) {
        setlistaCotizacion(res.data.cotizacion);
        setTablaFlota(res.data.cotizacion);
      }
      setLoading(false);
    });
  }, []);

  const eliminarCotizacion = async (e, id) => {
    const result = window.confirm("¿Estás seguro de eliminar la cotizacion?");
    if (result) {
     
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Eliminado Cotización!!";
        await http.delete(`/eliminarCotizacion/${id}`).then((res) => {
          if (res.data.status === 200) {
            swal("Success", res.data.message, "success");
              thisClicked.closest("tr").remove();
          }
          else if(res.data.status===404){
            swal("Success",res.data.message,"success");
            thisClicked.innerText="Eliminar"
              }
        });      
    }
  };


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = listaCotizacion.slice(indexOfFirstPost, indexOfLastPost);
  const howManyPages = Math.ceil(listaCotizacion.length / postsPerPage);

/*   const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  }; */

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };
  const filtrar = (termino) => {
    var resultadoBusqueda = tablaFlota.filter((elementos) => {
      if (
        elementos.solicita
          .toString()
          .toLowerCase()
          .includes(termino.toLowerCase())
      ) {
        return elementos;
      } else if (
        elementos.nombreEmp
          .toString()
          .toLowerCase()
          .includes(termino.toLowerCase())
      ) {
        return elementos;
      } else if (
        elementos.id.toString().toLowerCase().includes(termino.toLowerCase())
      ) {
        return elementos;
      }

      return false;
    });
    setlistaCotizacion(resultadoBusqueda);
  };

  var listaCotizacion_HTMLTABLE = "";
  if (loading) {
    return (
      <div>
        <button className="btn btn-secondary" type="button" disabled>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Trayendo lista de cotizaciones
        </button>
      </div>
    );
  } else {
    listaCotizacion_HTMLTABLE = currentPosts.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.fechaSolicitud}</td>
          <td>{item.nombreEmp}</td>
          <td>{item.solicita}</td>

          <td>
            <Navbar expand="lg" className="bg-body-tertiary">
              <Navbar.Toggle aria-controls="navbarScroll" /> <BiMenu />
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: "100px" }}
                  navbarScroll>
                  <NavDropdown id="navbarScrollingDropdown">
                    <NavDropdown.Item href={`/listaItem/${item.id}`}>                     
                      <BiSitemap />  Ver Items
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                    <RiMailSendLine />  Enviar Cotización
                    </NavDropdown.Item>

                    <NavDropdown.Divider />

                    <NavDropdown.Item onClick={(e)=>eliminarCotizacion(e,item.id)}>                   
                    <TiDeleteOutline/>  Eliminar
                    </NavDropdown.Item>

                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Navbar>

          </td>

          {/*
               <td><Link className="nav-link" to={`/listaItem/${item.id}`}><h5>{<TbEyeglass/>}</h5></Link></td> 
              <td><Link className="nav-link" to={`editEmpresa/${item.id}`}>Editar</Link></td>
                <td>
                <Link to="" onClick={(e)=>eliminarEmpresa(e,item.id)} className="nav-link" >Eliminar</Link>
               </td> */}
        </tr>
      );
    });
  }

  return (
    <body>
      {/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

      <div className="container">
        <nav className="navbar navbar-light" variant="dark">
          <div className="container-fluid" style={{ backgroundColor: "grey" }}>
            <Link
              className="btn btn-link"
              to="/cotizacion"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Ingresar nueva cotización"
            >
              <h3>
                <FcAddDatabase />
              </h3>{" "}
            </Link>

            <div>
              <input
                type="search"
                className="form-control"
                id="floatingInput"
                placeholder="Buscar"
                value={busqueda}
                onChange={handleChange}
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                title="Buscar por: N° Cotizacion Empresa, solicita"
              />
            </div>
          </div>
        </nav>
        <div>
          <Table className="table table-sm">
            <thead className="table-dark">
              <tr>
                <th>N°Cotización</th>
                <th>F.Solicitud</th>
                <th>Empresa</th>
                <th>Solicita</th>
                <th>Opciones </th>
              </tr>
            </thead>
            <tbody>{listaCotizacion_HTMLTABLE}</tbody>

            <div></div>
          </Table>
        </div>

        <Paginacion pages={howManyPages} setCurrentPage={setCurrentPage} />
      </div>
    </body>
  );
}
