import Title from "../components/Title";
import { 
    Container, 
    FormGroup, 
    Label, 
    Input, 
    Row, 
    Col,
    Card,
    CardHeader
} from "reactstrap";
import moment from 'moment'
import { useEffect, useState } from "react";
import { BookingResponse } from "../interfaces/ServiceInterfaces";
import axios from "axios";
import BookingTable from "../components/BookingTable";

const Dashboard = () => {
    const [date, setDate] = useState(new Date());
    const [bookingList, setBookingList] = useState<BookingResponse[]>([]);
    const dateFormated = (moment(date)).format('yyyy-MM-DD');

    const  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setDate(new Date(event.target.value));

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
    };

    return(<div>
        <Title> My Bookings </Title>
        <Container style={{width: "70%"}}>
            <FormGroup className="mb-3" controlId="date" >
                <Row>
                    <Label column sm="2">Date</Label>
                    <Col sm="10">
                        <Input type="date" defaultValue={dateFormated} onChange={handleChange}/>
                    </Col>
                </Row>
            </FormGroup>

            <p>{`Displaying appointments for ${(moment(date)).format('ddd DD MMM yyyy')}`}</p>
            
            {bookingList.length === 0 
            ? <Card>
                <CardHeader>
                    No treatments booked for today
                </CardHeader>
            </Card>
            : <BookingTable bookingList={bookingList} setBookingList={setBookingList}/>}
        </Container> 
    </div>)
};

export default Dashboard;