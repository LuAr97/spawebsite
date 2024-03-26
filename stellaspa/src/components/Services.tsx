import userEvent from "@testing-library/user-event";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardImg, Col, Container, Button, Row } from "react-bootstrap";

interface Props {
    type: boolean
}

interface ServiceResponse{
    id: number;
    img: string;
    price: number;
    name: string;
    description: string;
    duration: number;
    type: number;
    sessions: number;
}
const Services = ({ type } : Props) => {
    const [servicesList, setServicesList] = useState<ServiceResponse[]>([]);
    
    const serviceType = type ? 1 : 2;
    useEffect(() => {
        fetchServices();
    },[]);
    const fetchServices = async ()  => {
        try {
            const response = await axios.get<ServiceResponse[]>(`/api/services/type/${serviceType}`);
            setServicesList(response.data);
            
        } catch (error) {
           console.log(`Failed to fetch ${type ? 'Facial' : 'Body'} services : ${error}`) 
        }
    }
    
    
    return(
        <Container className="servicesContainer">
            <Row xs={1} md={3} className="g-4">
                { servicesList.length > 0 
                ? servicesList.map((service) => {
                    return(
                        <Col key={service.id}>
                            <Card className="serviceCard">
                                <CardImg variant="top" src={service.img}/>
                                <Card.Body>
                                    <Card.Title>{service.name.toUpperCase()}</Card.Title>
                                    <Card.Text>
                                        {service.description}
                                    </Card.Text>
                                    <Button>Book a Session</Button>
                                    <Button className='infoButton'>Info</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })
                : <h5>Sorry we are currently going some issues. try again later</h5>
                }
            </Row>
        </Container>
    )
}
export default Services;