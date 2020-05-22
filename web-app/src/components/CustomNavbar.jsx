import React from 'react';
import './CustomNavbar.css';


class CustomNavbar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    onLogout = () => { // ToDo: extinguir token de sessão
        // Back-end
    }


    render() {
        return (

            <React.Fragment>
                <div id='navbar' className='cn-navbar-container'>
                    
                    <div className='cn-title-container'>
                        <p className='cn-title'>
                            attendancecontrol
                        </p>
                    </div>

                    <div className='cn-buttons-container'>
                        <a href='/edit-user' className='cn-edit-user-button'>
                            <svg className="bi bi-person-lines-fill" width="1.8em" height="1.8em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 100-6 3 3 0 000 6zm7 1.5a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5zm-2-3a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5zm2 9a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5z" clipRule="evenodd"/>
                            </svg>
                        </a>
                        <div style={{height:'100vh',width:'2vw'}}></div>
                        <a href='/home'>
                            <button
                                className='cn-logout-button'
                                type='button'
                            > Sair </button>
                        </a>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CustomNavbar;