import { Navbar, Container, Nav, NavDropdown,Button } from "react-bootstrap";

const NavbarComponent = () => {
    return (
        <Navbar className="shadow p-1">
            <Container>
                <Navbar.Brand href="/">
                    <img src="/logo.png" width="145" height="38"/>
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Item>
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav.Item>
                    <NavDropdown title="Services" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/corporales">Body</NavDropdown.Item>
                        <NavDropdown.Item href="/faciales">Facials</NavDropdown.Item>
                    </NavDropdown> 
                    {sessionStorage.getItem('accountId') && 
                        <Nav.Item>
                            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                        </Nav.Item>
                    }
                </Nav>
                <Nav.Item className="justify-content-end">
                    <a href="/login"><i className="bi-person-fill service-icon"></i></a>
                </Nav.Item>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;