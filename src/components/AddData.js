import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import firebaseApp from '../Credenciales';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import '../style/AddData.css'

const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);



const AddData = ({ correoUsuario, setArrayData, arrayData }) => {
    let urlDescarga

    async function addData(e) {
        e.preventDefault();
        const description = e.target.formDescription.value;
        console.log(description);
        //crear un nuevo array de data
        const nvoArrayData = [...arrayData,
        {
            description: description,
            id: new Date(),
            url: urlDescarga ,
        },
        ];
        //Actualizar base de datos
        const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
        updateDoc(docuRef, { datas: [...nvoArrayData] });
        //Actualizar estado
        setArrayData(nvoArrayData)

    }

    async function fileHandler(e){
        //detectar archivo
        const archivoLocal = e.target.files[0];
        //cargar a firebase storage
        const archivoRef = ref(storage, `documentos/${archivoLocal.name}`);
        await uploadBytes(archivoRef, archivoLocal)
        //obtener la url
         urlDescarga = await getDownloadURL(archivoRef);

    }
    return (
        <div>
            <Container>
                <Form onSubmit={addData}>
                    <Form.Group className="mb-5" >
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Describe your data" id="formDescription" />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="file">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="file" placeholder="Add file" onChange={fileHandler} />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <hr/>

            </Container>

        </div>
    )
}

export default AddData
