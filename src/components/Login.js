import React, {useState} from 'react';
import { Button, Container, Form, Stack } from 'react-bootstrap';
import firebaseApp from '../Credenciales'
import '../style/Login.css';
import {
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithRedirect,
  GoogleAuthProvider } from  'firebase/auth';

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

// import 'semantic-ui-css/semantic.min.css'

const Logiin = () => {

    const [estaRegistrandose, setEstaRegistrandose] = useState(false);

    async function submitHandler(e){
      e.preventDefault();
      const correo = e.target.formBasicEmail.value;
      const contra = e.target.formBasicPassword.value;
      console.log(correo,contra)
      
   
      if(estaRegistrandose){
        //si esta registrandose 
        const usuario = await createUserWithEmailAndPassword(auth, correo, contra )

      }else {
        //si esta iniciando sesion 
        signInWithEmailAndPassword(auth, correo, contra)

      }
     
    }

    return (
        <div>

          

           
        <Stack className='container-princ'  gap={3}>
           
            <img className='imagen-log' src='https://res.cloudinary.com/dv08oqgvx/image/upload/v1642390432/AmazonasSprint3/ke8eyurt9rc04vspvbvn.png' alt='logo'/>
          
          <div className='title-login'>
          {estaRegistrandose ? "Sign up" : "log in"}
          </div>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="dark" type="submit" >
              {estaRegistrandose ? "Sign up" : "log in"}
            </Button>
          </Form>
          <Button variant="primary" type="submit" style={{ width: '40vw', margin: 'auto' }} onClick={()=>signInWithRedirect(auth, googleProvider)} >
            Sign in with Google
          </Button>
          <Button variant="dark" style={{ width: '40vw', margin: 'auto' }}
            onClick={() => setEstaRegistrandose(!estaRegistrandose)}
          >
            {estaRegistrandose ? "Do you already have an account? log in " : "Don't have an account? Sign up"}
          </Button>




        </Stack>
      
        </div>
    )
}

export default Logiin
