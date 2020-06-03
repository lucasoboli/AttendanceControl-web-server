import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';

import CustomNavbar from './CustomNavbar';
import '../style/RegisterUser.css';
import '../style/Toasters.css';


const initialErrorState = {
    emailError: "",
    userNameError: "",
    passwordError: "",
    password2Error: ""
};


class RegisterUser extends React.Component { // ToDo: código de verificação p/ email do professor antes de autorizar novo usuário
                                             // ToDo: criar tela para digitar código de verificação
    constructor(props) {
        super(props);
        
        this.state = {
            email: "",
            userName: "",
            userSurname: "",
            password: "",
            password2: "",
            emailError: "",
            userNameError: "",
            passwordError: "",
            password2Error: "",

            // Para exibição de notificações (apenas de sucesso para esta página)
            successToast: false,
            succesToastMsg: ""
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    toggleSuccessToast = (msg) => {
        const {successToast, successToastMsg} = this.state;

        this.setState({ successToast: !successToast, successToastMsg: msg });
    }

    onSubmit = event => {
        event.preventDefault();
        
        const {
            email,
            userName,
            userSurname,
            password
        } = this.state;

        const data = {
            name: userName + ' ' + userSurname,
            email: email + '@unifei.edu.br',
            password: password
        };

        axios.post('http://localhost:3333/professor/', data)
            .then((res) => {
                this.toggleSuccessToast('Cadastro realizado com sucesso!' +
                + 'Um email de confirmação foi enviado para' + email);

                window.location.href = 'http://localhost:3000/home';

            }).catch((error) => {
                console.log(error);
            });

        const isValid = this.validate();
        if (isValid) {
            // Limpando erros do Form
            this.setState(initialErrorState);
            // Limpando o Form
            this.setState({ email: '', userName: '', userSurname: '',
            password: '', password2: '' });
        }
    }

    validate = () => {
        let emailError = '';
        let userNameError = '';
        let passwordError = '';
        let password2Error = '';
        
        if (this.state.email.length === 0) {
            emailError = '* Este campo é obrigatório';
        }

        if (this.state.userName.length === 0 || this.state.userSurname.length === 0) {
            userNameError = '* Estes campos são obrigatórios';
        }

        if (this.state.password.length === 0) {
            passwordError = '* Este campo é obrigatório';
        }

        if (this.state.password2.length === 0) {
            password2Error = '* Este campo é obrigatório';
        }

        else if (this.state.password !== this.state.password2) {
            password2Error = '* A senha digitada não coincide com a anterior';
        }

        if (emailError || userNameError || passwordError || password2Error) {
            this.setState({emailError, userNameError, passwordError, password2Error});
            return false;
        }

        return true;
    }


    render() {

        const {
            email,
            userName,
            userSurname,
            password,
            password2,
            successToast,
            successToastMsg
        } = this.state;

        return (

            <React.Fragment>
                <CustomNavbar pageName='register-user' />

                <Container>
                    <br></br><br></br>

                    <Modal.Dialog className='ru-modal-dialog'>

                        <Modal.Header>
                            <Modal.Title> Cadastro de Novo Usuário </Modal.Title>

                                <button
                                    className='ru-modal-header-goback-button'
                                    type='button'
                                    data-toggle='tooltip'
                                    data-placement='bottom'
                                    title='Cancelar e voltar para a página inicial'
                                >
                                    <a href='/home' style={{color:'inherit'}}>
                                        <svg className="bi bi-box-arrow-left" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M4.354 11.354a.5.5 0 000-.708L1.707 8l2.647-2.646a.5.5 0 10-.708-.708l-3 3a.5.5 0 000 .708l3 3a.5.5 0 00.708 0z" clipRule="evenodd"/>
                                            <path fillRule="evenodd" d="M11.5 8a.5.5 0 00-.5-.5H2a.5.5 0 000 1h9a.5.5 0 00.5-.5z" clipRule="evenodd"/>
                                            <path fillRule="evenodd" d="M14 13.5a1.5 1.5 0 001.5-1.5V4A1.5 1.5 0 0014 2.5H7A1.5 1.5 0 005.5 4v1.5a.5.5 0 001 0V4a.5.5 0 01.5-.5h7a.5.5 0 01.5.5v8a.5.5 0 01-.5.5H7a.5.5 0 01-.5-.5v-1.5a.5.5 0 00-1 0V12A1.5 1.5 0 007 13.5h7z" clipRule="evenodd"/>
                                        </svg>
                                    </a>
                                </button>
                        </Modal.Header>

                        <Modal.Body className='ru-modal-body'>
                            <Form>
                                <Form.Group>
                                    <Form.Label htmlFor='email'> Email Institucional </Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            required
                                            placeholder='Email'
                                            aria-label='Email'
                                            name='email'
                                            value={email}
                                            onChange={this.handleChange}
                                        />
                                        <InputGroup.Append>
                                            <InputGroup.Text id='basic-addon2'>@unifei.edu.br</InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                    <div className='ru-error-msg'> {this.state.emailError} </div>
                                </Form.Group>


                                <Form.Label htmlFor='name'> Nome Completo </Form.Label>
                                <InputGroup className='mb-3'>
                                    <Form.Control
                                        required
                                        placeholder='Nome'
                                        aria-label='Nome'
                                        name='userName'
                                        value={userName}
                                        onChange={this.handleChange}
                                    />
                                    <Form.Control
                                        required
                                        placeholder='Sobrenome'
                                        aria-label='Sobrenome'
                                        name='userSurname'
                                        value={userSurname}
                                        onChange={this.handleChange}
                                    />
                                </InputGroup>
                                <div className='ru-error-msg'> {this.state.userNameError} </div>

                                <Form.Group>
                                    <Form.Label htmlFor='password'> Digite uma Senha </Form.Label>
                                    <Form.Control
                                        required
                                        type='password'
                                        placeholder='Senha'
                                        aria-label='Senha'
                                        name='password'
                                        value={password}
                                        onChange={this.handleChange}
                                    />
                                    <div className='ru-error-msg'> {this.state.passwordError} </div>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label> Repita a Senha </Form.Label>
                                    <Form.Control
                                        required
                                        type='password'
                                        placeholder='Senha'
                                        aria-label='Senha-Repetida'
                                        name='password2'
                                        value={password2}
                                        onChange={this.handleChange}
                                    />
                                    <div className='ru-error-msg'> {this.state.password2Error} </div>
                                </Form.Group>

                                <div className='ru-register-button-position'>
                                    <Button
                                        variant='primary'
                                        type='submit'
                                        onClick={this.onSubmit}
                                    > CADASTRAR 
                                    </Button>
                                </div>
                            </Form>
                        </Modal.Body>

                        <Modal.Footer>
                            <div>
                                <Button
                                    variant='outline-secondary'
                                    type='reset'
                                    href='/home'
                                > CANCELAR
                                </Button>
                            </div>
                        </Modal.Footer>
                    </Modal.Dialog>

                </Container>

                <div className='t-container'>

                    <Toast
                        id='success-toast-register-user'
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
        )
    }
}

export default RegisterUser;