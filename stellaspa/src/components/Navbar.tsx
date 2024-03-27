
import { 
    Navbar, 
    NavbarToggler, 
    Collapse,  
    NavbarBrand
} from "reactstrap";
import { useState } from "react";
import { isMobile } from "react-device-detect";
import NavbarItems from "./NavbarItems";

const NavbarComponent = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    
    return (
        <Navbar className="shadow p-1">
            <NavbarBrand href="/">
                <img src="/logo.png" width="145" height="38" alt="logo"/>
            </NavbarBrand>
            {(isMobile && 
                <>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <NavbarItems isNavbar={true}/>
                    </Collapse>
                </>) ||
                <NavbarItems isNavbar={false}/>
            }
            
        </Navbar>
    );
}

export default NavbarComponent;