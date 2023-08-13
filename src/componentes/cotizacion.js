import { useEffect, useState,useRef} from "react";
import { Link } from "react-router-dom";
import AuthUser from "../conecciones/authUsers";
import moment, { now } from "moment/moment";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { FcCalendar } from "react-icons/fc";
import { RiArrowGoBackFill } from "react-icons/ri";
import Accordion from "react-bootstrap/Accordion";
import { BsPlusCircle } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import { BsCarFront } from "react-icons/bs";


import "primereact/resources/themes/lara-light-indigo/theme.css";  
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
        

export default function Cotizacion() {
//-------------------------------------
const [visible, setVisible] = useState(false);
const toast = useRef(null);
const accept = () => {
    toast.current.show({ severity: 'info', summary: 'Advertencia', detail: 'Faltan Datos!!', life: 3000 });
}
const reject = () => {
    toast.current.show({ severity: 'warn', summary: 'Cancelar', detail: 'Envio Cancelado!!', life: 3000 });
}
//-------------------------------------

  const { http } = AuthUser();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState("");
  const [loading, setLoading] = useState(true);
  const [listaComunas, setListaComunas] = useState([]);
  const [listaEmpresas,setListaEmpresas] = useState([]);
  const [listaMarcas, setListaMarcas] = useState([]);
  const [currentDate, setCurrentDate] = useState();
  const [isChecked, setIsChecked] = useState(false);

  const [formVal2, setFormVal2] = useState([
    { fechaSolicitud: "", usuario: "", solicita: "", empresas_id: "" },
  ]);

  const [formVal, setFormVal] = useState([
    {
      negocioProyecto: "",
      motivo: "",
      tipoUnidad: "",
      tipoCabina: "",
      traccion: "",
      trasmision: "",
      observaciones: "",
      marcas_id: "",
      modelo: "",
      color: "",
      tipoCombustible: "",
      comunas_id: "",
      cantidad: "",
      plazo: "",
      kmtMensual: "",
      GPS: "",
      tipoCupula: "",
      neumaticos: "",
      portaEscala: "",
      barras: "",
      alarmaRobo: "",
      sensorRetroceso: "",
      laminasSeguridad: "",
      mallaLuneta: "",
      cubrePickup: "",
      cajaHerramienta: "",
      cajaKitInvierno: "",
      pertiga: "",
      cunas: "",
      cocoArrastre: "",
      segundaRuedaRep: "",
      tiroArrastre: "",
    },
  ]);

  const addRow = () => {
    setFormVal([
      ...formVal,
      {
        negocioProyecto: "",
        motivo: "",
        tipoUnidad: "",
        tipoCabina: "",
        traccion: "",
        trasmision: "",
        observaciones: "",
        marcas_id: "",
        modelo: "",
        color: "",
        tipoCombustible: "",
        comunas_id: "",
        cantidad: "",
        plazo: "",
        kmtMensual: "",
        GPS: "",
        tipoCupula: "",
        neumaticos: "",
        portaEscala: "",
        barras: "",
        alarmaRobo: "",
        sensorRetroceso: "",
        laminasSeguridad: "",
        mallaLuneta: "",
        cubrePickup: "",
        cajaHerramienta: "",
        cajaKitInvierno: "",
        pertiga: "",
        cunas: "",
        cocoArrastre: "",
        segundaRuedaRep: "",
        tiroArrastre: "",
      },
    ]);
  };

  const onRemove = (i) => {
    const newForm = [...formVal];
    newForm.splice(i, 1);
    setFormVal(newForm);
  };

  const onHandle = (e, i) => {
    let newForm = [...formVal];
    newForm[i][e.target.name] = e.target.value;
    setFormVal(newForm);
    setIsChecked(!isChecked);
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormVal2((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //funcion que envia los datos al router de laravel.
  const onSubmit = async (e) => {
    e.preventDefault();
    // se genera una variable data, la cual contiene los datos de base
    //contenidos en formVal2 y el array o el arreglo con los input dinamicos
    const data = {
      fechaSolicitud: formVal2.fechaSolicitud,
      usuario: formVal2.usuario,
      solicita: formVal2.solicita,
      empresas_id: formVal2.empresas_id,
      0: formVal,
    };
    //console.log("submitData", data);
    await http.post("/creaCotizacion", data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        navigate("/listaCotizacion");
      } else {
        setFormVal({ ...formVal, error_list: res.data.validation_errors });
      }
    });
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = () => {
    http.post("/userProfile").then((res) => {
      setUserProfile(res.data);
    });
  };

  useEffect(() => {
    http.get(`/listaComunas`).then((res) => {
      if (res.status === 200) {
        setListaComunas(res.data.comuna);
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    http.get(`/listaEmpresas`).then((res) => {
      if (res.status === 200) {
        setListaEmpresas(res.data.empresa);
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    http.get(`/listaMarcas`).then((res) => {
      if (res.status === 200) {
        setListaMarcas(res.data.marca);
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setCurrentDate(moment().format("DD-MM-YYYY"));
  }, []);

  return (


  
    <form onSubmit={onSubmit} className="was-validated">

      {/* ppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp */}
      <div class="w3-container">
        <table className="w3-table-all w3-tiny">
          <tr>
            <th>
              Ingreso Solicitud de cotización
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <FcCalendar /> {currentDate}
            </th>
            <th></th>
            <th></th>
            <th>Ingrese Usuario</th>
            <th>Quien Solicita</th>
            <th>Empresa</th>
          </tr>
          <tr>
            <td>
              <Link className="w3-bar-item w3-button" to="/listaCotizacion">
                <RiArrowGoBackFill />
                Volver
              </Link>
            </td>

            <td> </td>

       {/*      <td>
              <button
                className="w3-bar-item w3-button w3-black"  type="submit" style={{ width: 80 }}              >
                Guardar  </button>
             
            </td> */}

            <td>
            <Toast ref={toast} />
            <ConfirmDialog visible={visible} onHide={() => setVisible(false)} message="Desea crear cotizacion?" 
                 icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />          
                <Button onClick={() => setVisible(true)} label="Guardar" severity="secondary"
                 size="small" type="submit"  style={{ width: 80 }} />
           
            </td>



            <td>
              <select
                required
                name="usuario"
                className="w3-select"
                id="validationCustom01"
                onChange={handleInput}
              >
                <option></option>
                <option value={userProfile.name}>{userProfile.name}</option>
              </select>
              <div className="invalid-feedback">Ingrese usuario</div>
            </td>

            <td>
              <input
                type="text"
                className="w3-input"
                id="validationCustom02"
                onChange={handleInput}
                value={formVal2.solicita || ""}
                required
                name="solicita"
                placeholder="Quien Solicita?"
              />
              <div className="invalid-feedback"> Ingrese Quien solicita </div>
            </td>

            <td>
            <select
                  required
                  name="empresas_id"
                  className="form-select"
                  id="validationTooltip111"
                  onChange={handleInput}
                >
                  <option></option>
                  {/* <option value={registerInput.ciudads_id}>{listaCiudades.ciudad}</option> */}
                  {listaEmpresas.map((items) => (
                    <option key={items.id} value={items.id}>
                      {items.nombreEmp}
                    </option>
                  ))}
                </select>
              <div className="invalid-feedback">Ingrese Empresa</div>
            </td>
          </tr>
        </table>
      </div>

      {/* pppppppppppppppppppppppppppppppp FIN ppppppppppppppppppppppppppppppppppppppp */}

      {formVal.map((item, i) => (
        <div className="w3-container" key={i}>
          <table className="w3-table-all w3-tiny">
            <tr>
              <th>Negocio Proyecto</th>
              <th>Motivo</th>
              <th>Tipo Unidad</th>
              <th>Tipo Cabina</th>
              <th>Tracción</th>
              <th>Trasmision</th>
            </tr>

            <tr>
              <td>
                <input
                  type="text"
                  className="form-control"
                  id="validationTooltip01"
                  onChange={(e) => onHandle(e, i)}
                  value={item.negocioProyecto || ""}
                  required
                  name="negocioProyecto"
                  placeholder="Negocio Proyecto"
                  data-bs-toggle="popover"
                  title="Ejemplo: Quien usara la unidad. puede ingresar centro de costo"
                />
                <div className="invalid-feedback">Ingrese Proyecto</div>
              </td>

              <td>
                <select
                  required
                  name="motivo"
                  className="form-select"
                  id="validationTooltip02"
                  onChange={(e) => onHandle(e, i)}
                >
                  <option></option>
                  <option value="Aumento">Aumento</option>
                  <option value="Renovación">Renovación</option>
                  <option value="Reposion x Siniestro">
                    Reposion x Siniestro
                  </option>
                  <option value="Licitación">Licitación</option>
                </select>
                <div className="invalid-feedback">Ingrese Motivo</div>
              </td>

              <td>
                <select
                  value={item.tipoUnidad || ""}
                  required
                  name="tipoUnidad"
                  className="form-select"
                  id="validationTooltip03"
                  onChange={(e) => onHandle(e, i)}
                >
                  <option></option>
                  <option value="Camioneta">Camioneta</option>
                  <option value="Furgon">Furgon</option>
                  <option value="Automovil">Automovil</option>
                  <option value="Camion 3/4">Camion 3/4</option>
                  <option value="Ambulancia">Ambulancia</option>
                  <option value="Bus">Bus</option>
                </select>
                <div className="invalid-feedback">Tipo Unidad</div>
              </td>

              <td>
                <select
                  value={item.tipoCabina || ""}
                  required
                  name="tipoCabina"
                  className="form-select"
                  id="validationTooltip04"
                  onChange={(e) => onHandle(e, i)}
                >
                  <option></option>
                  <option value="Doble">Doble</option>
                  <option value="Simple">Simple</option>
                </select>
                <div className="invalid-feedback">Tipo Cabina</div>
              </td>
              <td>
                <select
                  value={item.traccion || ""}
                  required
                  name="traccion"
                  className="form-select"
                  id="validationTooltip05"
                  onChange={(e) => onHandle(e, i)}
                >
                  <option></option>
                  <option value="4x2">4x2</option>
                  <option value="4x4">4x4</option>
                </select>
                <div className="invalid-feedback">Tracción</div>
              </td>

              <td>
                <select
                  value={item.trasmision || ""}
                  required
                  name="trasmision"
                  className="form-select"
                  id="validationTooltip06"
                  onChange={(e) => onHandle(e, i)}
                >
                  <option></option>
                  <option value="Mecanica">Mecanica</option>
                  <option value="Automatica">Automatica</option>
                </select>
                <div className="invalid-feedback">Trasmision</div>
              </td>
            </tr>

            <tr>
              <th>Marca</th>
              <th>Modelo "(Opcional)"</th>
              <th>Color</th>
              <th>Tipo Combustible</th>
              <th>GPS</th>
              <th>Lugar Entrega</th>
            </tr>

            <tr>
              <td>
              <select
                  required
                  name="marcas_id"
                  className="form-select"
                  id="validationTooltip121"
                  onChange={(e) => onHandle(e, i)}
                >
                  <option></option>
                
                  {listaMarcas.map((items) => (
                    <option key={items.id} value={items.id}>
                      {items.marca}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">Marca</div>
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  id="validationTooltip08"
                  onChange={(e) => onHandle(e, i)}
                  value={item.modelo || ""}
                  name="modelo"
                  placeholder="Modelo (Opcional)"
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  id="validationTooltip09"
                  onChange={(e) => onHandle(e, i)}
                  value={item.color || ""}
                  required
                  name="color"
                  placeholder="Color"
                />
              </td>
              <td>
                {" "}
                <select
                  value={item.tipoCombustible || ""}
                  required
                  name="tipoCombustible"
                  className="form-select"
                  id="validationTooltip10"
                  onChange={(e) => onHandle(e, i)}
                >
                  <option></option>
                  <option value="Diesel">Diesel</option>
                  <option value="Bencina">Bencina</option>
                  <option value="Electrico">Electrico</option>
                  <option value="Hibrido">Hibrido</option>
                </select>
                <div className="invalid-feedback">Tipo Combustible</div>
              </td>
              <td>
                <select
                  value={item.GPS || ""}
                  required
                  name="GPS"
                  className="form-select"
                  id="validationTooltip15"
                  onChange={(e) => onHandle(e, i)}
                >
                  <option></option>
                  <option value="SI">SI</option>
                  <option value="NO">NO</option>
                </select>
                <div className="invalid-feedback">GPS</div>
              </td>
              <td>
                <select
                  required
                  name="comunas_id"
                  className="form-select"
                  id="validationTooltip11"
                  onChange={(e) => onHandle(e, i)}
                >
                  <option></option>
                  {/* <option value={registerInput.ciudads_id}>{listaCiudades.ciudad}</option> */}
                  {listaComunas.map((items) => (
                    <option key={items.id} value={items.id}>
                      {items.comuna}
                    </option>
                  ))}
                </select>

                <div className="invalid-feedback">Lugar entrega</div>
              </td>
            </tr>
            <tr>
              <th>Plazo en Meses</th>
              <th>Kilometros Mensuales</th>
              <th>Cantidad de Unidades</th>
              <th>Obs</th>
              <th></th>
              <th></th>
            </tr>
            <tr>
              <td>
                {" "}
                <input
                  type="number"
                  className="form-control"
                  id="validationTooltip13"
                  onChange={(e) => onHandle(e, i)}
                  value={item.plazo}
                  required
                  name="plazo"
                  placeholder="Plazo en meses"
                  min={12}
                />
              </td>
              <td>
                {" "}
                <input
                  type="number"
                  className="form-control"
                  id="validationTooltip14"
                  onChange={(e) => onHandle(e, i)}
                  value={item.kmtMensual || ""}
                  required
                  name="kmtMensual"
                  placeholder="Kilometros mensuales"
                />
              </td>
              <td>
                {" "}
                <input
                  type="number"
                  className="form-control"
                  id="validationTooltip12"
                  onChange={(e) => onHandle(e, i)}
                  value={item.cantidad}
                  required
                  name="cantidad"
                  placeholder="Cantidad"
                  min={1}
                />
              </td>
              <td>
                {" "}
                <input
                  type="text"
                  className="form-control"
                  id="validationTooltip16"
                  onChange={(e) => onHandle(e, i)}
                  value={item.observaciones || ""}
                  required
                  name="observaciones"
                  placeholder="Observaciones"
                />
              </td>
              <td></td>
              <td>
                <Link
                  type="button"
                  className="btn btn-secondary"
                  onClick={addRow}
                >
                  <BsCarFront /> Agregar nueva unidad
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {i === 0 ? (
                  ""
                ) : (
                  <Link
                    type="button"
                    className="btn btn-danger"
                    onClick={() => onRemove(i)}
                  >
                    <BsCarFront /> Eliminar
                  </Link>
                )}
              </td>
            </tr>
          </table>

          <div className="card">
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <FaList />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Agregar equipamiento
                  Especial (Opcional)
                </Accordion.Header>
                <Accordion.Body>
                  {/*  {currentDate} */}

                  <div className="form-check">
                    <table className="table">
                      {/* 
                      <div className="topping">
                       <input type="checkbox" id="topping" name="barras" value={item.barras || "SI"}  checked={isChecked}
                         onChange={(e) => onHandle(e, i)}/> Barras </div>
                         <div className="result">{isChecked ? "SI" : "NO"}</div> */}
                      <tr></tr>

                      <tr>
                        <td>
                      
                          <div className="card-body">
                          <label >Cupula: &nbsp;</label><br></br>
                          <input type="radio" name="tipoCupula" id="flexRadioDefault01" onChange={(e) => onHandle(e, i)}/> n/a 
                         &nbsp;
                          <input                          
                            type="radio" name="tipoCupula" id="flexRadioDefault1" value={item.tipoCupula || "Cupula SAE"}
                            onChange={(e) => onHandle(e, i)}/> SAE 
                         &nbsp;
                          <input type="radio" name="tipoCupula" id="flexRadioDefault2" value={item.tipoCupula || "Cupula HUECA"}
                            onChange={(e) => onHandle(e, i)}/>HUECA
                          
                            </div>
                        </td>

                        <td>
                       
                          <div className="card-body">
                          <label >Neumatico: &nbsp;</label><br></br>
                          <input type="radio" name="neumaticos" id="flexRadioDefault03" onChange={(e) => onHandle(e, i)}/> n/a 
                         &nbsp;
                          <input                           
                            type="radio"                           
                            name="neumaticos"
                            id="flexRadioDefault3"
                            value={item.neumaticos || "Neumatico AT"}
                            onChange={(e) => onHandle(e, i)}/> AT                      
                            
                      
                        <input                           
                            type="radio"                           
                            name="neumaticos"
                            id="flexRadioDefault4"
                            value={item.neumaticos || "Neumatico MT"}
                            onChange={(e) => onHandle(e, i)} /> MT
                            
                            </div>
                        </td>

                        <td>
                       
                          <div className="card-body">
                          <label >Porta Escala: &nbsp;</label><br></br>
                          <input type="radio" name="portaEscala" id="flexRadioDefault05" onChange={(e) => onHandle(e, i)}/> n/a 
                         &nbsp;
                          <input   
                            type="radio"                           
                            name="portaEscala"
                            id="flexRadioDefault5"
                            value={item.portaEscala || "P.Escala Std"}
                            onChange={(e) => onHandle(e, i)}
                          />
                          Estandar
                           <input
                          
                            type="radio"                           
                            name="portaEscala"
                            id="flexRadioDefault6"
                            value={item.portaEscala || "P.Parron"}
                            onChange={(e) => onHandle(e, i)}
                          />
                          Parron
                          
                            </div>


                        </td>

                     

                        <td>

                        <label >Barras: &nbsp;</label><br></br>
                          <input type="radio" name="barras" id="flexRadioDefault005" onChange={(e) => onHandle(e, i)}/> n/a 
                         &nbsp;
                          <input   
                            type="radio"                           
                            name="barras"
                            id="flexRadioDefault15"
                            value={item.barras || "Barra Interna"}
                            onChange={(e) => onHandle(e, i)}
                          />
                          Int
                           <input                          
                            type="radio"                           
                            name="barras"
                            id="flexRadioDefault16"
                            value={item.barras || "Barra Externa"}
                            onChange={(e) => onHandle(e, i)}
                          />
                          Ext
                          <input                          
                            type="radio"                           
                            name="barras"
                            id="flexRadioDefault116"
                            value={item.barras || " Barras Int/Ext"}
                            onChange={(e) => onHandle(e, i)}
                          />
                          Int/Ext
                    
                        </td>

                        <td>
                          <input
                            type="checkbox"
                            name="alarmaRobo"
                            value={item.alarmaRobo || "Alarma Robo"}
                            onChange={(e) => onHandle(e, i)}
                          />
                          Alarma Robo
                        </td>

                        <td>
                          <input
                            type="checkbox"
                            name="sensorRetroceso"
                            value={item.sensorRetroceso || "Sensor Retro"}
                            onChange={(e) => onHandle(e, i)}
                          />
                          Sensor Retroceso
                        </td>

                        <td>
                          <input
                            type="checkbox"
                            name="laminasSeguridad"
                            value={item.laminasSeguridad || "Laminas Seg"}
                            onChange={(e) => onHandle(e, i)}
                          />
                          Laminas Seguridad
                        </td>

                         

                      <td>
                          <input
                            type="checkbox"
                            name="mallaLuneta"
                            value={item.mallaLuneta || "Malla Luneta"}
                            onChange={(e) => onHandle(e, i)}
                          />{" "}
                          Malla luneta
                        </td>                  

                       
                      </tr>

                      <tr></tr>

                      <tr>

                 
                      <td>
                          <input
                            type="checkbox"
                            name="cubrePickup"
                            value={item.cubrePickup || "Cubre Pickup"}
                            onChange={(e) => onHandle(e, i)}
                          />{" "}
                          Cubre Pickup
                        </td>

                        <td>
                          <input
                            type="checkbox"
                            name="cajaHerramienta"
                            value={item.cajaHerramienta || "Caja Herramienta"}
                            onChange={(e) => onHandle(e, i)}
                          />{" "}
                          Caja Herramienta
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            name="cajaKitInvierno"
                            value={item.cajaKitInvierno || "Caja Kit Invierno"}
                            onChange={(e) => onHandle(e, i)}
                          />{" "}
                          Caja Kit Invierno
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            name="pertiga"
                            value={item.pertiga || "Pertiga"}
                            onChange={(e) => onHandle(e, i)}
                          />{" "}
                          Pertiga
                        </td>

                        <td>
                          <input
                            type="checkbox"
                            name="cunas"
                            value={item.cunas || "Cunas"}
                            onChange={(e) => onHandle(e, i)}
                          />{" "}
                          Cuñas
                        </td>

                        <td>
                          <input
                            type="checkbox"
                            name="cocoArrastre"
                            value={item.cocoArrastre || "Coco Arrastre"}
                            onChange={(e) => onHandle(e, i)}
                          />{" "}
                          Coco de Arrastre
                        </td>

                        <td>
                          <input
                            type="checkbox"
                            name="segundaRuedaRep"
                            value={item.segundaRuedaRep || "2° Rueda Rep"}
                            onChange={(e) => onHandle(e, i)}
                          />{" "}
                          2° Rueda de Repuesto
                        </td>

                        <td>
                          <input
                            type="checkbox"
                            name="tiroArrastre"
                            value={item.tiroArrastre || "Tiro Arrastre"}
                            onChange={(e) => onHandle(e, i)}
                          />{" "}
                          Tiro Arrastre
                        </td>
                      </tr>
                    </table>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>

          <br></br>
          <header class="w3-container w3-black">
            <h8>
              {" "}
              <BsPlusCircle /> Ingreso Nuevo Movil a la Cotizacion
            </h8>
          </header>
        </div>
      ))}
    </form>
  );
}
