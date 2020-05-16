import React from 'react';
import Container from 'react-bootstrap/Container';
import BackgroundImage404Path from '../images/404.jpg';


const BackgroundImage404 = {
    //position: 'fixed',
    backgroundSize: 'auto',
    backgroundPosition: 'center',
    float: 'left',
    opacity: '0.6',
    zIndex: '-0',
    inherit: 'none'
};

const Content = {
    zIndex: '1'
};


class NoMatch extends React.Component {
    render() {
        return (

            <Container>
                <div id='main'>
                    <img src={BackgroundImage404Path} alt='/' style={BackgroundImage404} />
                    <div style={Content} className='fof'>
                        <h1> 404 </h1>
                        <h3> No Match for this. </h3>
                        <a href="/"> Take Me Home </a>
                    </div>
                </div>
            </Container>
        );
    }
}

export default NoMatch;