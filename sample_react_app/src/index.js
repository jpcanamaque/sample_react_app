import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route} from 'react-router-dom';

import '../node_modules/bulma/css/bulma.css'; 
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import './css/app.css';

import App from './components/App';
import NotLoggedIn from './components/NotLoggedIn';
import Login from './components/Login';

function withProps(Component, props) {
  return function(matchProps) {
    return <Component {...props} {...matchProps} />
  }
}

class Root extends React.Component {
    constructor () {
        super();
        this.mainState_init = this.mainState_init.bind(this);
        
        document.cookie  = (document.cookie === "" || typeof JSON.parse(document.cookie) !== 'object')  ? false : document.cookie
        
        this.state = JSON.parse(document.cookie) || {
            JsonRpcServer : "http://example.com/json-rpc/json-rpc.php",
            hasLoggedIn : false,
            user_loggedIn : null
        };
    }
    
    mainState_init (s) {
        const mainState = Object.assign({}, this.state);
        mainState.hasLoggedIn = s.hasLoggedIn
        mainState.user_loggedIn = s.user_loggedIn;
        this.setState(mainState);
        document.cookie = JSON.stringify(mainState);
    }
        
    render () {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path= "/" component = {withProps(Login, {params : this.state, mainState_init: this.mainState_init})} />
                    <Route path= "/login" component = { withProps(Login, {params : this.state, mainState_init: this.mainState_init})} />
                    <Route path = "/main" component = {
                            (this.state.hasLoggedIn) ?
                            withProps(App, {params : this.state}) :
                            NotLoggedIn
                        } />
                </div>
            </BrowserRouter>
        );
    }
}

render(<Root/>, document.querySelector('#root'));