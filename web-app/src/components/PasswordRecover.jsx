import React from 'react';
//import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import '../style/PasswordRecover.css';


class PasswordRecover extends React.Component {
    render() {
        return (

            <React.Fragment>
                <Container>
                    <br></br>

                    <Modal.Dialog className='pr-modal-dialog'>

                        <Modal.Header>
                            <Modal.Title> Recuperação de Senha </Modal.Title>

                            <button
                                className='pr-modal-header-goback-button'
                                type='button'
                                data-toggle='tooltip'
                                data-placement='bottom'
                                title='Cancelar e voltar para a página inicial'
                            >
                                <a href='/home' style={{ color: 'inherit' }}>
                                    <svg className="bi bi-box-arrow-left" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M4.354 11.354a.5.5 0 000-.708L1.707 8l2.647-2.646a.5.5 0 10-.708-.708l-3 3a.5.5 0 000 .708l3 3a.5.5 0 00.708 0z" clipRule="evenodd" />
                                        <path fillRule="evenodd" d="M11.5 8a.5.5 0 00-.5-.5H2a.5.5 0 000 1h9a.5.5 0 00.5-.5z" clipRule="evenodd" />
                                        <path fillRule="evenodd" d="M14 13.5a1.5 1.5 0 001.5-1.5V4A1.5 1.5 0 0014 2.5H7A1.5 1.5 0 005.5 4v1.5a.5.5 0 001 0V4a.5.5 0 01.5-.5h7a.5.5 0 01.5.5v8a.5.5 0 01-.5.5H7a.5.5 0 01-.5-.5v-1.5a.5.5 0 00-1 0V12A1.5 1.5 0 007 13.5h7z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </button>
                        </Modal.Header>

                        <Modal.Body className='pr-modal-body'>
                            <Form>
                                <p> Caso você possua um cadastro na plataforma,
                                    um email com um link para reset de senha será enviado
                                    para o seu email cadastrado.
                                </p>
                                <p> Digite seu email cadastrado: </p>

                                <InputGroup className='pr-recover-password-input-group'>
                                    <Form.Control
                                        required
                                        type='text'
                                        placeholder='Email'
                                        onChange={this.handleChange}
                                    />
                                    {/* ToDo: atributos name e value + 
                                                        configuração de variáveis + 
                                                        validação do form + 
                                                        setar parâmetro onClick do botão 'Enviar' +
                                                        função onSubmit */}

                                    <InputGroup.Append>
                                        <InputGroup.Text id='basic-addon2'> @unifei.edu.br </InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>

                                <div className='pr-recover-password-button-position'>
                                    <Button
                                        variant='primary'
                                        type='submit'
                                        onClick
                                    > ENVIAR
                                    </Button>
                                </div>
                            </Form>

                        </Modal.Body>

                        <Modal.Footer>
                            <Button
                                variant='outline-secondary'
                                type='reset'
                                href='/home'
                            > CANCELAR
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>

                </Container>
            </React.Fragment>
        );
    }
}

export default PasswordRecover;