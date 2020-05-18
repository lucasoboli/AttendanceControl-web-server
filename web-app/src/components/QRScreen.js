import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


class QRScreen extends React.Component {

    hideModal = () => {
        this.setState({ show: false });
    }

    
    render() {
        return (
            
            <Modal
                size='xl'
                show={true}
                onHide={this.hideModal}
                handleClose={this.hideModal}
            >
                
                <Modal.Header closeButton>
                    <Modal.Title> Cod_Disciplina - Cod_Turma </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h1> QR CODE AQUI </h1>
                </Modal.Body>

                <Modal.Footer style={{textAlign:'center'}}>
                    <Button
                        variant='outline-success'
                        type='button'
                        onClick={this.hideModal}
                        href='/main'
                    > ENCERRAR
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default QRScreen;