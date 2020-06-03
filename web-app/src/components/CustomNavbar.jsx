import React from 'react';
import { useLocation } from 'react-router-dom';

import '../style/CustomNavbar.css';


class CustomNavbar extends React.Component {

    constructor(props) {
        super(props);

        this.state = { // [Ana] A ser usado quando a verificação for feita com token de login
            //isLoggedIn: false
        };
    }

    onLogout = () => { // [Ana] ToDo: extinguir token de sessão
        
    }


    render() {

        switch (this.props.pageName) {
            case 'home':
                return (
                    <div id='navbar' className='cn-navbar-container'>
                        <div className='cn-title-container'>
                            <p className='cn-title'>
                                attendancecontrol
                            </p>
                        </div>
                    </div>
                );
            
            case 'register-user':
                return (
                    <div id='navbar' className='cn-navbar-container'>
                        <div className='cn-title-container'>
                            <a href='/home' className='cn-title'>
                                attendancecontrol
                            </a>
                        </div>
                    </div>
                );
            
            case 'password-recover':
                return (
                    <div id='navbar' className='cn-navbar-container'>
                        <div className='cn-title-container'>
                            <a href='/home' className='cn-title'>
                                attendancecontrol
                            </a>
                        </div>
                    </div>
                );
                
            case 'main':
                return (
                    <div id='navbar' className='cn-navbar-container'>
                        
                        <div className='cn-title-container'>
                            <p className='cn-title'>
                                attendancecontrol
                            </p>
                        </div>

                        <div className='cn-buttons-container'>
                            <a href='/edit-user' className='cn-edit-user-button'
                                data-toggle='tooltip'
                                data-placement='bottom'
                                title='Editar informações de usuário'
                            >
                                <svg className="bi bi-person-lines-fill" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 100-6 3 3 0 000 6zm7 1.5a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5zm-2-3a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5zm2 9a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5z" clipRule="evenodd"/>
                                </svg>
                            </a>

                            <div style={{width:'2vw'}} />
                            <a href='/home'>
                                <button
                                    className='cn-logout-button'
                                    type='button'
                                > Sair </button>
                            </a>
                        </div>
                    </div>
                );

            case 'edit-user':
                return (
                    <div id='navbar' className='cn-navbar-container'>
                        
                        <div className='cn-title-container'>
                            <p className='cn-title'>
                                attendancecontrol
                            </p>
                        </div>

                        <div className='cn-buttons-container'>
                            <a  href='/main' className='cn-back-to-main-button'
                                data-toggle='tooltip'
                                data-placement='bottom'
                                title='Voltar para a página principal'
                            >
                                <svg class="bi bi-table" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                    <path fillRule="evenodd" d="M15 4H1V3h14v1z"/>
                                    <path fillRule="evenodd" d="M5 15.5v-14h1v14H5zm5 0v-14h1v14h-1z"/>
                                    <path fillRule="evenodd" d="M15 8H1V7h14v1zm0 4H1v-1h14v1z"/>
                                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2H0V2z"/>
                                </svg>
                            </a>

                            <div style={{width:'2vw'}} />
                            <a href='/home'>
                                <button
                                    className='cn-logout-button'
                                    type='button'
                                > Sair </button>
                            </a>
                        </div>
                    </div>
                );
            default:
                return null
        }
        
    }
}

export default CustomNavbar;