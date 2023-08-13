
import { Routes, Route } from "react-router-dom";
import Home from "../componentes/home";
//import AuthUser from "../conecciones/authUsers";
import Dashboard from "../componentes/dashboard";
import Cotizacion from "../componentes/cotizacion";
import ListaCotizacion from "../componentes/listaCotizacion";
import ListaItem from "../componentes/listaItem";
import IngresarUsuario from "../componentes/ingresarUsuario";
import ListaUsuario from "../componentes/listaUsuario";
import EditUser from "../componentes/editUser";

export default function Rutas(){

    return(
      

  <Routes>

    <Route path="/" element={<Home />}/>
    <Route path="/dashboard" element={<Dashboard />}/>
    <Route path="/cotizacion" element={<Cotizacion />}/>
    <Route path="/listaCotizacion" element={<ListaCotizacion />}/>
    <Route path="/listaItem/:cot_id" element={<ListaItem/>}></Route>
    <Route path="/ingresarUsuario" element={<IngresarUsuario />}/>
    <Route path="/listaUsuario" element={<ListaUsuario />}/>
    <Route path="/editaUsuarios/:id" element={<EditUser />}/>  

    {/* <Route path="/register" element={<Register />}/>

    <Route path="/cambioPass" element={<CambioPass />}/>

    <Route path="/listUsers" element={<ListUser />}/>

    <Route path="/editaUsuarios/:id" element={<EditUser />}/>  

    <Route path="/listaEmpresas" element={<ListEmpresa />}/>

   <Route path="/createEmpresa" element={<CreateEmpresa />}/> */}

  </Routes>


    )
}