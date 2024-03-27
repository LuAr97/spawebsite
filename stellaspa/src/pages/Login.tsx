import { Container, Form, Row, Col, Button, Alert } from "react-bootstrap";
import Title from "../components/Title";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const[username, setUsername] = useState('');
    const[password, setPassword] =  useState('');
    const[account, setAccount] = useState({
        
            id: 1,
            first_name: "Luisa",
            last_name: "Arboleda",
            email: "luisa_arbol97@gmail.com",
            username: "luisaArbol",
            password: "password"
        
    });
    const [message, setMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const navigate =  useNavigate();

    const fetchAccount = async () => {
        console.log('>>',username)
        try {
            const response = await axios.get(`/accounts/${username}`);
            if (response.data.length > 0){
                setAccount(response.data[0]);
            }
            
        } catch (error) {
            console.error(`Fetch account for username ${username} failed`);
            
        }
    };
    const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => (setUsername(event.target.value));
    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => (setPassword(event.target.value));

    const handleSubmit = async () => {  
        fetchAccount().then(() => {  
            console.log(account)
            if(account && account.username === username){
                if (account.password === password){
                    sessionStorage.setItem('accountId', `${account.id}`);
                    sessionStorage.setItem('accountName', `${account.first_name}`);
                    navigate('/dashboard', { state : { account : account}});
                }else{
                    console.log("Wrong Password");
                    setMessage("Password does not match any account");
                    setShowAlert(true);
                }
            } else {
                console.log("Wrong Username");
                setMessage("Username does not match any account");
                setShowAlert(true);
            }
        });
    }

    return(<div>
        <Title> Login </Title>
        <Container style={{width: '70%', marginTop:'5em'}}>
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="username" >
                    <Form.Label column sm="2">Username</Form.Label>
                    <Col sm="10">
                        <Form.Control type="input" onChange={handleUsername}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="password" >
                    <Form.Label column sm="2">Password</Form.Label>
                    <Col sm="10">
                        <Form.Control type="password" onChange={handlePassword}/>
                    </Col>
                </Form.Group>
                <Form.Group>
                    <Button className="app-button" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Form.Group>
                {showAlert && 
                    <Alert key={message} variant='danger'>
                        {message}
                    </Alert>

                }           
            </Form>
        </Container>
    </div>)
}

export default Login;