import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import BackgroundImage404Path from '../images/404.jpg';


const BackgroundImage404 = {
    position: 'fixed',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: '0',
    inherit: 'none'
};

const Content = {
    zIndex: '1'
};


export default class NoMatch extends Component {
    render() {
        return (
            <Container>
                <img src={BackgroundImage404Path} alt='/' style={BackgroundImage404} />
                <div style={Content} >
                    <h1> 404 </h1>
                    <h3> No Match for this. </h3>
                </div>
            </Container>
        );
    }
}