import React from 'react';
import Link from 'react-router-dom/Link';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import './RegisterClass.css';


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

                <Modal.Dialog size='lg'>

                    <Modal.Header closeButton>
                        <Modal.Title id='contained-modal-title-vcenter'>
                            Cadastro de Nova Turma
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <div className='rc-form-subject-code'>
                                    <Form.Label> Código </Form.Label>
                                    <Form.Control
                                        placeholder='Ex: ECO101'
                                        aria-label='Cod-Disciplina'
                                    />
                                </div>
                                <div className='rc-form-subject-name'>
                                    <Form.Label> Nome da Disciplina </Form.Label>
                                    <Form.Control
                                        placeholder='Ex: Introdução à Engenharia de Computação'
                                        aria-label='Nome'
                                    />
                                </div>
                            </Form.Group>

                            <Form.Group>
                                <div className='rc-form-class-code'>
                                    <Form.Label> Turma </Form.Label>
                                    <Form.Control
                                        placeholder='Ex: T01'
                                        aria-label='Cod-Turma'
                                    />
                                </div>
                                <div className='rc-form-time-code'>
                                    <Form.Label> Horário </Form.Label>
                                    <Form.Control
                                        placeholder='Ex: 2M123'
                                        aria-label='Cod-Horario'
                                    />
                                </div>
                                <div className='rc-form-time2-code'>
                                    <Form.Label> 2º Horário </Form.Label>
                                    <Form.Control
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
                                    <Form.Label> Arquivo com Nome e Matrícula dos Alunos </Form.Label>
                                    <Form.File
                                        id='studentsFile' label='.extension' custom
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
                </Modal.Dialog>

            </Container>

        )
    }
}