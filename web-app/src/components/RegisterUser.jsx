import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';

import CustomNavbar from './CustomNavbar';
import '../style/RegisterUser.css';


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
            password2Error: ""
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    onSubmit = event => { // ToDo: Só enviar as infos do formulário se ele for válido
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
                // Aparacer um modal de "Cadastrado com sucesso"
            }).catch((error) => {
                console.log(error)
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
            password2
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

            </React.Fragment>
        )
    }
}

export default RegisterUser;