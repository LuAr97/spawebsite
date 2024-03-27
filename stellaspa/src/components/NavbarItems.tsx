import { 
    Nav, 
    NavItem, 
    NavLink, 
    DropdownToggle, 
    DropdownMenu, 
    DropdownItem, 
    UncontrolledDropdown
} from "reactstrap";
import { useAdminContext } from "../Context";

const NavbarItems = ({isNavbar} : {isNavbar : boolean}) => {
    const { adminMode, setAdminMode } = useAdminContext();
    const handleLogout = () => {
        setAdminMode(false);
    };

    return (<>
        <Nav className="me-auto" navbar={isNavbar}>
            
            {!adminMode &&
                <>
                    <NavItem>
                        <NavLink href="/">Home</NavLink>
                    </NavItem>
                    <UncontrolledDropdown  nav inNavbar>
                        <DropdownToggle nav caret>
                            Services
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem href="/body">Body</DropdownItem>
                            <DropdownItem href="/facials">Facials</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </>
            } 
        </Nav>
        <Nav navbar={isNavbar}>
            <NavItem>
                <NavLink><span className="bi-envelope-at-fill service-icon"/>{` stellaspa@gmail.com`}</NavLink>
            </NavItem>
            <NavItem>
                <NavLink><span className="bi-telephone-fill service-icon"/>{` +61 0412669852`}</NavLink>
            </NavItem>
            {adminMode 
                ? <NavItem>
                    <NavLink onClick={handleLogout}><span className="bi-box-arrow-right service-icon"></span></NavLink>
                </NavItem>
                : <NavItem>
                    <NavLink href="/login"><span className="bi-person-fill service-icon"></span></NavLink>
                </NavItem>
            }
        </Nav>
    </>);
}
export default NavbarItems;