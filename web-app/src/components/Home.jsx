import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Modal, Button, Form, FormControl, InputGroup } 
    from 'react-bootstrap';
import './Home.css';

export default class Home extends Component {
    render() {
        return (
            <Container>
                <Jumbotron>
                    <div className="div-align">
                        <h2>AttendanceControl</h2>
                        <p>Este é um mecanismo para automação do controle de presença em sala de aula.</p>
                    </div>
                </Jumbotron>

                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Bem vindo, professor! </Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="modal-body">
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <InputGroup>
                                    <FormControl
                                    placeholder="email"
                                    aria-label="email"
                                    aria-describedby="basic-addon2"
                                    />
                                    <InputGroup.Append>
                                        <InputGroup.Text id="basic-addon2">@unifei.edu.br</InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="senha" />
                            </Form.Group>

                            <div className="form-body-button-position">
                                <Link to="/main">
                                    <Button variant="primary" type="submit">
                                        ENTRAR 
                                    </Button>
                                </Link>
                            </div>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer className="form-footer">
                        <Link to="/registeruser">
                            <Button variant="outline-primary">
                                CADASTRE-SE
                            </Button>
                        </Link>
                    </Modal.Footer>
                </Modal.Dialog>

            </Container>
        )
    }
}