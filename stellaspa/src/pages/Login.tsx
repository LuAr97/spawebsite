import { 
    Container, 
    Form, 
    Row, 
    Col, 
    Button, 
    Alert, 
    Input, 
    Label, 
    FormGroup 
} from "reactstrap";
import Title from "../components/Title";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../Context";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] =  useState('');
    const [message, setMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const navigate =  useNavigate();
    const {adminMode, setAdminMode} = useAdminContext();

    
    const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value);
    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);

    const handleSubmit = async () => {  
        axios.get(`/accounts/${username}`).then((response) => {  
            const account = response.data[0];
            console.log(account)
            if(account && account.username === username){
                if (account.password === password){
                    sessionStorage.setItem('accountId', `${account.id}`);
                    sessionStorage.setItem('accountName', `${account.first_name}`);
                    setAdminMode(true);
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
    };

    return(<div>
        <Title> Login </Title>
        <Container style={{width: '70%', marginTop:'5em'}}>
            <Form>
                <FormGroup className="mb-3" controlId="username" >
                    <Row>
                        <Label column sm="2">Username</Label>
                        <Col sm="10">
                            <Input onChange={handleUsername}/>
                        </Col>
                    </Row>
                </FormGroup>

                <FormGroup className="mb-3" controlId="password" >
                    <Row>
                        <Label column sm="2">Password</Label>
                        <Col sm="10">
                            <Input type="password" onChange={handlePassword}/>
                        </Col>
                    </Row>
                </FormGroup>

                <FormGroup>
                    <Button className="app-button" onClick={handleSubmit}>
                        Submit
                    </Button>
                </FormGroup>

                {showAlert && 
                    <FormGroup>
                        <Alert key={message} color='danger'>
                            {message}
                        </Alert>
                    </FormGroup>
                }           
            </Form>
        </Container>
    </div>);
}

export default Login;