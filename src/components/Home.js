import React, {useEffect, useState} from 'react'
import firebaseApp from '../Credenciales';
import { getAuth, signOut } from 'firebase/auth';
import { Button, Container } from 'react-bootstrap';
import AddData from './AddData';
import DataList from './DataList';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'
import '../style/Home.css'

const auth = getAuth(firebaseApp)
const firestore = getFirestore(firebaseApp)

const Home = ({correoUsuario}) => {
    // console.log(correoUsuario);

    const [arrayData, setArrayData] = useState(null);
    

    const fakeData=[
        {id:1, description:"Fake Data 1", url: "https://res.cloudinary.com/dv08oqgvx/image/upload/v1642390432/AmazonasSprint3/ke8eyurt9rc04vspvbvn.png"},
        {id:2, description:"Fake Data 2", url: "https://res.cloudinary.com/dv08oqgvx/image/upload/v1642390432/AmazonasSprint3/ke8eyurt9rc04vspvbvn.png"},
        {id:3, description:"Fake Data 3", url: "https://res.cloudinary.com/dv08oqgvx/image/upload/v1642390432/AmazonasSprint3/ke8eyurt9rc04vspvbvn.png"},
    ];

    async function buscarDocumentOrCreardocumento(idDocumento){
        //crear referencia al documento
        const docuRef = doc(firestore, `usuarios/${idDocumento}`);
        //buscar dosumento 
        const consulta = await getDoc(docuRef);
        //revisar si existe
        if(consulta.exists()){
             //si si exite 
           const infoDocu = consulta.data();
           return infoDocu.datas
        }else{

             //si no existe
             await setDoc(docuRef, {datas: [...fakeData]});
             const consulta = await getDoc(docuRef);
             const infoDocu= consulta.data();
             return infoDocu.datas;
        }

       

       


    }

    useEffect(() => {
        async function fetchData() {
          const DataFetchadas = await buscarDocumentOrCreardocumento(
              correoUsuario
              );
              setArrayData(DataFetchadas)

        }
        fetchData()
       


    }, []);

    

    return (
        <Container className='container-principal-home'>
            <h1>¡Hi, Welcome!</h1>
            <Button onClick={()=> signOut(auth)}>Sign off</Button>
            <hr/>
            <AddData
             arrayData={arrayData} 
             setArrayData={setArrayData} 
             correoUsuario={correoUsuario}
             />
           { 
            arrayData 
            ? <DataList
             arrayData={arrayData} 
             setArrayData={setArrayData} 
             correoUsuario={correoUsuario}
             />
            : null 
            } 
        </Container>
    )
}

export default Home
