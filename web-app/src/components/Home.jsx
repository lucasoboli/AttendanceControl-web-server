import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Row, Col, Image, Button } from 'react-bootstrap'
import './Home.css';

export default class Home extends Component {
    render() {
        return (
            <Container>
                <Jumbotron>
                    <h2>Welcome to AttendanceControl!</h2>
                    <p>This is a mechanism for automated attendance in classrooms.</p>
                </Jumbotron>

                <Link to="/main">
                    <Button variant="primary"> Main </Button>
                </Link>
            </Container>
        )
    }
}