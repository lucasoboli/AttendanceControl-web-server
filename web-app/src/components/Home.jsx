import React from 'react';
import axios from 'axios';
import Link from 'react-router-dom/Link';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import './Home.css';


const Jumbo = {
    paddingTop: '10rem',
    width: '80%',
    margin: 'auto'
};

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    onSubmit = event => {
        event.preventDefault()

        const userObject = {
            email: this.state.email,
            password: this.state.password,
        };

        axios.post('http://localhost:3333/login', userObject)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });

        this.setState({ email: '', password: '' })
    }

    render() {
        const {
            email,
            password
        } = this.state;

        return (

            <React.Fragment>
                <div className='h-navbar'> attendancecontrol.unifei </div>
                
                <Container>
                    <Jumbotron style={Jumbo}>
                        <div style={{textAlign:'center'}}>
                            <h2>AttendanceControl</h2>
                            <p>Este é um mecanismo para automação do controle de presença em sala de aula.</p>
                        </div>
                    </Jumbotron>

                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title>Bem vindo, professor! </Modal.Title>
                        </Modal.Header>

                        <Modal.Body className='h-modal-body'>
                            <Form>
                                <Form.Group controlId='formBasicEmail'>
                                    <InputGroup>
                                        <FormControl
                                            placeholder='Email'
                                            aria-label='Email'
                                            aria-describedby='basic-addon2'
                                            name='email'
                                            value={email}
                                            onChange={this.handleChange}
                                        />
                                        <InputGroup.Append>
                                            <InputGroup.Text id='basic-addon2'>@unifei.edu.br</InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group controlId='formBasicPassword'>
                                    <Form.Control
                                        type='password'
                                        placeholder='Senha'
                                        name='password'
                                        value={password}
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>

                                <div style={{textAlign:'center'}}>
                                    <Link to='/main'>
                                        <Button variant='primary' type='submit' onClick={this.onSubmit}>
                                            ENTRAR
                                        </Button>
                                    </Link>
                                </div>
                            </Form>
                        </Modal.Body>

                        <Modal.Footer style={{justifyContent:'center'}}>
                            <Link to='/registeruser'>
                                <Button variant='outline-primary'>
                                    CADASTRE-SE
                            </Button>
                            </Link>
                        </Modal.Footer>
                    </Modal.Dialog>

                </Container>
            </React.Fragment>
        )
    }
}