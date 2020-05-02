import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Container, Button, Table } from 'react-bootstrap';
import './Main.css';


export default class Main extends Component {
    render() {
        return (
            <Container>
                <div>
                    MAIN PAGE WHEN LOGIN ACTIVE
                </div>
                <div className="space"></div>
                <Link to="">
                    <Button variant="success"> + Cadastrar Nova Turma </Button>
                </Link>
                <div className="space2"></div>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th className="table-col-subCod-QR"> Código </th>
                        <th className="table-col-class"> Turma </th>
                        <th className="table-col-name"> Nome </th>
                        <th className="table-col-schedule"> Horário </th>
                        <th className="table-col-subCod-QR"> QR Code </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>MAT001</td>
                            <td>T01</td>
                            <td>Cálculo I</td>
                            <td>2M23 4M45</td>
                            <td>
                                <Link to="/qrscreen">
                                    <Button variant="outline-success">
                                        Gerar
                                    </Button>
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <td>MAT001</td>
                            <td>T02</td>
                            <td>Cálculo I</td>
                            <td>4M45 6M45</td>
                            <td>
                                <Link to="/qrscreen">
                                    <Button variant="outline-success" font-type="bold">
                                        Gerar
                                    </Button>
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <td>MAT011</td>
                            <td>T01</td>
                            <td>Geometria Analítica e Álgebra Linear</td>
                            <td>2T12</td>
                            <td>
                                <Link to="/qrscreen">
                                    <Button variant="outline-success" font-type="bold">
                                        Gerar
                                    </Button>
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <td>MAT001</td>
                            <td>T03</td>
                            <td>Cálculo I</td>
                            <td>3T12 5T34</td>
                            <td>
                                <Link to="/qrscreen">
                                    <Button variant="outline-success" font-type="bold">
                                        Gerar
                                    </Button>
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                    </Table>

            </Container>
        )
    }
}