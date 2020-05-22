import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

import './Main.css';
import './RegisterClass.css';
import './EditClass.css';

import qrimage from '../images/qr-test.png'; // Remover depois


const initialRegisterErrorState = {
    subjectCodeRegisterError: "",
    subjectNameRegisterError: "",
    classCodeRegisterError: "",
    timeCodeRegisterError: "",
    studentsFileRegisterError: ""
};


class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            subjects: [],

            subjectCodeRegister: "",
            subjectNameRegister: "",
            classCodeRegister: "",
            timeCodeRegister: "",
            time2CodeRegister: "",
            studentsFileRegister: "",
            subjectCodeRegisterError: "",
            subjectNameRegisterError: "",
            classCodeRegisterError: "",
            timeCodeRegisterError: "",
            studentsFileRegisterError: "",

            subjectIdEdit: "",
            subjectCodeEdit: "",
            subjectNameEdit: "",
            classCodeEdit: "",
            timeCodeEdit: "",
            time2CodeEdit: "",

            codeSubjectQR: "",
            codeClassQR: ""
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmitRegister = event => {
        event.preventDefault();

        const {
            subjectCodeRegister,
            subjectNameRegister,
            classCodeRegister,
            timeCodeRegister,
            time2CodeRegister,
            studentsFileRegister
        } = this.state;

        const data = {
            code_subject: subjectCodeRegister,
            name: subjectNameRegister,
            code_class: classCodeRegister,
            code_time: timeCodeRegister + ' ' + time2CodeRegister
        };

        axios.post('http://localhost:3333/professor/3/subject/', data)
            .then((res) => {
                this.setState({showRegister: false})
                document.location.reload()
            }).catch((error) => {
                console.log(error)
            });

        const isValid = this.validate();
        if (isValid) {
            // Limpando erros do Form
            this.setState(initialRegisterErrorState);
        }

    }

    validate = () => {
        let subjectCodeRegisterError = '';
        let subjectNameRegisterError = '';
        let classCodeRegisterError = '';
        let timeCodeRegisterError = '';
        let studentsFileRegisterError = '';

        if (this.state.subjectCodeRegister.length === 0) {
            subjectCodeRegisterError = '* O campo "Código" é obrigatório';
        }

        if (this.state.subjectNameRegister.length === 0) {
            subjectNameRegisterError = '* O campo "Nome da Disciplina" é obrigatório';
        }

        if (this.state.classCodeRegister.length === 0) {
            classCodeRegisterError = '* O campo "Turma" é obrigatório';
        }

        if (this.state.timeCodeRegister.length === 0) {
            timeCodeRegisterError = '* O campo "Horário" é obrigatório';
        }

        else if (this.state.timeCodeRegister.length < 4) {
            timeCodeRegisterError = '* Verifique o código do horário digitado';
        }

        // if (this.state.studentsFileRegister.length === 0) {
        //     studentsFileRegisterError = '* É obrigatório selecionar um arquivo .pdf';
        // }

        // else if (!this.state.studentsFileRegister.includes('.pdf')) {
        //    studentsFileRegisterError = '* A extensão do arquivo deve ser .pdf (Gerado no SIGAA)';
        // }

        if (subjectCodeRegisterError || subjectNameRegisterError || classCodeRegisterError ||
            timeCodeRegisterError || studentsFileRegisterError) {
                this.setState({ subjectCodeRegisterError, subjectNameRegisterError, classCodeRegisterError,
                    timeCodeRegisterError, studentsFileRegisterError});
            
            return false;
        }

        return true;
    }

    onSubmitEdit = event => {
        event.preventDefault();
        const {
            subjectIdEdit,
            subjectCodeEdit,
            subjectNameEdit,
            classCodeEdit,
            timeCodeEdit,
            time2CodeEdit
        } = this.state;

        const data = {
            code_subject: subjectCodeEdit,
            name: subjectNameEdit,
            code_class: classCodeEdit,
            code_time: timeCodeEdit + ' ' + time2CodeEdit
        };

        axios.put(`http://localhost:3333/subject/${subjectIdEdit}`, data)
            .then((res) => {
                this.setState({ showEdit: false, subjectIdEdit: "" })
                document.location.reload()
                // ToDo: Se quiser colocar uma mesagem de sucesso aqui também [Lucas]
            }).catch((error) => {
                // ToDo: Criar mensagem de erro p/ register e p/ edit [Lucas]
            });
    }

    showRegisterModal = () => {
        this.setState({ showRegister: true });
    }

    hideRegisterModal = () => {
        this.setState({ showRegister: false });
    }

    showEditModal = (subjectId) => {
        this.setState({ showEdit: true, subjectIdEdit: subjectId});

        axios.get(`http://localhost:3333/subject/${subjectId}`)
            .then((res) => {
                this.setState({
                    subjectCodeEdit: res.data.code_subject,
                    subjectNameEdit: res.data.name,
                    classCodeEdit: res.data.code_class,
                    timeCodeEdit: res.data.code_time.split(' ')[0],
                    time2CodeEdit: res.data.code_time.split(' ')[1]
                })
            }).catch((error) => {
                console.log(error)
            });
    }

    hideEditModal = () => {
        this.setState({ showEdit: false, subjectIdEdit: "" });
    }

    showQRModal = (codeSubjectQR, codeClassQR) => {
        this.setState({ showQR: true, codeSubjectQR: codeSubjectQR, codeClassQR: codeClassQR });
    }

    hideQRModal = () => {
        this.setState({ showQR: false, codeSubjectQR: "", codeClassQR: "" });
    }

    removeClass = event => {
        event.preventDefault();

        // Criar interface para remover uma turma
        // Back-end
    }

    componentDidMount = () => {
        axios.get('http://localhost:3333/subject')
            .then((res) => {
                console.log(res.data)
                this.setState({ subjects: res.data })
            }).catch((error) => {
                console.log(error)
            });
    }

    render() {
        
        const {
            subjects,

            subjectCodeRegister,
            subjectNameRegister,
            classCodeRegister,
            timeCodeRegister,
            time2CodeRegister,
            studentsFileRegister,

            subjectCodeEdit,
            subjectNameEdit,
            classCodeEdit,
            timeCodeEdit,
            time2CodeEdit
        } = this.state;

        return (

            <React.Fragment>
                <Container className='m-primary-container'>
                    <br /><br /><br /><br /><br />

                    <Container className='m-secondary-container'>

                        <div className='m-buttons-div'>
                            <div className='m-button-register'>
                                <Button
                                    variant='outline-primary'
                                    type='button'
                                    onClick={this.showRegisterModal}
                                    href='#'
                                > + Cadastrar Nova Turma 
                                </Button>
                            </div>

                            <div className='m-button-remove'>
                                <Button
                                    variant='outline-danger'
                                    type='button'
                                    onClick
                                > - Remover Turma 
                                </Button>
                            </div>
                        </div>

                        <Table striped bordered borderless hover>
                            <thead className='m-table-row-names'>
                                <tr>
                                    <th className='m-table-col-edit'>Editar </th>
                                    <th className='m-table-col-subCod'> Código </th>
                                    <th className='m-table-col-class'> Turma </th>
                                    <th className='m-table-col-name'> Nome </th>
                                    <th className='m-table-col-schedule'> Horário </th>
                                    <th className='m-table-col-QR'> QR Code </th>
                                </tr>
                            </thead>
                            <tbody>
                                {subjects.map( this.buildTable = (subject) => {
                                    return <tr>
                                        <td>
                                            <button
                                                className='m-edit-button'
                                                type='button'
                                                onClick={() => this.showEditModal(subject.id)}
                                            >
                                                <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.502 1.94a.5.5 0 010 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 01.707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 00-.121.196l-.805 2.414a.25.25 0 00.316.316l2.414-.805a.5.5 0 00.196-.12l6.813-6.814z" />
                                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-6a.5.5 0 00-1 0v6a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5H9a.5.5 0 000-1H2.5A1.5 1.5 0 001 2.5v11z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </td>
                                        <td> {subject.code_subject} </td>
                                        <td> {subject.code_class} </td>
                                        <td> {subject.name} </td>
                                        <td> {subject.code_time} </td>
                                        <td>
                                            <Button
                                                variant='success'
                                                type='buton'
                                                onClick={() => this.showQRModal(subject.code_subject, subject.code_class)}
                                            > GERAR 
                                            </Button>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </Table>
                    </Container>

                    <div label='bottom-space' className='m-bottom-space-div'> </div>
                </Container>


                <Modal
                    id='register-class-modal'
                    size='lg'
                    show={this.state.showRegister}
                    onHide={this.hideRegisterModal}
                    handleClose={this.hideRegisterModal}
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
                                        name='subjectCodeRegister'
                                        value={subjectCodeRegister}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className='rc-form-subject-name'>
                                    <Form.Label htmlFor='subject-name'> Nome da Disciplina </Form.Label>
                                    <Form.Control
                                        required
                                        placeholder='Ex: Introdução à Engenharia de Computação'
                                        aria-label='Nome'
                                        name='subjectNameRegister'
                                        value={subjectNameRegister}
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
                                        name='classCodeRegister'
                                        value={classCodeRegister}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className='rc-form-time-code'>
                                    <Form.Label htmlFor='time-code'> Horário </Form.Label>
                                    <Form.Control
                                        required
                                        placeholder='Ex: 2M123'
                                        aria-label='Cod-Horario'
                                        name='timeCodeRegister'
                                        value={timeCodeRegister}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className='rc-form-time2-code'>
                                    <Form.Label htmlFor='2-time-code'> 2º Horário </Form.Label>
                                    <Form.Control
                                        placeholder='Ex: 6T12'
                                        aria-label='Cod-Horario-2'
                                        name='time2CodeRegister'
                                        value={time2CodeRegister}
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
                                        label='.pdf'
                                        name='studentsFileRegister'
                                        value={studentsFileRegister}
                                        onChange={this.handleChange}
                                    >
                                    </Form.File>
                                </div>
                            </Form.Group>

                            <div className='rc-button-position'>
                                <Button
                                    variant='primary'
                                    type='submit'
                                    onClick={this.onSubmitRegister}
                                > CADASTRAR 
                                </Button>
                            </div>
                        </Form>
                    </Modal.Body>

                    <div className='rc-error-msg'>
                        <div> {this.state.subjectCodeRegisterError} </div>
                        <div> {this.state.subjectNameRegisterError} </div>
                        <div> {this.state.classCodeRegisterError} </div>                    
                        <div> {this.state.timeCodeRegisterError} </div>
                        <div> {this.state.studentsFileRegisterError} </div>
                    </div>

                    <Modal.Footer>
                        <Button
                            variant='outline-secondary'
                            type='reset'
                            onClick={this.hideRegisterModal}
                        > CANCELAR 
                        </Button>
                    </Modal.Footer>
                </Modal>


                <Modal
                    id='edit-class-modal'
                    size='lg'
                    show={this.state.showEdit}
                    onHide={this.hideEditModal}
                    handleClose={this.hideEditModal}
                >

                    <Modal.Header closeButton>
                        <Modal.Title id='contained-modal-title-vcenter'>
                            Edição de Turma
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
                                        name='subjectCodeEdit'
                                        value={subjectCodeEdit}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className='ec-form-subject-name'>
                                    <Form.Label htmlFor='subject-name'> Nome da Disciplina </Form.Label>
                                    <Form.Control
                                        placeholder='Ex: Introdução à Engenharia de Computação'
                                        aria-label='Nome'
                                        name='subjectNameEdit'
                                        value={subjectNameEdit}
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
                                        name='classCodeEdit'
                                        value={classCodeEdit}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className='ec-form-time-code'>
                                    <Form.Label htmlFor='time-code'> Horário </Form.Label>
                                    <Form.Control
                                        placeholder='Ex: 2M123'
                                        aria-label='Cod-Horario'
                                        name='timeCodeEdit'
                                        value={timeCodeEdit}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className='ec-form-time2-code'>
                                    <Form.Label htmlFor='2-time-code'> 2º Horário </Form.Label>
                                    <Form.Control
                                        placeholder='Ex: 6T12'
                                        aria-label='Cod-Horario-2'
                                        name='time2CodeEdit'
                                        value={time2CodeEdit}
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
                            onClick={this.onSubmitEdit}
                        > SALVAR ALTERAÇÕES 
                        </Button>
                    </div>

                    <Modal.Footer>
                        <Button
                            variant='outline-secondary'
                            type='reset'
                            onClick={this.hideEditModal}
                        > CANCELAR 
                        </Button>
                    </Modal.Footer>
                </Modal>


                <Modal
                    id='qr-code-modal'
                    size='xl'
                    show={this.state.showQR}
                    onHide={this.hideQRModal}
                    handleClose={this.hideQRModal}
                >
                
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.codeSubjectQR + ' - ' + this.state.codeClassQR}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <img src={qrimage} alt="/" style={{maxWidth:'50%', minWidth:'50%', marginLeft:'25%'}}></img>
                </Modal.Body>

                <Modal.Footer style={{textAlign:'center'}}>
                    <Button
                        variant='outline-success'
                        type='button'
                        onClick={this.hideQRModal}
                    > FINALIZAR
                    </Button>
                </Modal.Footer>
            </Modal>
                
            </React.Fragment>
        );
    }
}

export default Main;