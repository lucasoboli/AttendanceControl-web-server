import React from 'react';
import axios from 'axios';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import CustomNavbar from './CustomNavbar';
import '../style/Home.css';


const initialErrorState = {
    emailError: "",
    passwordError: ""
};


class Home extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            email: "",
            password: "",
            emailError: "",
            passwordError: ""
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit = event => {
        event.preventDefault()

        const userObject = {
            email: this.state.email + '@unifei.edu.br',
            password: this.state.password,
        };

        axios.post('http://localhost:3333/login', userObject)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });

        this.setState({ password: '' });

        const isValid = this.validate();
        if (isValid) {
            // Limpando erros do Form
            this.setState(initialErrorState);
        }
    }

    validate = () => {
        let emailError = '';
        let passwordError = '';

        if (this.state.email.length === 0) {
            emailError = '* Este campo é obrigatório';
        }

        if (this.state.password.length === 0) {
            passwordError = '* Este campo é obrigatório';
        }

        if (emailError || passwordError) {
            this.setState({ emailError, passwordError });
            return false;
        }

        return true;
    }


    render() {

        const {
            email,
            password
        } = this.state;

        return (

            <React.Fragment>
                <CustomNavbar pageName='home' />

                <Container>
                    <Jumbotron className='h-jumbotron'>
                        <svg className="bi bi-check-all" width="5em" height="5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M12.354 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L5 10.293l6.646-6.647a.5.5 0 01.708 0z" clipRule="evenodd"/>
                            <path d="M6.25 8.043l-.896-.897a.5.5 0 10-.708.708l.897.896.707-.707zm1 2.414l.896.897a.5.5 0 00.708 0l7-7a.5.5 0 00-.708-.708L8.5 10.293l-.543-.543-.707.707z"/>
                        </svg>
                        <h2>AttendanceControl</h2>
                        <p>Este é um mecanismo para automação do controle de presença em sala de aula.</p>
                        <a href='/main'> [dev-shortcut] -> main</a>
                    </Jumbotron>

                    <Modal.Dialog className='h-modal-dialog'>
                        
                        <Modal.Header className='h-modal-header'>
                            <Modal.Title>Bem vindo, professor </Modal.Title>
                            <p> Não possui uma conta?
                                <a href='/register-user'> Cadastre-se </a>
                            </p>
                        </Modal.Header>

                        <Modal.Body className='h-modal-body'>
                            <Modal.Title className='h-modal-body-title'> Login </Modal.Title>
                            <Form>
                                <Form.Group controlId='formBasicEmail'>
                                    <InputGroup>
                                        <Form.Control
                                            placeholder='Email'
                                            aria-label='Email'
                                            aria-describedby='basic-addon2'
                                            name='email'
                                            value={email}
                                            onChange={this.handleChange}
                                        />
                                        <InputGroup.Append>
                                            <InputGroup.Text id='basic-addon2'> @unifei.edu.br </InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                    <div className='h-error-msg'> {this.state.emailError} </div>
                                </Form.Group>

                                <Form.Group controlId='formBasicPassword'>
                                    <Form.Control
                                        type='password'
                                        placeholder='Senha'
                                        name='password'
                                        value={password}
                                        onChange={this.handleChange}
                                    />
                                    <div className='h-error-msg'> {this.state.passwordError} </div>
                                    
                                    <Form.Text>
                                        <a href='/password-recover'> Esqueceu sua senha? </a>
                                    </Form.Text>
                                </Form.Group>

                                <div className='h-modal-body-login-button-div'>
                                    <Button
                                        variant='primary'
                                        type='submit'
                                        onClick={this.onSubmit}
                                        href='/main'
                                    > ENTRAR 
                                    </Button>
                                </div>
                            </Form>
                        </Modal.Body>

                        <Modal.Footer className='h-modal-footer'>
                            <Button
                                variant='outline-primary'
                                type='button'
                                href='/register-user'
                            > CADASTRE-SE 
                            </Button>
                        </Modal.Footer>
                        
                    </Modal.Dialog>

                </Container>
            </React.Fragment>
        );
    }
}

export default Home;