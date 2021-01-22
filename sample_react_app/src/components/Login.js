import React from 'react';
// import ReactDOM from 'react-dom';
import JsonRpc from 'jsonrpc-client';
import PropType from 'prop-types';

import { showNotification } from '../helpers/helper'; 

import logo from '../img/logo.png'
// import Notification from './Notification';

class Login extends React.Component {
    constructor () {
        super();
        this.getEmployeeDetails = this.getEmployeeDetails.bind(this);
        this.saveEmployeeDetails = this.saveEmployeeDetails.bind(this);
        this.getUserPermissionLevel = this.getUserPermissionLevel.bind(this);
    }
    
    componentDidMount () {
        console.log(this)
        const params = this.props.params;
        if(params.hasLoggedIn) {
            this.props.history.push('/main');
        }
    }
    
    getEmployeeDetails(params, callback) {
        const username = params.user_loggedIn;
        
        if(typeof username !== 'undefined') {
            const jsonrpc_url = params.JsonRpcServer;
            let client = JsonRpc.create(jsonrpc_url);
            client.call('sso_getUserDetailsByUsername', { username }, 
                (e,r) => {
                    if(e == null) {
                        params.userDetails = r;

                        this.saveEmployeeDetails(params, (res) => {
                            if(res) {
                                console.log(`Logging-in: ${username}`);
                                
                                this.getUserPermissionLevel(params, (r) => {
                                    params.userDetails.struserroledesc = r;
                                    callback(params);
                                })
                            }
                        });
                    } else {
                        console.warn('Cannot get user details via SSO');
                    }
                }
            )    
        } else {
            return false;
        }   
    }

    saveEmployeeDetails(params, callback) {
        let uid = params.userDetails.stremployeeno;
        let fullname = params.userDetails.strname;
        let title = params.userDetails.strpersontitle;
        let email = params.userDetails.strexchangeaccount;

        let jsonrpc_url = params.JsonRpcServer;

        let client = JsonRpc.create(jsonrpc_url);

        let param = {uid, fullname, title, email};
        client.call('ovt_saveEmployeeDetails', param,
            (e, r) => {
                if(e == null) {
                    if(r[0]) {
                        console.log('Login details saved to database.');
                        callback(true);
                    } else {
                        callback(false);
                    }
                } else {
                    console.warn('Unable to save user details.');
                    callback(false);
                }
            }
        );
    }

    getUserPermissionLevel (params, callback) {
        let jsonrpc_url = params.JsonRpcServer;
        let username = params.user_loggedIn;
        let uid = params.userDetails.stremployeeno;
        let client = JsonRpc.create(jsonrpc_url);
        
        client.call('ovt_getUserPermissionLevel', { uid }, 
            (e,r) => {
                console.log(`Setting roles for: ${username}`)
                callback(r.role_type);
            });
    }
    
    Sso_login (e) {
        e.preventDefault();
        
        const params = this.props.params;
        const mainState_init = this.props.mainState_init;
        
        let notif_container = document.querySelector('#notif-container');
        while (notif_container.hasChildNodes()) {
            notif_container.removeChild(notif_container.lastChild);
        }
        
        const username = this.username.value;
        const password = this.password.value;
        const jsonrpc_url = params.JsonRpcServer;
        
        if(username === '' || password === '') {
            showNotification('is-danger', ' message');
        } else {
            const login_btn = document.querySelector('#sso-login-btn');
            
            login_btn.classList.add('is-loading');
            let client = JsonRpc.create(jsonrpc_url);
            client.call( 'sso_getValidateUser', {username, password}, 
                (e, r) => {
                    if (e === null) {
                        let message = r.message;
                        if(message === '') {
                            login_btn.classList.remove('is-loading');
                            params.hasLoggedIn = true;
                            params.user_loggedIn = username.toLowerCase();
                            
                            this.getEmployeeDetails(params, function(params){
                                mainState_init(params);
                                document.cookie = JSON.stringify(params);
                                this.props.history.push(`/main`);
                            });
                            
                        } else {
                            login_btn.classList.remove('is-loading');
                            showNotification('is-danger', message);
                        }
                    } else {
                        showNotification('is-danger', ' Unable to login.');
                    }
                }
            );
        }
    }
  
    render() {
        return (
            <div className ="hero is-medium">
                <div className ="hero-body">
                  <div className ="container">
                    <div className ="columns is-mobile is-centered">
                        <div className ="column is-half">
                            <div className = "level">
                                <div className ="level-left">
                                    <div className ="level-item title">
                                        <img src= { logo } alt="logo" width="200" />
                                    </div>
                                    <p className = "level-item">
                                        <strong> Sample </strong>
                                    </p>
                                </div>
                            </div>
                            
                            <form action = "" onSubmit = { (e) => {this.Sso_login(e)} }>
                                <div className = "field">
                                  <p className = "control has-icons-left">
                                    <input required className = "input" type="text" placeholder="Username" id = "sso-login-username"
                                        ref = {(username) => {this.username = username}}/>
                                    <span className = "icon is-small is-left">
                                      <i className = "fa fa-user"></i>
                                    </span>
                                  </p>
                                </div>
                                
                                <div className = "field">
                                  <p className = "control has-icons-left">
                                    <input required className = "input" type="password" placeholder="Password" id = "sso-login-password"
                                        ref = {(password) => {this.password = password}}/>
                                    <span className = "icon is-small is-left">
                                      <i className = "fa fa-lock"></i>
                                    </span>
                                  </p>
                                </div>
                            <br />
                                <div className = "field">
                              <p className ="control">
                                <button className ="button is-primary is-medium is-fullwidth" id = "sso-login-btn">
                                    <span> Login </span>
                                </button>
                              </p>
                                </div>
                            </form>
                            <br />
                            
                            <div id = "notif-container"></div>
                           
                        </div> 
                    </div>
                  </div>
                </div>
                <div className = "hero-foot">
                    <div className ="container">
                        <div className ="columns is-mobile is-centered">
                            <span className = "is-size-7">Powered by AFO IT-MSS | &copy; 2017 </span>
                        </div>
                    </div>
                </div>
          </div>
        );
    }
} 

Login.contextTypes = {
    "router" : PropType.object
}

export default Login;