import './App.css';
//import "bootstrap/dist/css/bootstrap.min.css";
import AuthUser from './conecciones/authUsers';
import Guest from './navbar/guest';
import Auth from './navbar/auth';

function App() {
  const{getToken}=AuthUser();
    if(!getToken()){
      return <Guest />
    }


  return (
   <Auth />
   
  );
}

export default App;
