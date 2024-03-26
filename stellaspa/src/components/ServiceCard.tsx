import { Card, CardImg, Col, Button, Row, ListGroup, Modal } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import ServiceResponse from "../interfaces/ServiceInterfaces";
import { useState } from "react";
import Title from "./Title";
import BookingModal from "./BookingModal";

const ServiceCard = ({ service } : {service :ServiceResponse}) => {
    const [show, setShow] = useState(false);
    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
        <Card className="serviceCard">
            <CardImg variant="top" src={service.img}/>
            <Card.Body style={{'textAlign':'left'}}>
                <Card.Title style={{'fontSize': '18px'}}>{service.name.toUpperCase()}</Card.Title>
                <Card.Text style={{'fontSize': '13px', 'textAlign':'left'}}>
                    {service.description}
                </Card.Text>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                <p>{<i className="bi-clock-fill service-icon"></i>}{`  ${service.duration} hrs`}</p>
                            </Col>
                            <Col>
                                <p>{<i className="bi-coin service-icon"></i>}<NumericFormat value={service.price} displayType={'text'} thousandSeparator={true} prefix="  "/></p>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                <p style={{'fontWeight': 'bold', 'color': '#6E0B4D'}}>No. Sesiones:</p>
                            </Col>
                            <Col>
                                <p>  {` ${service.sessions} sessiones`}</p>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    
                </ListGroup>
                <Row>
                    <Col>
                        <Button onClick={handleOpen}>Book a Session</Button>
                    </Col>
                    <Col>
                        <Button className='infoButton'>Info</Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
        <BookingModal onClose={handleClose} show={show} service={service}/>
        </>
    );
}

export default ServiceCard;