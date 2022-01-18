
import React,  { useState } from 'react';
import Approuter from './routes/Approuter';
import Logiin from './components/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import firebaseApp from './Credenciales';
import {getAuth, onAuthStateChanged} from 'firebase/auth'

const auth = getAuth(firebaseApp)


function App() {
  const [usuarioGlobal, setUsuarioGlobal] = useState(null);

  onAuthStateChanged(auth,(usuarioFirebase) => {
    if(usuarioFirebase){
      //codigo e caso de que haya sesion iniciada 
      setUsuarioGlobal(usuarioFirebase)

    }else{
      //codigo en caso de que no haya sesion iniciada
      setUsuarioGlobal(null)
    }
  } )
  return (
    <div>{usuarioGlobal ? <Approuter correoUsuario={usuarioGlobal.email}/> : <Logiin/> }
      
    </div>
  );
}

export default App;
