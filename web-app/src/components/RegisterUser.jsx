import React from 'react';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Link from 'react-router-dom/Link';
import './RegisterUser.css';


export default class RegisterUser extends React.Component {

    submitHandler() {
        alert('aaaaaalerta');
        const [show, setShow] = React.useState(true);

        if (show) {
            return (
                <Alert variant='danger' onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>
                        TÁ CADASTRADO.
              </p>
                </Alert>
            );
        }

        return <Button onClick={() => setShow(true)}>Show Alert</Button>;
    }

    render() {
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
                                        id='email'
                                        placeholder='Email'
                                        aria-label='Email'
                                    />
                                    <InputGroup.Append>
                                        <InputGroup.Text id='basic-addon2'>@unifei.edu.br</InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Form.Group>


                            <Form.Label htmlFor='name'> Nome Completo </Form.Label>
                            <InputGroup className='mb-3'>
                                <FormControl
                                    id='name'
                                    placeholder='Nome'
                                    aria-label='Nome'
                                />
                                <FormControl
                                    id='surname'
                                    placeholder='Sobrenome'
                                    aria-label='Sobrenome'
                                />
                            </InputGroup>

                            <Form.Group controlId='formBasicPassword'>
                                <Form.Label htmlFor='password'> Digite uma Senha </Form.Label>
                                <Form.Control
                                    id='password'
                                    type='password'
                                    placeholder='Senha'
                                    aria-label='Senha'
                                />
                            </Form.Group>

                            <Form.Group controlID='formBasicPassword'>
                                <Form.Label> Repita a Senha </Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Senha'
                                    aria-label='Senha-Repetida'
                                />
                            </Form.Group>

                            <div className='ru-register-button-position'>
                                <Button variant='primary' type='submit'
                                    onClick={this.submitHandler}>
                                    CADASTRAR
                                </Button>
                            </div>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <div>
                            <Link to='/home'>
                                <Button variant='outline-secondary'> VOLTAR </Button>
                            </Link>
                        </div>
                    </Modal.Footer>
                </Modal.Dialog>

            </Container>

        )
    }
}