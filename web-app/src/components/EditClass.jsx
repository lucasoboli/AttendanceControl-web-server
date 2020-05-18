import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
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
        const {
            subjectCode,
            subjectName,
            classCode,
            timeCode,
            time2Code
        } = this.state;

        const data = {
            code_subject: subjectCode,
            name: subjectName,
            code_class: classCode,
            code_time: timeCode + '_' + time2Code
        };

        axios.put('http://localhost:3333/subject/4', data)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });
    }

    showModal = () => {
        this.setState({ show: true });
    }

    hideModal = () => {
        this.setState({ show: false });
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
                <br></br><br></br><br></br><br></br>

                <Button variant='warning' onClick={this.showModal}> testar </Button>
                <Button variant='outline-warning' href='/main'> voltar </Button>

                <Modal
                    size='lg'
                    show={this.state.show}
                    onHide={this.hideModal}
                    handleClose={this.hideModal}
                >

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
                                <Button
                                    variant='outline-secondary'
                                    type='reset'
                                    onClick={this.hideModal}
                                > CANCELAR 
                                </Button>
                        </div>
                    </Modal.Footer>

                </Modal>
            </Container>
        );
    }
}

export default EditClass;