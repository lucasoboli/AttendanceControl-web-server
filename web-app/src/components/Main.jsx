import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import './Main.css';


class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            subjects: [],
        };
    }

    openNewClassModal = event => {
        event.preventDefault();

        // Abrir modal RegisterClass
    }

    openEditClassModal =event => {
        event.preventDefault();

        // Abrir modal
    }

    removeClass = event => {
        event.preventDefault();

        // Criar interface para remover uma turma
        // Back end
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
                                    onClick
                                    href='/register-class'
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
                                <tr>
                                    <a href='/edit-class'>
                                        <td>
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.502 1.94a.5.5 0 010 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 01.707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 00-.121.196l-.805 2.414a.25.25 0 00.316.316l2.414-.805a.5.5 0 00.196-.12l6.813-6.814z" />
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-6a.5.5 0 00-1 0v6a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5H9a.5.5 0 000-1H2.5A1.5 1.5 0 001 2.5v11z" clipRule="evenodd" />
                                            </svg>
                                        </td>
                                    </a>
                                    <td>MAT001</td>
                                    <td>T01</td>
                                    <td>Cálculo I</td>
                                    <td>2M23 4M45</td>
                                    <td>
                                        <Button
                                            variant='success'
                                            type='buton'
                                            href='/qr-screen'
                                        > GERAR 
                                        </Button>
                                    </td>
                                </tr>
                                <tr>
                                    <a href='/edit-class'>
                                        <td>
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.502 1.94a.5.5 0 010 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 01.707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 00-.121.196l-.805 2.414a.25.25 0 00.316.316l2.414-.805a.5.5 0 00.196-.12l6.813-6.814z" />
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-6a.5.5 0 00-1 0v6a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5H9a.5.5 0 000-1H2.5A1.5 1.5 0 001 2.5v11z" clipRule="evenodd" />
                                            </svg>
                                        </td>
                                    </a>
                                    <td>MAT001</td>
                                    <td>T02</td>
                                    <td>Cálculo I</td>
                                    <td>4M45 6M45</td>
                                    <td>
                                        <Button
                                            variant='success'
                                            type='buton'
                                            href='/qr-screen'
                                        > GERAR 
                                        </Button>
                                    </td>
                                </tr>
                                <tr>
                                    <a href='/edit-class'>
                                        <td>
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.502 1.94a.5.5 0 010 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 01.707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 00-.121.196l-.805 2.414a.25.25 0 00.316.316l2.414-.805a.5.5 0 00.196-.12l6.813-6.814z" />
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-6a.5.5 0 00-1 0v6a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5H9a.5.5 0 000-1H2.5A1.5 1.5 0 001 2.5v11z" clipRule="evenodd" />
                                            </svg>
                                        </td>
                                    </a>
                                    <td>MAT011</td>
                                    <td>T01</td>
                                    <td>Geometria Analítica e Álgebra Linear</td>
                                    <td>2T12</td>
                                    <td>
                                        <Button
                                            variant='success'
                                            type='buton'
                                            href='/qr-screen'
                                        > GERAR 
                                        </Button>
                                    </td>
                                </tr>
                                <tr>
                                    <a href='/edit-class'>
                                        <td>
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.502 1.94a.5.5 0 010 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 01.707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 00-.121.196l-.805 2.414a.25.25 0 00.316.316l2.414-.805a.5.5 0 00.196-.12l6.813-6.814z" />
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-6a.5.5 0 00-1 0v6a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5H9a.5.5 0 000-1H2.5A1.5 1.5 0 001 2.5v11z" clipRule="evenodd" />
                                            </svg>
                                        </td>
                                    </a>
                                    <td>MAT001</td>
                                    <td>T03</td>
                                    <td>Cálculo I</td>
                                    <td>3T12 5T34</td>
                                    <td>
                                        <Button
                                            variant='success'
                                            type='buton'
                                            href='/qr-screen'
                                        > GERAR 
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Container>

                    <div label='bottom-space' className='m-bottom-space-div'> </div>
                </Container>
                
            </React.Fragment>
        );
    }
}

export default Main;