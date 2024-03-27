import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import { BookingResponse } from "../interfaces/ServiceInterfaces";
const ViewBookingModal = ({booking, onClose, isOpen} : {booking : BookingResponse, onClose : () => void, isOpen : boolean}) => {
    return (
        <Modal isOpen={isOpen} onHide={onClose}>
            <ModalHeader>
                {booking.service}
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Client Name</Label>
                        <Input type="text" defaultValue={booking.client} disabled/>
                    </FormGroup>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label>Age</Label>
                                <Input type="text" defaultValue={booking.age} disabled/>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>Session No.</Label>
                                <Input type="number" defaultValue={booking.current_session} disabled/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label>Relevant Information</Label>
                        <Input type="textarea" defaultValue={booking.comments} disabled/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Phone Number</Label>
                        <Input type="text" defaultValue={booking.phone} disabled/>
                    </FormGroup>
                    
                </Form>
            </ModalBody>
            <ModalFooter>
                <FormGroup>
                    <Button className='infoButton' onClick={onClose}>
                        Cancel
                    </Button>
                </FormGroup>
            </ModalFooter>
        </Modal>
    );
}

export default ViewBookingModal;