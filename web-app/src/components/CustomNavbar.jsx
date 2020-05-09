import React, { Component, Container } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CustomNavbar.css';

export default class CustomNavbar extends Component {
    render() {
        return (
            <Container>
                <Navbar default collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/"> attendancecontrol</Link>
                        </Navbar.Brand>

                        <Navbar.Toggle />
                    </Navbar.Header>

                    <Navbar.Collapse>
                        <Nav pullRight>

                            <NavItem eventKey={1} componentClass={Link} to="/">
                                Button1
                            </NavItem>
                            <NavItem eventKey={2} componentClass={Link} to="/home">
                                Button2
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        )
    }
}