import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import './RegisterClass.css';


class RegisterClass extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            subjectCode: "",
            subjectName: "",
            classCode: "",
            timeCode: "",
            time2Code: "",
            studentsFile: ""
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit = event => {
        event.preventDefault();
        alert('ok');

        // Back End
    }

    onClose = event => {
        event.preventDefault();

        // Fechar modal
    }


    render() {

        const {
            subjectCode,
            subjectName,
            classCode,
            timeCode,
            time2Code,
            studentsFile
        } = this.state;


        return (

            <Container>

                <Button variant='warning' > testar </Button>

                <Modal size='lg' show='false' showModal='false'>

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
                                        placeholder='Ex: ECO101'
                                        aria-label='Cod-Disciplina'
                                        name='subjectCode'
                                        value={subjectCode}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className='rc-form-subject-name'>
                                    <Form.Label htmlFor='subject-name'> Nome da Disciplina </Form.Label>
                                    <Form.Control
                                        placeholder='Ex: Introdução à Engenharia de Computação'
                                        aria-label='Nome'
                                        name='subjectName'
                                        value={subjectName}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </Form.Group>

                            <Form.Group>
                                <div className='rc-form-class-code'>
                                    <Form.Label htmlFor='class-code'> Turma </Form.Label>
                                    <Form.Control
                                        placeholder='Ex: T01'
                                        aria-label='Cod-Turma'
                                        name='classCode'
                                        value={classCode}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className='rc-form-time-code'>
                                    <Form.Label htmlFor='time-code'> Horário </Form.Label>
                                    <Form.Control
                                        placeholder='Ex: 2M123'
                                        aria-label='Cod-Horario'
                                        name='timeCode'
                                        value={timeCode}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className='rc-form-time2-code'>
                                    <Form.Label htmlFor='2-time-code'> 2º Horário </Form.Label>
                                    <Form.Control
                                        placeholder='Ex: 6T12'
                                        aria-label='Cod-Horario-2'
                                        name='time2Code'
                                        value={time2Code}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className='rc-form-time2-alert'>
                                    Se houver apenas 1 horário semanal para esta disciplina,
                                    deixe o campo "2º Horário" vazio.
                                </div>
                            </Form.Group>

                            <Form.Group>
                                <div className='rc-form-file-input'>
                                    <Form.Label htmlFor='students-file'> Arquivo com Nome e Matrícula dos Alunos </Form.Label>
                                    <Form.File
                                        label='.extension'
                                        custom
                                        name='studentsFile'
                                        value={studentsFile}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </Form.Group>

                            <div className='rc-button-position'>
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
                                onClick={this.onClose}
                            > CANCELAR 
                            </Button>
                        </div>
                    </Modal.Footer>

                </Modal>

            </Container>
        );
    }
}

export default RegisterClass;