import {Routes,Route} from 'react-router-dom';
import Home from '../componentes/home';
//import Login from '../componentes/login';


function Guest() { 

  return(
    <div >

{/* <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
<div className="container-fluid">
  <ul className="navbar-nav">
    <li className="nav-item">
      <Link className="nav-link active" to="/">Home</Link>
    </li>

    <li className="nav-item">
    <Link className="nav-link active" to="/login">Login</Link>
    </li> 
  </ul>

</div>
</nav> */}


<div className="">
  <Routes>
    <Route path="/" element={<Home />}/>
   {/*  <Route path="/login" element={<Login />}/> */}
      </Routes>
</div>

    </div>

  )

 
}

 

export default Guest;