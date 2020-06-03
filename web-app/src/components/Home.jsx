import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';

import CustomNavbar from './CustomNavbar';
import '../style/Home.css';
import '../style/Toasters.css';


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
            passwordError: "",

            // Para exibição de notificações
            successToast: false,
            successToastMsg: "",
            errorToast: false,
            errorToastMsg: ""
        };
    }


    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    toggleSuccessToast = (msg) => {
        const {successToast, successToastMsg} = this.state;

        this.setState({ successToast: !successToast, successToastMsg: msg });
    }

    toggleErrorToast = (msg) => {
        const {errorToast, errorToastMsg} = this.state;

        this.setState({ errorToast: !errorToast, errorToastMsg: msg });
    }

    onSubmit = event => {
        event.preventDefault()

        const userObject = {
            email: this.state.email + '@unifei.edu.br',
            password: this.state.password,
        };

        axios.post('http://localhost:3333/login', userObject)
            .then((res) => {
                console.log(res.data); // ToDo: remover esta linha
                
                window.location.href = 'http://localhost:3000/main';

            }).catch((error) => {
                console.log(error);

                if (userObject.password.length === 0) {
                    this.setState ({ passwordError: '* Este campo é obrigatório' });
                } else {
                    this.setState({ passwordError: '* Senha incorreta' });
                    this.toggleErrorToast('Senha incorreta');
                }

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
            password,
            successToast,
            successToastMsg,
            errorToast,
            errorToastMsg
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

                <div className='t-container'>

                    <Toast
                        id='error-toast-home'
                        show={errorToast}
                        onClose={this.toggleErrorToast}
                        animation={true}
                        autohide
                        delay={10000}
                        className='t-toast'
                    >
                        <Toast.Header>
                            <svg class="bi bi-exclamation-circle-fill t-error-text" width="1.3em" height="1.3em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                            </svg>
                            <div style={{width:'2%'}}></div>
                            <strong className='mr-auto t-error-text t-font'> Erro </strong>
                            <small> attendancecontrol </small>
                        </Toast.Header>

                        <Toast.Body className='t-error-text'>
                            <p> {errorToastMsg} </p>
                        </Toast.Body>
                    </Toast>

                    <Toast
                        id='success-toast-home'
                        show={successToast}
                        onClose={this.toggleSuccessToast}
                        animation={true}
                        autohide
                        delay={8000}
                        className='t-toast'
                    >
                        <Toast.Header>
                            <svg class="bi bi-check2-all t-success-text" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M12.354 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                                <path d="M6.25 8.043l-.896-.897a.5.5 0 1 0-.708.708l.897.896.707-.707zm1 2.414l.896.897a.5.5 0 0 0 .708 0l7-7a.5.5 0 0 0-.708-.708L8.5 10.293l-.543-.543-.707.707z"/>
                            </svg>
                            <div style={{width:'2%'}}></div>
                            <strong className='mr-auto t-success-text t-font'> Sucesso </strong>
                            <small> attendancecontrol </small>
                        </Toast.Header>

                        <Toast.Body className='t-success-text'>
                            <p> {successToastMsg} </p>
                        </Toast.Body>
                    </Toast>

                </div>

            </React.Fragment>
        );
    }
}

export default Home;