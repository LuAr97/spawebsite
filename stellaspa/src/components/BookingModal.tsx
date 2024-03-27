import { 
    Form,  
    Row, 
    Col, 
    Button, 
    Modal, 
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Label,
    FormGroup,
    FormText } from "reactstrap";
import { ServiceResponse, AvailabilityResponse } from "../interfaces/ServiceInterfaces";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import React from "react";
import axios from "axios";

const BookingModal = ({ service, onClose, isOpen } : { service: ServiceResponse , onClose : () => void, isOpen : boolean}) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [unavailability, setUnavailability] = useState<AvailabilityResponse[]>([]);
    const [name, setName] = useState('');
    const [session, setSession] = useState(0);
    const [comment, setComment] = useState('');
    const [age, setAge] = useState(0);
    const [email, setEmail] = useState('');
    const [availabilityList, setAvailabilityList] =useState(() => {
            const times: string[] = [];
            for (let hour = 9; hour <= 17; hour++) { 
              for (let minute = 0; minute < 60; minute += 30) { 
                const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
                const formattedMinute = minute === 0 ? '00' : `${minute}`;
                const timeString = `${formattedHour}:${formattedMinute}`;
                times.push(timeString);
              }
            }
            return times;
        }
    )
    const [phone, setPhone] = useState('');

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
        
    };

    const fetchUnavailability = async (date : string) => {
        try {
            console.log(`Fetching unavailability for ${date}`);
            const response =  await axios.get<AvailabilityResponse[]>(`/unavailability/${date}`);
            setUnavailability(response.data);
        } catch (error) {
            console.log(`Fetch unavailability for date ${date} failed : ${error}`);
        }
    };

    const handleTime = (event: React.ChangeEvent<HTMLInputElement>) => setTime(event.target.value);
    const handleName = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value);
    const handleSession = (event: React.ChangeEvent<HTMLInputElement>) => setSession(parseInt(event.target.value));
    const handleComments = (event: React.ChangeEvent<HTMLInputElement>) => setComment(event.target.value);
    const handleAge = (event: React.ChangeEvent<HTMLInputElement>) => setAge(parseInt(event.target.value));
    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);
    const handlePhone = (event: React.ChangeEvent<HTMLInputElement>) => setPhone(event.target.value);

    const handleSubmit = async () => {
       
        console.log(`Submiting client for ${name}`);
        axios.post(`/client`,{
            name,
            age,
            email,
            phone
        }).then(async (response) => {
            if (response.status !== 200) {
                console.log(`Submit client for ${name} failed`);
            } else {
                const clientId = response.data.insertId;
                try {
                    await axios.post(`/booking`,{
                        date,
                        time,
                        expired : 0,
                        clientId : clientId,
                        comment,
                        serviceId : service.id,
                        session
                    });  
                } catch (error) {
                    console.log(`Submit booking for ${service.name} failed : ${error}`);
                }
            }
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
    };

    return(
        <div>
            <Modal isOpen={isOpen} onHide={onClose} size="lg">
                <ModalHeader closeButton >
                    {` Booking ${service.name}`}
                </ModalHeader>

                <ModalBody>
                    <Form>
                        <Row>
                            <Col>
                                <FormGroup className="mb-3" controlId="date" >
                                    <Row>
                                        <Label column sm="2">Date</Label>
                                        <Col sm="10">
                                            <Input type="date" onChange={handleDate}/>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup className="mb-3" controlId="time" >
                                    <Row>
                                        <Label column sm="2">Time</Label>
                                        <Col sm="10">
                                            <Input type="select" onChange={handleTime} aria-label="Default select example">
                                                <option></option>
                                                {availabilityList.map( (time) => {
                                                    return <option key={time} value={time}>{time}</option>
                                                })}

                                            </Input> 
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>
                        </Row>

                        <FormGroup className="mb-3" controlId="name" >
                            <Row>
                                <Label column sm="2">Full Name</Label>
                                <Col sm="10">
                                    <Input onChange={handleName} type="text" />
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup className="mb-3" controlId="name" >
                            <Row>
                                <Label column sm="2">Relevant Information</Label>
                                <Col sm="10">
                                    <Input onChange={handleComments} type="textarea" rows={3}/>
                                    <FormText>Allergies, sickness, diets and any necesary information.</FormText>
                                </Col>
                            </Row>
                        </FormGroup>

                        <Row>
                            <Col>
                                <FormGroup className="mb-3" controlId="name" >
                                    <Row>
                                        <Label column sm="2">Current Session</Label>
                                        <Col sm="10">
                                            <Input type="select" onChange={handleSession} aria-label="Default select example">
                                                <option>Seleccionar</option>
                                                {[...Array(service.sessions+1)].map( (e, i) => (
                                                    (i !== 0) && <option key={i} value={i}>{ i}</option>
                                                ))}
                                            </Input>
                                            <FormText>If it is first time or it is starting the treament again. please select 0.</FormText>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>

                            <Col>
                                <FormGroup className="mb-3" controlId="age" >
                                    <Row>
                                        <Label column sm="2">Age</Label>
                                        <Col sm="10">
                                            <Input onChange={handleAge} type="number" />
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>
                        </Row>

                        <FormGroup className="mb-3" controlId="email" >
                            <Row>
                                <Col>
                                    <Row>
                                        <Label column sm={2}>Email</Label>
                                        <Col sm={10}>
                                            <Input onChange={handleEmail} type="email" />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row>
                                        <Label column sm={2}><span className="bi-telephone-fill service-icon"/></Label>
                                        <Col sm={10}>
                                            <Input onChange={handlePhone} type="text" />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </FormGroup>
                    </Form>
                </ModalBody>

                <ModalFooter>
                    <Form>
                        <Row>
                            <Col sm={4}>
                            <p>{`Total: `} <NumericFormat value={service.price} displayType={'text'} thousandSeparator={true} prefix="  "/></p>
                            </Col>
                            <Col sm={4}>
                                <Button className="app-button" onClick={handleSubmit}>
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
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default BookingModal;