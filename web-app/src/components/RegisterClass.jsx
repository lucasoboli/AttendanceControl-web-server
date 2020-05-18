import React from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import './RegisterClass.css';


const initialErrorState = {
    subjectCodeError: "",
    subjectNameError: "",
    classCodeError: "",
    timeCodeError: "",
    studentsFileError: ""
};


class RegisterClass extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            subjectCode: "",
            subjectName: "",
            classCode: "",
            timeCode: "",
            time2Code: "",
            studentsFile: "",
            subjectCodeError: "",
            subjectNameError: "",
            classCodeError: "",
            timeCodeError: "",
            studentsFileError: ""
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit = event => { // ToDo: Só enviar as infos do formulário se ele for válido
        event.preventDefault();

        const {
            subjectCode,
            subjectName,
            classCode,
            timeCode,
            time2Code,
            studentsFile
        } = this.state;

        const data = {
            code_subject: subjectCode,
            name: subjectName,
            code_class: classCode,
            code_time: timeCode + '_' + time2Code
        };

        axios.post('http://localhost:3333/professor/3/subject/', data)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });

        const isValid = this.validate();
        if (isValid) {
            // Limpando erros do Form
            this.setState(initialErrorState);
        }
    }

    validate = () => {
        let subjectCodeError = '';
        let subjectNameError = '';
        let classCodeError = '';
        let timeCodeError = '';
        let studentsFileError = '';

        if (this.state.subjectCode.length === 0) {
            subjectCodeError = '* O campo "Código" é obrigatório';
        }

        if (this.state.subjectName.length === 0) {
            subjectNameError = '* O campo "Nome da Disciplina" é obrigatório';
        }

        if (this.state.classCode.length === 0) {
            classCodeError = '* O campo "Turma" é obrigatório';
        }

        if (this.state.timeCode.length === 0) {
            timeCodeError = '* O campo "Horário" é obrigatório';
        }

        else if (this.state.timeCode.length < 4) {
            timeCodeError = '* Verifique o código do horário digitado';
        }

        if (this.state.studentsFile.length === 0) {
            studentsFileError = '* É obrigatório selecionar um arquivo .extension'; // ToDo: mudar .extension
        }

        else if (!this.state.studentsFile.includes('.extension')) { // ToDo: mudar .extension's
           studentsFileError = '* A extensão do arquivo deve ser .extension';
        }

        if (subjectCodeError || subjectNameError || classCodeError ||
            timeCodeError || studentsFileError) {
                this.setState({ subjectCodeError, subjectNameError, classCodeError,
                    timeCodeError, studentsFileError});
            
            return false;
        }

        return true;
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
            time2Code,
            studentsFile
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
                            Cadastro de Nova Turma
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <div className='rc-form-subject-code'>
                                    <Form.Label htmlFor='subject-code'> Código </Form.Label>
                                    <Form.Control
                                        required
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
                                        required
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
                                        required
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
                                        required
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
                                        custom
                                        required
                                        label='.extension (é .pdf?)'
                                        name='studentsFile'
                                        value={studentsFile}
                                        onChange={this.handleChange}
                                    >
                                    </Form.File>
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

                    <div className='rc-error-msg'>
                        <div> {this.state.subjectCodeError} </div>
                        <div> {this.state.subjectNameError} </div>
                        <div> {this.state.classCodeError} </div>                    
                        <div> {this.state.timeCodeError} </div>
                        <div> {this.state.studentsFileError} </div>
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

export default RegisterClass;