import { 
    Card, 
    CardImg, 
    Col, 
    Button, 
    Row, 
    ListGroup, 
    CardBody, 
    CardTitle, 
    CardText, 
    ListGroupItem 
} from "reactstrap";
import { NumericFormat } from "react-number-format";
import { ServiceResponse } from "../interfaces/ServiceInterfaces";
import { useState } from "react";
import BookingModal from "./BookingModal";

const ServiceCard = ({ service } : {service :ServiceResponse}) => {
    const [show, setShow] = useState(false);
    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
            <Card >
                <CardImg variant="top" src={service.img}/>
                <CardBody style={{'textAlign':'left'}}>
                    <CardTitle style={{'fontSize': '18px'}}>{service.name.toUpperCase()}</CardTitle>
                    <CardText style={{'fontSize': '13px', 'textAlign':'left'}}>
                        {service.description}
                    </CardText>
                </CardBody>
                <ListGroup flush>
                    <ListGroupItem>
                        <Row>
                            <Col>
                                <p>{<i className="bi-clock-fill service-icon"></i>}{`  ${service.duration} hrs`}</p>
                            </Col>
                            <Col>
                                <p>{<i className="bi-coin service-icon"></i>}<NumericFormat value={service.price} displayType={'text'} thousandSeparator={true} prefix="  "/></p>
                            </Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col>
                                <p style={{'fontWeight': 'bold', 'color': '#6E0B4D'}}>No. Sessions:</p>
                            </Col>
                            <Col>
                                <p>  {` ${service.sessions} sessions`}</p>
                            </Col>
                        </Row>
                    </ListGroupItem>
                    
                </ListGroup>
                <CardBody>
                    <Row>
                        <Col>
                            <Button className="app-button" onClick={handleOpen}>Book a Session</Button>
                        </Col>
                        <Col>
                            <Button className='infoButton'>Info</Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <BookingModal onClose={handleClose} isOpen={show} service={service}/>
        </>
    );
}

export default ServiceCard;