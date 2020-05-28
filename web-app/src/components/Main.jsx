import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import '../style/Main.css';
import '../style/RegisterClass.css';
import '../style/EditClass.css';

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

            // Para campos de Registro
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

            // Para campos de Edição
            subjectIdEdit: "",
            subjectCodeEdit: "",
            subjectNameEdit: "",
            classCodeEdit: "",
            timeCodeEdit: "",
            time2CodeEdit: "",

            // Para campos do modal QRCode
            codeSubjectQR: "",
            codeClassQR: "",
            imgQR: "",

            // Para campo de Excluir [Turma/Disciplina]
            passwordDelete: "",
            idSubjectDelete: ""
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

    onSubmitDelete = event => { // ToDo: apenas validar a exclusão com a verificação da senha
        event.preventDefault();
        
        axios.delete(`http://localhost:3333/subject/${this.state.idSubjectDelete}`)
        .then((res) => {
            this.setState({ idSubjectDelete: "" })
            document.location.reload()
        }).catch((error) => {
            console.log(error)
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
        this.setState({ showEdit: false, subjectIdEdit: '' });
    }

    showQRModal = (codeSubjectQR, codeClassQR) => {

        this.setState({ showQR: true, codeSubjectQR: codeSubjectQR, codeClassQR: codeClassQR });

        const dataQR = { acronyms: codeSubjectQR, class: codeClassQR }

        setInterval(async () => {
            axios.post(`http://localhost:3333/qrcode`, dataQR)
            .then((res) => {
                this.setState({ imgQR: res.data.data })
            }).catch((error) => {
                console.log(error)
            });
        }, 15000);

    }

    hideQRModal = () => {
        this.setState({ showQR: false, codeSubjectQR: '', codeClassQR: '' });
    }

    showDeleteModal = (idDelete) => {
        this.setState({ showDelete: true, idSubjectDelete: idDelete});
    }

    hideDeleteModal = () => {
        this.setState({ showDelete: false, codeSubjectDelete: '', codeClassDelete: '' });
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
            time2CodeEdit,

            imgQR,
            passwordDelete
        } = this.state;

        return (

            <React.Fragment>
                <Container className='m-primary-container'>

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
                        </div>

                        <Table striped bordered borderless hover>
                            <thead className='m-table-row-names'>
                                <tr>
                                    <th className='m-table-col-action'> Ações </th>
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

                                        <td className='m-table-action'>
                                            <button
                                                className='m-table-edit-button'
                                                type='button'
                                                onClick={() => this.showEditModal(subject.id)}
                                            >
                                                <svg className="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>
                                                    <path fillRule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>
                                                </svg>
                                            </button>
                                            
                                            <button
                                                className='m-table-delete-button'
                                                type='button'
                                                onClick={() => this.showDeleteModal(subject.id)}
                                            >
                                                <svg className="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
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
                    backdrop='static'
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
                    backdrop='static'
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
                    backdrop='static'
                    show={this.state.showQR}
                    onHide={this.hideQRModal}
                    handleClose={this.hideQRModal}
                >
                
                    <Modal.Header closeButton>
                        <Modal.Title> {this.state.codeSubjectQR + ' - ' + this.state.codeClassQR} </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <img src={imgQR} id="messages" width="300px" style={{maxWidth:'50%', minWidth:'50%', marginLeft:'25%'}}></img>
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


                <Modal
                    id='delete-class-modal'
                    size='sm'
                    show={this.state.showDelete}
                    onHide={this.hideDeleteModal}
                    handleClose={this.hideDeleteModal}
                >
                    <Modal.Header closeButton>
                        <Modal.Title style={{color:'crimson'}}> Atenção </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <p>
                                Digite sua senha para confirmar a exclusão da disciplina
                                <strong>
                                {' ' + this.state.codeSubjectDelete + ' - ' + this.state.codeClassDelete}
                                </strong>
                            </p>

                            <Form.Group>
                                <Form.Control
                                    required
                                    type='password'
                                    placeholder='Senha'
                                    name='passwordDelete'
                                    value={passwordDelete}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            variant='outline-secondary'
                            type='reset'
                            onClick={this.hideDeleteModal}
                        > CANCELAR
                        </Button>

                        <Button
                            variant='danger'
                            type='submit'
                            onClick={this.onSubmitDelete}
                        > EXCLUIR
                        </Button>
                    </Modal.Footer>
                </Modal>

            </React.Fragment>
        );
    }
}

export default Main;