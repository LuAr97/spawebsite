export interface ServiceResponse{
    id: number;
    img: string;
    price: number;
    name: string;
    description: string;
    type: number;
    sessions: number;
}
export interface AvailabilityResponse{
    id: number;
    time: string;
    date: string;
}

export interface BookingResponse {
    id: number;
    date: string;
    time: string;
    expired: number;
    client: string;
    age: number;
    comments: string;
    service: string;
    current_session: number;
    img: string;
    phone: string;
}