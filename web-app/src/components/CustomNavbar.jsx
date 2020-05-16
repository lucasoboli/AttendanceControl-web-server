import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Link from 'react-router-dom/Link';
import './CustomNavbar.css';


class CustomNavbar extends React.Component {
    render() {
        return (

            <Container>
                <Navbar default collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to='/'> attendancecontrol</Link>
                        </Navbar.Brand>

                        <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    </Navbar.Header>

                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ml-auto'>
                            <Nav.Item> <Nav.Link href='#'> Button1 </Nav.Link> </Nav.Item>
                            <Nav.Item> <Nav.Link href='#'> Button2 </Nav.Link> </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>

        );
    }
}

export default CustomNavbar;