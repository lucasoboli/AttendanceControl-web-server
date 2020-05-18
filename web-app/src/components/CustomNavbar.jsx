import React from 'react';
import './CustomNavbar.css';


class CustomNavbar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    onLogout = () => {
        // Back-end
    }


    render() {
        return (

            <React.Fragment>
                <div id='navbar' className='cn-navbar'>
                    <div className='cn-title'>
                        <p style={{height:'100%',width:'100%'}}>
                            attendancecontrol
                        </p>
                    </div>
                    <div style={{marginRight:'4%',marginTop:'8px'}}>
                        <button
                            className='cn-logout-button'
                            href='/home'
                            onClick={this.onLogout}
                        > Sair </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CustomNavbar;