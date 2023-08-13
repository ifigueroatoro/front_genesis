import { useEffect, useState } from "react";
import AuthUser from "../conecciones/authUsers";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";
import { FaTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import swal from "sweetalert";
//import { useNavigate } from "react-router-dom";

export default function ListaItem() {
  //const navigate = useNavigate();
  const { cot_id } = useParams();
  const { http } = AuthUser();
  //const [userProfile, setUserProfile] = useState("");
  const [loading, setLoading] = useState(true);
  const [listaitem, setlistaItem] = useState([]);
  const [listaComunas, setListaComunas] = useState([]);

  //const [disabled, setDisabled] = useState(false);

  function handleGameClick() {
    setDisabled(!disabled);
  }

  useEffect(() => {
    http.get(`/listaItem/${cot_id}`).then((res) => {
     // console.log(res.data);

      if (res.status === 200) {
        setlistaItem(res.data.itemCotizacion);
      }
      setLoading(false);
    });
  }, [cot_id]);

  const [disabled, setDisabled] = useState(false);

  function handleGameClick() {
    setDisabled(!disabled);
  }

  const eliminarItem = async (e, id) => {
    const result = window.confirm("¿Está seguro de eliminar el item?");
    if (result) {
      e.preventDefault();
      const thisClicked = e.currentTarget;
      thisClicked.innerText = "item Cotización Eliminado!!";
      await http.delete(`/eliminarItem/${id}`).then((res) => {
        if (res.data.status === 200) {
          swal("Success", res.data.message, "success");
          // thisClicked.closest("tr").remove();
        } else if (res.data.status === 404) {
          swal("Success", res.data.message, "success");
          thisClicked.innerText = "Eliminar";
        }
      });
    }
  };

  if (loading) {
    return (
      <div>
        <button className="btn btn-secondary" type="button" disabled>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Trayendo listado de Items
        </button>
      </div>
    );
  } else {
    return (
      <div className="card">
        {listaitem.map((item) => (
          <div className="card">
            <tbody key={item.id}>
              <td hidden>{item.id}</td>

              {/*   +++++++++++++++++++++++++++++++++++++++++++++++++++ */}

              <div className="w3-container">
                <table className="w3-table-all  ">
                  <tr className="w3-black">
                    <td>
                      {" "}
                      <Link to="/listaCotizacion">
                        <RiArrowGoBackFill /> Volver
                      </Link>
                    </td>
                    <td>Fecha: {item.fechaSolicitud}</td>
                    <td>Empresa: {item.nombreEmp} </td>
                    <td>Id Item: {item.id}</td>
                    <td>N° Cotización: {item.cot_id}</td>
                    <td></td>
                    <td></td>
                  </tr>

                  <tr>
                    <td>Proyecto: {item.negocioProyecto}</td>
                    <td>Motivo: {item.motivo} </td>
                    <td>Tipo: {item.tipoUnidad}</td>
                    <td>Cabina: {item.tipoCabina}</td>
                    <td>Traccion: {item.traccion}</td>
                    <td>Marca: {item.marca}</td>
                    <td>Modelo: {item.modelo}</td>
                  </tr>
                  <tr>
                    <td>Color: {item.color}</td>
                    <td>Combustible: {item.tipoCombustible}</td>
                    <td>GPS: {item.GPS}</td>
                    <td>Entrega: {item.comuna}</td>
                    <td>Plazo (Meses): {item.plazo} </td>
                    <td>Kmt Mensual: {item.kmtMensual}</td>
                    <td>Cantidad: {item.cantidad}</td>
                  </tr>
                  <tr>
                    <td>OBS: {item.observaciones}</td>
                    <td colspan="6">
                      Accesorios: &nbsp;-&nbsp; {item.tipoCupula} &nbsp;-&nbsp;{" "}
                      {item.neumaticos} &nbsp;-&nbsp; {item.portaEscala}{" "}
                      &nbsp;-&nbsp; {item.barras}
                      &nbsp;-&nbsp; {item.alarmaRobo} &nbsp;-&nbsp;
                      {item.sensorRetroceso} &nbsp;-&nbsp;
                      {item.laminasSeguridad}
                      &nbsp;-&nbsp; {item.mallaLuneta} &nbsp;-&nbsp;
                      {item.cubrePickup}&nbsp;-&nbsp;{item.cajaHerramienta}
                      &nbsp;-&nbsp; {item.cajaKitInvierno} &nbsp;-&nbsp;
                      {item.pertiga} &nbsp;-&nbsp;{item.cunas}
                      &nbsp;-&nbsp; {item.cocoArrastre} &nbsp;-&nbsp;{" "}
                      {item.segundaRuedaRep} &nbsp;-&nbsp; {item.tiroArrastre}
                    </td>
                  </tr>
                </table>
              </div>

              {/*    ++++++++++++++++++++++++++++++++++++++++++++++++++ */}

              {/* tercera linea */}

              {/*Botones */}

              <br></br>
              <nav className="navbar bg-body-tertiary">
                <form className="container-fluid justify-content-start">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    type="button"
                    onClick={handleGameClick}
                  >
                    <FaRegEdit /> Editar
                  </button>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    type="button"
                    onClick={(e) => eliminarItem(e, item.id)}
                  >
                    <FaTrashAlt /> Eliminar
                  </button>
                </form>
              </nav>
            </tbody>
          </div>
        ))}
      </div>
    );
  }
}
