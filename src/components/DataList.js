import React from 'react';
import { Button, Card, Col, Container, Row, Stack } from 'react-bootstrap';
import firebaseApp from '../Credenciales';
import {getFirestore, updateDoc,doc} from 'firebase/firestore';
import '../style/DataList.css'

const firestore = getFirestore(firebaseApp);




const DataList = ({arrayData, correoUsuario, setArrayData}) => {
    // console.log(arrayData);

    async function deleteData(idDataDelete){
        //crear nuevo array de tareas 

        const nvoArrayData = arrayData.filter((objectData) => objectData.id !== idDataDelete)
        //actualizar base de datos 
        const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
        updateDoc(docuRef, {datas: [...nvoArrayData] });
        //actualizar state
        setArrayData(nvoArrayData)
    }


    return (
        <Container>
            <div className='container-principal-cards'>
                {arrayData.map((objectData) => {
                    return(
                        <>


<Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={objectData.url} />
  <Card.Body>
    <Card.Title>{objectData.description}</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Button variant='danger' onClick={()=> deleteData(objectData.id)}>Delete File</Button>
  </Card.Body>
</Card>


                        <Row >
                            <Col></Col>

                          
                            
                            <Col></Col>

                        </Row>
                        <hr/>
                        </>
                    )

                })}
                </div>
           
            
        </Container>
    )
}

export default DataList

