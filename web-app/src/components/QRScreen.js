import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


class QRScreen extends React.Component {

    onClose = event => {
        event.preventDefault();

        // Fechar modal
    }

    
    render() {
        return (
            
            <Modal size='lg' show='false' showModal='false'>
                <Modal.Header>
                    <Modal.Title> Cod_Disciplina - Cod_Turma </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h1> QR CODE AQUI </h1>
                </Modal.Body>

                <Modal.Footer style={{textAlign:'center'}}>
                    <Button
                        variant='secondary'
                        type='button'
                        onClick={this.onClose}
                    > ENCERRAR
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default QRScreen;