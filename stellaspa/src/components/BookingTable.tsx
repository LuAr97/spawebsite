import { 
    Table, 
    Tooltip 
} from "reactstrap";
import { BookingResponse } from "../interfaces/ServiceInterfaces";
import { useState } from "react";
import axios from "axios";
import ViewBookingModal from "./ViewBookingModal";

const BookingTable = ({bookingList, setBookingList} : {bookingList : BookingResponse[], setBookingList : any}) => {
    const headers = [
        {
            key : 1,
            label : 'Time',
            width : '20%'
        },
        {
            key : 2,
            label : 'Treatment Name',
            width : '60%'
        },
        {
            key : 3,
            label : '',
            width : '10%'
        },
        {
            key : 4,
            label : '',
            width : '10%'
        },


    ];
    const [tooltipView, setTooltipView] = useState(false);
    const [tooltipReject, setTooltipReject] = useState(false);
    const [show, setShow] = useState(false);
    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);

    const toggleView = () => setTooltipView(!tooltipView);
    const toggleReject = () => setTooltipReject(!tooltipReject);

    const handleReject = (booking : BookingResponse, index : number) => () => {
        try {
            axios.post(`/reject/booking/${booking.id}`);
            const updatedList = bookingList.filter(item => item.id !== booking.id);
    
            setBookingList(updatedList);
        } catch (error) {
            console.error('Reject booking failed')
        }
    };

    return (
        <Table responsive>
            <thead>
                <tr>
                    {headers.map((header) => (
                        <th key={header.width} style={{width : header.width}}>
                            {header.label}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {bookingList.map((booking, index) => (
                    <tr key={booking.id}>
                        <td>{booking.time}</td>
                        <td>{booking.service}</td>
                        <td>
                            <i id="view" className="bi-eye-fill service-icon" onClick={handleOpen}/>
                            <Tooltip
                                isOpen={tooltipView}
                                target='view'
                                toggle={toggleView}
                            >
                                More information
                            </Tooltip>
                            <ViewBookingModal booking={booking} onClose={handleClose} isOpen={show}/>
                        </td>
                        <td>
                            <i id="reject" className="bi-x-square-fill service-icon" onClick={handleReject(booking, index)}/>
                            <Tooltip
                                isOpen={tooltipReject}
                                target='reject'
                                toggle={toggleReject}
                            >
                                Reject an appoiment
                            </Tooltip>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
 export default BookingTable;