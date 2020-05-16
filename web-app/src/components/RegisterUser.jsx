import React from 'react';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Link from 'react-router-dom/Link';
import './RegisterUser.css';


class RegisterUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            userName: "",
            userSurname: "",
            password: ""
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    onSubmit = event => {
        event.preventDefault();
        alert('ok');

        // Back End
    }


    render() {

        const {
            email,
            userName,
            userSurname,
            password
        } = this.state;

        return (

            <Container>
                <br></br>

                <Modal.Dialog>

                    <Modal.Header>
                        <Modal.Title> Cadastro de Novo Usuário </Modal.Title>
                    </Modal.Header>

                    <Modal.Body className='ru-modal-body'>
                        <Form>
                            <Form.Group controlId='formBasicEmail'>
                                <Form.Label htmlFor='email'> Email Institucional </Form.Label>
                                <InputGroup>
                                    <FormControl
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
                            </Form.Group>


                            <Form.Label htmlFor='name'> Nome Completo </Form.Label>
                            <InputGroup className='mb-3'>
                                <FormControl
                                    placeholder='Nome'
                                    aria-label='Nome'
                                    name='userName'
                                    value={userName}
                                    onChange={this.handleChange}
                                />
                                <FormControl
                                    placeholder='Sobrenome'
                                    aria-label='Sobrenome'
                                    name='userSurname'
                                    value={userSurname}
                                    onChange={this.handleChange}
                                />
                            </InputGroup>

                            <Form.Group controlId='formBasicPassword'>
                                <Form.Label htmlFor='password'> Digite uma Senha </Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Senha'
                                    aria-label='Senha'
                                    name='password'
                                    value={password}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>

                            <Form.Group controlID='formBasicPassword'>
                                <Form.Label> Repita a Senha </Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Senha'
                                    aria-label='Senha-Repetida'
                                    onChange={this.handleChange}
                                />
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
                            <Link to='/home'>
                                <Button
                                    variant='outline-secondary'
                                    type='reset'
                                > VOLTAR 
                                </Button>
                            </Link>
                        </div>
                    </Modal.Footer>
                </Modal.Dialog>

            </Container>

        )
    }
}

export default RegisterUser;