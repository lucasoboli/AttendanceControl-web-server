import React from 'react';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';

import CustomNavbar from './CustomNavbar';
import '../style/RegisterUser.css';
import '../style/Toasters.css';


class EditUser extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // Para campos de Update
            userEmailUpdate: "",
            userNameUpdate: "",
            userSurnameUpdate: "",
            passwordUpdate: "",
            userNameUpdateError: "",
            passwordUpdateError: "",
            
            // Para campos de Renew Password
            actualPasswordRenew: "",
            newPasswordRenew: "",
            newPassword2Renew: "",
            actualPasswordRenewError: "",
            newPasswordRenewError: "",
            newpassword2RenewError: "",

            // Para campo de Delete Account
            passwordDelete: "",
            passwordDeleteError: "",

            // Para exibição de notificações
            successToast: false,
            successToastMsg: "",
            errorToast: false,
            errorToastMsg: ""
        };
    }


    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    toggleSuccessToast = (msg) => {
        const {successToast, successToastMsg} = this.state;

        this.setState({ successToast: !successToast, successToastMsg: msg });
    }

    toggleErrorToast = (msg) => {
        const {errorToast, errorToastMsg} = this.state;

        this.setState({ errorToast: !errorToast, errorToastMsg: msg});
    }

    componentDidMount = () => {
        // Preenche com os dados atuais do professor
        axios.get('http://localhost:3333/professor/6')
            .then((res) => {
                console.log(res.data);

                this.setState({
                    userEmailUpdate: res.data.email,
                    userNameUpdate: res.data.name.split(' ')[0],
                    userSurnameUpdate: res.data.name.split(' ')[1]
                });

            }).catch((error) => {
                console.log(error);
            });
    }

    onSubmitUpdate = event => {
        event.preventDefault();

        const {
            userEmailUpdate,
            userNameUpdate,
            userSurnameUpdate,
            passwordUpdate,
        } = this.state;

        const data = {
            name: userNameUpdate + ' ' + userSurnameUpdate,
            email: userEmailUpdate,
            password: passwordUpdate
        };

        const userObject = {
            email: userEmailUpdate,
            password: passwordUpdate
        };

        // Verifica se a senha digitada está correta
        axios.post('http://localhost:3333/login', userObject)
            .then((res) => {

                // Altera os dados do professor (nome)
                axios.put('http://localhost:3333/professor/6', data)
                    .then((res) => {
                        document.location.reload()
                        this.toggleSuccessToast('Informações alteradas com sucesso');

                    }).catch((error) => {
                        console.log(error);
                    });
                    
            }).catch((error) => {
                if (data.password.length === 0) {
                    this.setState ({ passwordUpdateError: '* Este campo é obrigatório' });
                } else {
                    this.setState({ passwordUpdateError: '* Senha incorreta' });
                    this.toggleErrorToast('Senha incorreta');
                }
            });

        const isValid = this.validateUpdate();
        if (isValid) {
            // Limpando erros do Form
            this.setState({ userNameUpdateError: '', passwordUpdateError: '' });

            // Limpando o Form
            this.setState({ passwordUpdate: '' });
        }
    }

    validateUpdate = () => {
        let userNameUpdateError = '';
        let passwordUpdateError = '';

        if (this.state.userNameUpdate.length === 0 || this.state.userSurnameUpdate.length === 0) {
            userNameUpdateError = '* Estes campos são obrigatórios';
        }

        if (this.state.passwordUpdate.length === 0) {
            passwordUpdateError = '* Este campo é obrigatório';
        }

        if (userNameUpdateError || passwordUpdateError) {
            this.setState({ userNameUpdateError, passwordUpdateError });
            return false;
        }

        return true;
    }

    onSubmitPasswordRenew = event => {
        event.preventDefault();

        const newPassword = { password: this.state.newPasswordRenew }

        const userObject = {
            email: this.state.userEmailUpdate,
            password: this.state.actualPasswordRenew
        };

        // Verifica se a senha atual está correta
        axios.post('http://localhost:3333/login', userObject)
        .then((res) => {

            // Encripta a nova senha digitada
            axios.put('http://localhost:3333/encrypt', newPassword)
                .then((res) => {

                    // Altera a senha
                    axios.put('/professor/6/password', { password: res.data.password })
                    .then((res) => {
                        document.location.reload()
                        this.toggleSuccessToast('Senha alterada com sucesso');

                    }).catch((error) => {
                        console.log(error)
                    });

                }).catch((error) => {
                    console.log(error)
                });

        }).catch((error) => {
            this.toggleErrorToast('Senha incorreta');
        });

        const isValid = this.validatePasswordRenew();
        if (isValid) {
            // Limpando erros do Form
            this.setState({ actualPasswordRenewError: '', newPasswordRenewError: '',
                newPassword2RenewError: '' });
                console.log('it is valid');
            // Limpando o Form
            this.setState({ actualPasswordRenew: '', newPasswordRenew: '',
                newPassword2Renew: ''
            });
        }
    }
    
    validatePasswordRenew = () => {
        let actualPasswordRenewError = '';
        let newPasswordRenewError = '';
        let newPassword2RenewError = '';

        if (this.state.actualPasswordRenew.length === 0) {
            actualPasswordRenewError = '* Este campo é obrigatório';
        }

        if (this.state.newPasswordRenew.length === 0) {
            newPasswordRenewError = '* Este campo é obrigatório';
        }

        if (this.state.newPassword2Renew.length === 0) {
            newPassword2RenewError = '* Este campo é obrigatório';
        }

        else if (this.state.newPasswordRenew !== this.state.newPassword2Renew) {
            newPassword2RenewError = '* A senha digitada não coincide com a anterior';
        }

        if (actualPasswordRenewError || newPasswordRenewError || newPassword2RenewError) {
            this.setState({ actualPasswordRenewError, newPasswordRenewError, newPassword2RenewError });
            return false;
        }

        return true;
    }

    onSubmitDeleteAccount = event => { // ToDo: Conectar c/ Back-end p/ deletar perfil de prof.
        event.preventDefault();

        axios.delete(`http://localhost:3333/professor/7`)
            .then((res) => {
                document.location.reload();
                this.toggleSuccessToast('Sua conta foi deletada');
                // ToDo: redirecionar para /home e extinguir sessão

            }).catch((error) => {
                console.log(error);
                this.toggleErrorToast('Senha incorreta');
            });

        const isValid = this.validateDeleteAccount();
        if (isValid) {
            // Limpando erros do Form
            this.setState({ passwordDeleteError: '' });

            // Limpando o Form
            this.setState({ passwordDelete:'' });
        }
    }

    validateDeleteAccount = () => {
        let passwordDeleteError = '';

        if (this.state.passwordDeleteError.length === 0) {
            passwordDeleteError = '* Este campo é obrigatório';
        }

        if (passwordDeleteError) {
            this.setState ({ passwordDeleteError });
            return false;
        }
        
        return true;
    }

    showDeleteAccountModal = () => {
        this.setState({ showDeleteAccount: true });
    }

    hideDeleteAccountModal = () => {
        this.setState({ showDeleteAccount: false });
    }


    render() {

        const {
            userEmailUpdate,
            userNameUpdate,
            userSurnameUpdate,
            passwordUpdate,
            actualPasswordRenew,
            newPasswordRenew,
            newPassword2Renew,
            passwordDelete,
            successToast,
            successToastMsg,
            errorToast,
            errorToastMsg
        } = this.state;

        return (

            <React.Fragment>
                <CustomNavbar pageName='edit-user' />
                
                <Container>
                    <br></br>

                    <Modal.Dialog className='ru-modal-dialog'>

                        <Modal.Header>
                            <Modal.Title> Edição de Usuário </Modal.Title>
                            
                            <button
                                className='ru-modal-header-goback-button'
                                type='button'
                                data-toggle='tooltip'
                                data-placement='bottom'
                                title='Cancelar e voltar para a página principal'
                            >
                                <a href='/main' style={{color:'inherit'}}>
                                    <svg className="bi bi-box-arrow-left" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M4.354 11.354a.5.5 0 000-.708L1.707 8l2.647-2.646a.5.5 0 10-.708-.708l-3 3a.5.5 0 000 .708l3 3a.5.5 0 00.708 0z" clipRule="evenodd"/>
                                        <path fillRule="evenodd" d="M11.5 8a.5.5 0 00-.5-.5H2a.5.5 0 000 1h9a.5.5 0 00.5-.5z" clipRule="evenodd"/>
                                        <path fillRule="evenodd" d="M14 13.5a1.5 1.5 0 001.5-1.5V4A1.5 1.5 0 0014 2.5H7A1.5 1.5 0 005.5 4v1.5a.5.5 0 001 0V4a.5.5 0 01.5-.5h7a.5.5 0 01.5.5v8a.5.5 0 01-.5.5H7a.5.5 0 01-.5-.5v-1.5a.5.5 0 00-1 0V12A1.5 1.5 0 007 13.5h7z" clipRule="evenodd"/>
                                    </svg>
                                </a>
                            </button>
                        </Modal.Header>

                        <Modal.Body className='ru-modal-body'>
                            <Form>
                                <Form.Group>
                                    <Form.Label> Email Institucional </Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            disabled
                                            contentEditable='false'
                                            placeholder={userEmailUpdate.split('@')[0]}
                                            aria-label='Email'
                                            name='email'
                                        />
                                        <InputGroup.Append>
                                            <InputGroup.Text id='basic-addon2'> @unifei.edu.br </InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Form.Group>


                                <Form.Label htmlFor='name'> Nome Completo </Form.Label>
                                <InputGroup className='mb-3'>
                                    <Form.Control
                                        required
                                        placeholder='Nome'
                                        aria-label='Nome'
                                        name='userNameUpdate'
                                        value={userNameUpdate}
                                        onChange={this.handleChange}
                                    />
                                    <Form.Control
                                        required
                                        placeholder='Sobrenome'
                                        aria-label='Sobrenome'
                                        name='userSurnameUpdate'
                                        value={userSurnameUpdate}
                                        onChange={this.handleChange}
                                    />
                                </InputGroup>
                                <div className='ru-error-msg'> {this.state.userNameUpdateError} </div>

                                <Form.Label> Confirme sua Senha </Form.Label>
                                <InputGroup className='mb-3'>
                                    <Form.Control
                                        required
                                        type='password'
                                        placeholder='Senha'
                                        name='passwordUpdate'
                                        value={passwordUpdate}
                                        onChange={this.handleChange}
                                    />
                                </InputGroup>
                                <div className='ru-error-msg'> {this.state.passwordUpdateError} </div>

                                <div className='ru-save-button-position'>
                                    <Button
                                        variant='primary'
                                        type='submit'
                                        onClick={this.onSubmitUpdate}
                                    > SALVAR ALTERAÇÕES
                                    </Button>
                                </div>
                            </Form>

                            <Accordion className='ru-accordion'>
                                <h5 className='ru-attention-msg'> Zona de Perigo </h5>
                                
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle
                                            as={Button}
                                            variant='link'
                                            eventKey='0'
                                        > Alterar Senha
                                        </Accordion.Toggle>
                                    </Card.Header>

                                    <Accordion.Collapse eventKey='0'>
                                        <Card.Body>
                                            <Form>
                                                <Form.Group>
                                                    <Form.Label> Senha Atual </Form.Label>
                                                    <Form.Control
                                                        required
                                                        type='password'
                                                        placeholder='Senha Atual'
                                                        name='actualPasswordRenew'
                                                        value={actualPasswordRenew}
                                                        onChange={this.handleChange}
                                                    />
                                                    <div className='ru-error-msg'> {this.state.actualPasswordRenewError} </div>
                                                </Form.Group>

                                                <Form.Group>
                                                    <Form.Label> Nova Senha </Form.Label>
                                                    <Form.Control
                                                        required
                                                        type='password'
                                                        placeholder='Nova Senha'
                                                        name='newPasswordRenew'
                                                        value={newPasswordRenew}
                                                        onChange={this.handleChange}
                                                    />
                                                    <div className='ru-error-msg'> {this.state.newPasswordRenewError} </div>
                                                </Form.Group>

                                                <Form.Group>
                                                    <Form.Label> Repita a Nova Senha </Form.Label>
                                                    <Form.Control
                                                        required
                                                        type='password'
                                                        placeholder='Nova Senha'
                                                        name='newPassword2Renew'
                                                        value={newPassword2Renew}
                                                        onChange={this.handleChange}
                                                    />
                                                    <div className='ru-error-msg'> {this.state.newPassword2RenewError} </div>
                                                </Form.Group>

                                                <div className='ru-change-password-button-position'>
                                                    <Button
                                                        variant='warning'
                                                        type='submit'
                                                        onClick={this.onSubmitPasswordRenew}
                                                    > ALTERAR SENHA
                                                    </Button>
                                                </div>
                                            </Form>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>

                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle
                                            as={Button}
                                            variant='link'
                                            eventKey='1'
                                        > Esqueci Minha Senha
                                        </Accordion.Toggle>
                                    </Card.Header>

                                    <Accordion.Collapse eventKey='1'>
                                        <Card.Body>
                                            <Form>
                                                <h5> Recuperação de Senha </h5>
                                                <Form.Text> Caso você esteja logado, tenha esquecido
                                                    sua senha de acesso e deseja resetá-la, utilize
                                                    o campo fornecido abaixo.
                                                </Form.Text>
                                                <Form.Text> Digite seu email de cadastro: </Form.Text>

                                                <InputGroup className='ru-recover-password-input-group'>
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
                                                        
                                                <div className='ru-recover-password-button-position'>
                                                    <Button
                                                        variant='primary'
                                                        type='submit'
                                                        onClick
                                                    > ENVIAR
                                                    </Button>
                                                </div>
                                            </Form>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>

                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle
                                            as={Button}
                                            variant='link'
                                            eventKey='2'
                                        > Deletar Conta
                                        </Accordion.Toggle>
                                    </Card.Header>

                                    <Accordion.Collapse eventKey='2'>
                                        <Card.Body>
                                            <h5 className='ru-attention-msg'> Atenção </h5>
                                            <p> Esta ação é permanente. Todos os seus dados serão excluídos. </p>

                                            <div className='ru-delete-account-button-position'>
                                                <Button
                                                    variant='outline-danger'
                                                    type='submit'
                                                    onClick={this.showDeleteAccountModal}
                                                > DELETAR CONTA
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>

                        </Modal.Body>

                        <Modal.Footer>
                            <Button
                                variant='outline-secondary'
                                type='reset'
                                href='/main'
                            > CANCELAR
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>

                </Container>

                <Modal
                    id='delete-account-modal'
                    size='sm'
                    show={this.state.showDeleteAccount}
                    onHide={this.hideDeleteAccountModal}
                    handleClose={this.hideDeleteAccountModal}
                >

                    <Modal.Body>
                        <Form>
                            <Form.Label> Confirme sua senha para continuar </Form.Label>
                            <Form.Group>
                                <Form.Control
                                    required
                                    type='password'
                                    placeholder='Senha'
                                    name='passwordDelete'
                                    value={passwordDelete}
                                    onChange={this.handleChange}
                                />
                                <div className='ru-error-msg'> {this.state.passwordDeleteError} </div>
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            variant='outline-secondary'
                            type='reset'
                            onClick={this.hideDeleteAccountModal}
                        > CANCELAR
                        </Button>

                        <Button
                            variant='danger'
                            type='submit'
                            onClick={this.onSubmitDeleteAccount}
                        > DELETAR
                        </Button>
                    </Modal.Footer>
                </Modal>


                <div className='t-container'>

                    <Toast
                        id='error-toast-edit-user'
                        show={errorToast}
                        onClose={this.toggleErrorToast}
                        animation={true}
                        autohide
                        delay={10000}
                        className='t-toast'
                    >
                        <Toast.Header>
                            <svg class="bi bi-exclamation-circle-fill t-error-text" width="1.3em" height="1.3em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                            </svg>
                            <div style={{width:'2%'}}></div>
                            <strong className='mr-auto t-error-text t-font'> Erro </strong>
                            <small> attendancecontrol </small>
                        </Toast.Header>

                        <Toast.Body className='t-error-text'>
                            <p> {errorToastMsg} </p>
                        </Toast.Body>
                    </Toast>

                    <Toast
                        id='success-toast-edit-user'
                        show={successToast}
                        onClose={this.toggleSuccessToast}
                        animation={true}
                        autohide
                        delay={8000}
                        className='t-toast'
                    >
                        <Toast.Header>
                            <svg class="bi bi-check2-all t-success-text" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M12.354 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                                <path d="M6.25 8.043l-.896-.897a.5.5 0 1 0-.708.708l.897.896.707-.707zm1 2.414l.896.897a.5.5 0 0 0 .708 0l7-7a.5.5 0 0 0-.708-.708L8.5 10.293l-.543-.543-.707.707z"/>
                            </svg>
                            <div style={{width:'2%'}}></div>
                            <strong className='mr-auto t-success-text t-font'> Sucesso </strong>
                            <small> attendancecontrol </small>
                        </Toast.Header>

                        <Toast.Body className='t-success-text'>
                            <p> {successToastMsg} </p>
                        </Toast.Body>
                    </Toast>

                </div>
                
            </React.Fragment>
        );
    }
}

export default EditUser;