import React from 'react';
import Link from 'react-router-dom/Link';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import './RegisterClass.css';


{/*https://www.youtube.com/watch?v=10FNqoPpNbE*/}



function infoHandler() {
    alert('Isso vai ser o Modal que abre na página anterior');
}

export default class RegisterClass extends React.Component {
    render() {
        return (

            <Container>
                <p> FORMS TO REGISTER A NEW CLASS (must have active login token)</p>

                <Link to='#'>
                    <Button variant='info' onClick={infoHandler}> SHOW INFO </Button>
                </Link>

                <Modal.Dialog size='lg' id='modalId'>

                    <Modal.Header closeButton>
                        <Modal.Title id='contained-modal-title-vcenter'>
                            Cadastro de Nova Turma
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <div className='rc-form-subject-code'>
                                    <Form.Label htmlFor='subject-code'> Código </Form.Label>
                                    <Form.Control
                                        id='subject-code'
                                        placeholder='Ex: ECO101'
                                        aria-label='Cod-Disciplina'
                                    />
                                </div>
                                <div className='rc-form-subject-name'>
                                    <Form.Label htmlFor='subject-name'> Nome da Disciplina </Form.Label>
                                    <Form.Control
                                        id='subject-name'
                                        placeholder='Ex: Introdução à Engenharia de Computação'
                                        aria-label='Nome'
                                    />
                                </div>
                            </Form.Group>

                            <Form.Group>
                                <div className='rc-form-class-code'>
                                    <Form.Label htmlFor='class-code'> Turma </Form.Label>
                                    <Form.Control
                                        id='class-code'
                                        placeholder='Ex: T01'
                                        aria-label='Cod-Turma'
                                    />
                                </div>
                                <div className='rc-form-time-code'>
                                    <Form.Label htmlFor='time-code'> Horário </Form.Label>
                                    <Form.Control
                                        id='time-code'
                                        placeholder='Ex: 2M123'
                                        aria-label='Cod-Horario'
                                    />
                                </div>
                                <div className='rc-form-time2-code'>
                                    <Form.Label htmlFor='2-time-code'> 2º Horário </Form.Label>
                                    <Form.Control
                                        id='2-time-code'
                                        placeholder='Ex: 6T12'
                                        aria-label='Cod-Horario-2'
                                    />
                                </div>
                                <div className='rc-form-time2-alert'>
                                    Se houver apenas 1 horário semanal para esta disciplina,
                                    deixe o campo [2º Horário] vazio.
                                </div>
                            </Form.Group>

                            <Form.Group>
                                <div className='rc-form-file-input'>
                                    <Form.Label htmlFor='students-file'> Arquivo com Nome e Matrícula dos Alunos </Form.Label>
                                    <Form.File
                                        id='students-file' label='.extension' custom
                                    />
                                </div>
                            </Form.Group>

                            <div className='rc-button-position'>
                                <Button variant='primary' type='submit'>
                                    CADASTRAR
                                </Button>
                            </div>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <div>
                            <Link to='/main'>
                                <Button variant='outline-secondary'> VOLTAR </Button>
                            </Link>
                        </div>
                    </Modal.Footer>
                </Modal.Dialog>

            </Container>
        );
    }
}