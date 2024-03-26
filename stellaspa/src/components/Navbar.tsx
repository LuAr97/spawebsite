import { Navbar, Container, Nav, NavDropdown,Button } from "react-bootstrap";
import "../styles/components/Navbar.css"
const NavbarComponent = () => {
    return (
        <Navbar className="shadow p-1">
            <Container>
                <Navbar.Brand href="/">
                    <img src="/logo.png" width="145" height="38"/>
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Item>
                        <Nav.Link href="/">Inicio</Nav.Link>
                    </Nav.Item>
                    <NavDropdown title="Servicios" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/corporales">Corporales</NavDropdown.Item>
                        <NavDropdown.Item href="/faciales">Faciales</NavDropdown.Item>
                    </NavDropdown> 
                </Nav>
                <Nav.Item className="justify-content-end">
                    <a href="/login"><i className="bi-person-fill service-icon"></i></a>
                </Nav.Item>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;