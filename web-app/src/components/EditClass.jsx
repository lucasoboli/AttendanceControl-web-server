import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Link from 'react-router-dom/Link';
import Modal from 'react-bootstrap/Modal';
import './EditClass.css';


class EditClass extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            subjectCode: "",
            subjectName: "",
            classCode: "",
            timeCode: "",
            time2Code: ""
        };
    }

    handleChange = event => {
        this.setState ({
            [event.target.name]: event.target.value
        });
    };

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
            time2Code
        } = this.state;

        return (

            <Container>

                <Modal size='lg' show='false' showModal='false'>

                    <Modal.Header closeButton>
                        <Modal.Title id='contained-modal-title-vcenter'>
                            Editar Turma
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <div className='ec-form-subject-code'>
                                    <Form.Label htmlFor='subject-code'> Código </Form.Label>
                                    <Form.Control
                                        placeholder='Ex: ECO101'
                                        aria-label='Cod-Disciplina'
                                        name='subjectCode'
                                        value={subjectCode}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className='ec-form-subject-name'>
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
                                <div className='ec-form-class-code'>
                                    <Form.Label htmlFor='class-code'> Turma </Form.Label>
                                    <Form.Control
                                        placeholder='Ex: T01'
                                        aria-label='Cod-Turma'
                                        name='classCode'
                                        value={classCode}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className='ec-form-time-code'>
                                    <Form.Label htmlFor='time-code'> Horário </Form.Label>
                                    <Form.Control
                                        placeholder='Ex: 2M123'
                                        aria-label='Cod-Horario'
                                        name='timeCode'
                                        value={timeCode}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className='ec-form-time2-code'>
                                    <Form.Label htmlFor='2-time-code'> 2º Horário </Form.Label>
                                    <Form.Control
                                        placeholder='Ex: 6T12'
                                        aria-label='Cod-Horario-2'
                                        name='time2Code'
                                        value={time2Code}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                    <div className='ec-button-position'>
                                <Button
                                    variant='primary'
                                    type='submit'
                                    onClick={this.onSubmit}
                                > SALVAR ALTERAÇÕES 
                                </Button>
                            </div>

                    <Modal.Footer>
                        <div>
                            <Link to='/main'>
                                <Button
                                    variant='outline-secondary'
                                    type='reset'
                                    onClick={this.onClose}
                                > CANCELAR 
                                </Button>
                            </Link>
                        </div>
                    </Modal.Footer>

                </Modal>
            </Container>
        );
    }
}

export default EditClass;