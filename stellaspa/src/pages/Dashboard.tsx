import Title from "../components/Title";
import { Container, Form, Row, Col, Accordion, Badge, Stack, Card, Image } from "react-bootstrap";
import moment from 'moment'
import { useEffect, useState } from "react";
import { useAccordionButton } from "react-bootstrap";

import axios from "axios";
interface BookingResponse {
    id: number;
    date: string;
    time: string;
    expired: number;
    client: string;
    comments: string;
    service: string;
    currentSession: number;
    img: string;
}

const CustomToggle = ({ eventKey } : { eventKey : string}) => {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        console.log('accordion'),
    );

    return(
        <i className="bi-eye-fill service-icon" onClick={decoratedOnClick} />
    )
}

const Dashboard = () => {
    const [date, setDate] = useState(new Date());
    const [bookingList, setBookingList] = useState<BookingResponse[]>([]);
    const dateFormated = (moment(date)).format('yyyy-MM-DD');

    useEffect(() => {
        fetchBookings();
    },[date]);

    const fetchBookings = async () => {
        try {
            const response = await axios.get<BookingResponse[]>(`/bookings/${(moment(date)).format('yyyy-MM-DD')}`);
            setBookingList(response.data);
        } catch (error) {
            console.error(`Fetch booking for ${(moment(date)).format('yyyy-MM-DD')}`);
        }
    }
    return(<div>
        <Title> Dashboard </Title>
        <Container style={{width: "70%"}}>
            <Form>
                
                <Form.Group as={Row} className="mb-3" controlId="date" >
                    <Form.Label column sm="2">Date</Form.Label>
                    <Col sm="10">
                        <Form.Control type="date" defaultValue={dateFormated}/>
                    </Col>
                </Form.Group>
                <p>{`Displaying appointments for ${(moment(date)).format('ddd DD MMM yyyy')}`}</p>
                <Container>
                    <Accordion defaultActiveKey="0">
                        {bookingList.length == 0 
                        ? <p>There are not booking schedules for this day</p>
                        : bookingList.map((booking) => (
                            <Card key={booking.id} >
                                <Card.Header>
                                    <Container>
                                        <Stack direction="horizontal" gap={2}>
                                            <div className="p-2">
                                                <h6><Badge className="app-button">{booking.time}</Badge> {booking.service} </h6>
                                            </div>
                                            <div className="p-2 ms-auto">
                                                <CustomToggle eventKey={`${booking.id}`}/>
                                            </div>
                                            <div className="p-2">
                                                <i className="bi-x-lg service-icon"></i>
                                            </div>
                                        </Stack>
                                    </Container>
                                </Card.Header>
                                <Accordion.Collapse eventKey={`${booking.id}`}>
                                    <Card.Body as={Row}>
                                        <Col>
                                            <Image src={booking.img} roundedCircle fluid />
                                        </Col>
                                        <Col>
                                            <Row>
                                                <Col className="p-2"> <i className="bi-person-bounding-box service-icon" style={{fontSize : '2rem'}}></i> </Col>
                                                <Col className="p-2"> <p>{booking.client}</p></Col>
                                            </Row>
                                        </Col>
                                        {/* <Row>
                                            <Stack direction="vertical" gap={2}>
                                                
                                                <Row className="p-2 ">
                                                    <Col className="p-2"> <i className="bi-person-bounding-box service-icon" style={{fontSize : '2rem'}}></i> </Col>
                                                    <Col className="p-2"> <p>{booking.client}</p></Col>
                                                </Row>
                                            
                                            
                                                <div className="p-2 ">
                                                    <Col className="p-2"> <i className="bi-flower1 service-icon" style={{fontSize : '2rem'}}></i> </Col>
                                                    <Col className="p-2"> <p>{booking.service}</p></Col>
                                                </div>
                                            </Stack>
                                        </Row> */}
                                        
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        ))}
                    </Accordion>
                </Container>
            </Form>
        </Container>
    </div>)
}

export default Dashboard;