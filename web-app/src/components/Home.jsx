import React from 'react';
import axios from 'axios';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import './Home.css';


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
            email: this.state.email,
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
                
                <Container>
                    <Jumbotron>
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
                                </Form.Group>

                                <div style={{textAlign:'center'}}>
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

                        <Modal.Footer style={{justifyContent:'center'}}>
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
        )
    }
}

export default Home;