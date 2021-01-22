import React from 'react';
// import ReactDOM from 'react-dom';
// import JsonRpc from 'jsonrpc-client';
import PropType from 'prop-types';

import Header from './Header';

import TechView from './TechView';
// import SprvsrView from './SprvsrView';
import AuthUserView from './AuthUserView';

// import { showNotification, formatJSDate } from '../helpers/helper'; 

class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = props.params;
    }

    render () {
        const user_role = this.state.userDetails.struserroledesc;
        const page = setPagePerRole(user_role, this.state);
        
        return page;
    }
}

function setPagePerRole (user_role, state) {
    let page = "";
    
    switch (user_role) {
        case 'AUTHENTICATED_USER':
            page = <div>
                    <Header userDetails = {state.userDetails} />
                    <AuthUserView />
                </div>;
                break;
        case 'TECHNICIAN':
            page = <div>
                    <Header userDetails = {state.userDetails} />
                    <TechView params = {state} />
                </div>;
                break;
        
        default:
            page = <div>Hello World</div>;
            break;
    }
    return page;
}

App.contextTypes = {
    "router" : PropType.object
}

export default App;