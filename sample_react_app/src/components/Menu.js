import React from 'react';

class Menu extends React.Component {
    render() {
        return (
            <div id = "navbarMxmenu" className = "navbar-menu">
                <div className = "navbar-start">
                    <a className ="navbar-item" href="/main">
                        About
                    </a>
                    <a className ="navbar-item" href="/main">
                        Help
                    </a>
                </div>
            </div>
        );
    }
}

export default Menu;