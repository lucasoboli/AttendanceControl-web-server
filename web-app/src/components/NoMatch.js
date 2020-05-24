import React from 'react';
import $ from 'jquery';
import '../style/NoMatch.css';


class NoMatch extends React.Component {
    componentDidMount() {
        /*
        var container = document.getElementById('nm-body');
        window.onmousemove = function(e) {
            var x = e.clientX/10,
                y = e.clientY/10;
            container.style.backgroundPositionX = x + 'px';
            container.style.backgorundPositionY = y + 'py';
        }
            */
    }


    render() {
        return (

            <React.Fragment>
                <div id='nm-body'>
                    <div className='nm-space'/>
                    <div className='nm-container'>
                        <div className='nm-row'>
                            <div className='xs-12 md-6 nm-mx-auto'>
                                <div id='countUp'>
                                    <div className='number' dataCount='404'> 404 </div>
                                    <div className='text'> Página não encontrada </div>
                                    <div className='text'> HTTP: 404 </div>
                                    <a href='/home'> Me leve de volta </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default NoMatch;