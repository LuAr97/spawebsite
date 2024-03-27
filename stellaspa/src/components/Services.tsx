import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row, Container } from "reactstrap";
import ServiceCard from "./ServiceCard";
import { ServiceResponse } from "../interfaces/ServiceInterfaces";


interface Props {
    type: boolean
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
    };
    
    
    return(
        <Container className="servicesContainer">
            <Row xs={1} md={3} className="g-4">
                { servicesList.length > 0 
                ? servicesList.map((service) => {
                    return(
                        <Col key={service.id}>
                            <ServiceCard service={service}/>
                        </Col>
                    );
                })
                : <h5>Sorry we are currently going some issues. try again later</h5>
                }
            </Row>
        </Container>
    );
};
export default Services;