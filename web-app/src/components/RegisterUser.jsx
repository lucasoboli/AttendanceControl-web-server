import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import './RegisterUser.css';


const initialErrorState = {
    emailError: "",
    userNameError: "",
    passwordError: "",
    password2Error: ""
};


class RegisterUser extends React.Component {

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
            email: email,
            password: password
        };

        axios.post('http://localhost:3333/professor/', data)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });

        const isValid = this.validate();
        if (isValid) {
            // Limpando erros do Form
            this.setState(initialErrorState);
            //Limpando o Form
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

        if (this.state.email.includes('@')) {
            emailError = '* É obrigatório ter um email @unifei.edu';
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

            <Container>
                <br></br>

                <Modal.Dialog className='ru-modal-dialog'>

                    <Modal.Header>
                        <Modal.Title> Cadastro de Novo Usuário </Modal.Title>
                    </Modal.Header>

                    <Modal.Body className='ru-modal-body'>
                        <Form>
                            <Form.Group>
                                <Form.Label htmlFor='email'> Email Institucional </Form.Label>
                                <InputGroup>
                                    <FormControl
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
                                <FormControl
                                    required
                                    placeholder='Nome'
                                    aria-label='Nome'
                                    name='userName'
                                    value={userName}
                                    onChange={this.handleChange}
                                />
                                <FormControl
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
                            > VOLTAR 
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal.Dialog>

            </Container>

        )
    }
}

export default RegisterUser;