import { Form, Card, Container, Row, Col, Button, Modal } from "react-bootstrap";
import Title from "./Title";
import ServiceResponse from "../interfaces/ServiceInterfaces";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import React from "react";
import axios from "axios";
import AvailabilityResponse from "../interfaces/AvailabilityInterface";
import { json } from "stream/consumers";

const BookingModal = ({ service, onClose, show } : { service: ServiceResponse , onClose : () => void, show : boolean}) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [timeEnable, setTimeEnable] = useState(false);
    const [unavailability, setUnavailability] = useState<AvailabilityResponse[]>([]);
    const [name, setName] = useState('');
    const [session, setSession] = useState(0);
    const [comment, setComment] = useState('');
    const [clientId, setClientId] = useState(0);
    const [age, setAge] = useState(0);
    const [email, setEmail] = useState('');
    const [availabilityList, setAvailabilityList] =useState(['9:00','9:30','10:00','10:30','11:00','11:30',,'12:00','12:30','1:00','1:30','2:00','2:30','3:00','3:30','4:00','4:30'])


    const handleDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        var availability = availabilityList;
        setDate(event.target.value);
        fetchUnavailability(event.target.value);
        unavailability.map((item) => {
            const time = item.time;
            if(availability.includes(time)) {
                availability.splice(availability.indexOf(time),1);
            }
        })
        console.log(availability);
        setAvailabilityList(availability);
        
    }

    const fetchUnavailability = async (date : string) => {
        
        try {
            console.log(`Fetching unavailability for ${date}`);
            const response =  await axios.get<AvailabilityResponse[]>(`/unavailability/${date}`);
            setUnavailability(response.data);
        } catch (error) {
            console.log(`Fetch unavailability for date ${date} failed : ${error}`);
        }
    }

    const handleTime = (event: React.ChangeEvent<HTMLSelectElement>) => (setTime(event.target.value));
    const handleName = (event: React.ChangeEvent<HTMLInputElement>) => (setName(event.target.value));
    const handleSession = (event: React.ChangeEvent<HTMLSelectElement>) => (setSession(parseInt(event.target.value)));
    const handleComments = (event: React.ChangeEvent<HTMLTextAreaElement>) => (setComment(event.target.value));
    const handleAge = (event: React.ChangeEvent<HTMLInputElement>) => (setAge(parseInt(event.target.value)));
    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => (setEmail(event.target.value));

    const handleSubmit = async () => {
        try {
            console.log(`Submit client for ${name}`);
            const response = await axios.post(`/client`,{
                name,
                age,
                email
            });

            setClientId(response.data.insertId);
            console.log(clientId);
            try {
                console.log(`Submit booking for ${service.name}`);
                await axios.post(`/booking`,{
                    date,
                    time,
                    expired : 0,
                    clientId,
                    comment,
                    serviceId : service.id,
                    session
                });

                try {
                    console.log(`Submit availability for ${date} ${time}`);
                    await axios.post(`/availability`,{
                        date,
                        time
                    });
                    
                    onClose();
                } catch (error) {
                    console.log(`Submit unavailability ${date} ${time} failed : ${error}`);
                }
                
            } catch (error) {
                console.log(`Submit booking for ${service.name} failed : ${error}`);
            }
            
        } catch (error) {
            console.log(`Submit client for ${name} failed : ${error}`);
        }
        

        
    }
    return(
        <div>
            <Modal show={show} onHide={onClose} size="lg">
                <Modal.Header closeButton >
                    <Modal.Title >{` Booking ${service.name}`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="exampleForm.Description" >
                            <Form.Label column sm="2">Descripcion : </Form.Label>
                            <Col sm="10">
                                <p>{service.description} 11111111111111111 1111111111111111111 111111111111111111111 111111111111111111111 11111111111111111111111111111111111111 1111111111111111111111 111111111111111111111111111 111111111111111111111111111 11111111111111111111</p>
                            </Col>
                            
                        </Form.Group>
                        <Container>
                            <Row>
                                <Col>
                                    <Form.Group as={Row} className="mb-3" controlId="date" >
                                        <Form.Label column sm="2">Fecha</Form.Label>
                                        <Col sm="10">
                                            <Form.Control type="date" onChange={handleDate}/>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group as={Row} className="mb-3" controlId="time" >
                                        <Form.Label column sm="2">Hora</Form.Label>
                                        <Col sm="10">
                                        <Form.Select onChange={handleTime} aria-label="Default select example">
                                            <option></option>
                                            {availabilityList.map( (time) => {
                                                return <option key={time} value={time}>{time}</option>
                                            })}

                                        </Form.Select> 
                                        </Col>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Container>
                        
                        
                        <Form.Group as={Row} className="mb-3" controlId="name" >
                            <Form.Label column sm="2">Nombre Completo</Form.Label>
                            <Col sm="10">
                                <Form.Control onChange={handleName} type="text" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="name" >
                            <Form.Label column sm="2">Informacion Relevante</Form.Label>
                            <Col sm="10">
                                <Form.Control onChange={handleComments} as="textarea" rows={3}/>
                                <Form.Text >Alergias, enfermedades, dietas y/o alguna informacion necesaria.</Form.Text>
                            </Col>
                            
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="name" >
                            <Form.Label column sm="2">No. Sesiones Hechas</Form.Label>
                            <Col sm="10">
                                <Form.Select onChange={handleSession} aria-label="Default select example">
                                    <option>Seleccionar</option>
                                    {[...Array(service.sessions)].map( (e, i) => {
                                        return <option key={i} value={i}>{i}</option>
                                    })}

                                </Form.Select>
                                <Form.Text>Si es primera cita o esta volviento a comenzar el tratamiento, selecione 0.</Form.Text>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="age" >
                            <Form.Label column sm="2">Edad</Form.Label>
                            <Col sm="10">
                                <Form.Control onChange={handleAge} type="number" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="email" >
                            <Form.Label column sm="2">Correo Electronico</Form.Label>
                            <Col sm="10">
                                <Form.Control onChange={handleEmail} type="email" />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Form>
                        <Row>
                            <Col sm={4}>
                            <p>{`Total: `} <NumericFormat value={service.price} displayType={'text'} thousandSeparator={true} prefix="  "/></p>
                            </Col>
                            <Col sm={4}>
                                <Button onClick={handleSubmit}>
                                    Submit
                                </Button>
                            </Col>
                            <Col sm={4}>
                                <Button className='infoButton' onClick={onClose}>
                                    Cancel
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    
                </Modal.Footer>
            </Modal>
            
        </div>
    );
}

export default BookingModal;