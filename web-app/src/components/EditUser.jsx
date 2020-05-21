import React from 'react';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import './RegisterUser.css';


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
            passwordDeleteError: ""
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    
    componentDidMount = () => {
        // Preenche com os dados autais do professor
        axios.get('http://localhost:3333/professor/6')
            .then((res) => {
                console.log(res.data)
                this.setState({
                    userEmailUpdate: res.data.email,
                    userNameUpdate: res.data.name.split(' ')[0],
                    userSurnameUpdate: res.data.name.split(' ')[1]
                })
            }).catch((error) => {
                console.log(error)
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
                        // Acho que pode colocar um modal de editado, ou voltar pra página principal [Lucas]
                    }).catch((error) => {
                        console.log(error)
                    });
                    
            }).catch((error) => {
                // Aparecer que a senha está errada [Lucas]
            });



        const isValid = this.validateUpdate();
        if (isValid) {
            // Limpando erros do Form
            this.setState({ userNameUpdateError: '', passwordUpdateError: '' });

            // Limpando o Form
            this.setState({ userNameUpdate: '', userSurnameUpdate: '',
                passwordUpdate: ''
            });
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
                        // Acho que pode colocar um modal de senha editada, ou voltar pra página principal [Lucas]
                    }).catch((error) => {
                        console.log(error)
                    });
                }).catch((error) => {
                    console.log(error)
                });

        }).catch((error) => {
            // Aparecer que a senha atual está errada [Lucas]
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

        /*const {
            passwordDelete
        } = this.state; */

        const isValid = this.validateDeleteAccount();
        if (isValid) {
            // Limpando erros do Form
            this.setState({ passwordDeleteError: '' });

            //Limpando o Form
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
            passwordDelete
        } = this.state;

        return (

            <React.Fragment>
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
                                    <svg className="bi bi-box-arrow-left" width="2.5em" height="2.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
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
                                        <FormControl
                                            disabled
                                            contentEditable='false'
                                            placeholder={userEmailUpdate.split('@')[0]} // ToDo: Puxar valor do 'value'
                                            aria-label='Email'
                                            name='email'
                                        // ToDo: Alterar 'value' para email do atual login
                                        />
                                        <InputGroup.Append>
                                            <InputGroup.Text id='basic-addon2'>@unifei.edu.br</InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Form.Group>


                                <Form.Label htmlFor='name'> Nome Completo </Form.Label>
                                <InputGroup className='mb-3'>
                                    <FormControl
                                        required
                                        placeholder='Nome'
                                        aria-label='Nome'
                                        name='userNameUpdate'
                                        value={userNameUpdate}
                                        onChange={this.handleChange}
                                    />
                                    <FormControl
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
                                    <FormControl
                                        required
                                        type='password'
                                        placeholder='Senha'
                                        name='passwordUpdate'
                                        value={passwordUpdate}
                                        onChange={this.handleChange}
                                    />
                                </InputGroup>
                                <div className='ru-error-msg'> {this.state.passwordUpdateError} </div>

                                <div className='ru-register-button-position'>
                                    <Button
                                        variant='primary'
                                        type='submit'
                                        onClick={this.onSubmitUpdate}
                                    > SALVAR ALTERAÇÕES
                                    </Button>
                                </div>
                            </Form>

                            <Accordion className='ru-accordion'>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle
                                            as={Button}
                                            variant="link"
                                            eventKey="0"
                                        > Alterar Senha
                                        </Accordion.Toggle>
                                    </Card.Header>

                                    <Accordion.Collapse eventKey="0">
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
                                            variant="link"
                                            eventKey="1"
                                        > Deletar Conta
                                            </Accordion.Toggle>
                                    </Card.Header>

                                    <Accordion.Collapse eventKey="1">
                                        <Card.Body>
                                            <h5 className='ru-attention-msg'> Atenção </h5>
                                            <p> Essa ação é permanente. Todos os dados serão excluídos. </p>

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
                    <Modal.Header closeButton>
                        Confirme sua senha para continuar
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label> Senha </Form.Label>
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
                
            </React.Fragment>
        );
    }
}

export default EditUser;