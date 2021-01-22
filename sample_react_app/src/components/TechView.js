import React from 'react';
import JsonRpc from 'jsonrpc-client';

import Timesheet from './Timesheet';
import MaximCalendarForm from './MaximCalendarForm';

import { formatJSDate } from '../helpers/helper'; 

class TechView extends React.Component {
    constructor() {
        super();
        this.getMaximCalendar = this.getMaximCalendar.bind(this);
        this.updateSelectedPeriod = this.updateSelectedPeriod.bind(this);
        this.getAllTaskOptions = this.getAllTaskOptions.bind(this);
        this.getTesterDetails = this.getTesterDetails.bind(this);
        this.getUserTasks = this.getUserTasks.bind(this);
        this.getDietypeLookup = this.getDietypeLookup.bind(this);
        this.handleTimesheetOnchange = this.handleTimesheetOnchange.bind(this);
        
        this.state = {
            dietype_lk: [],
            // selected_period: [],
            selected_period: {
                transyear: '',
                transqtr: '',
                transww: '',
            },
            selected_tab : "summ",
            tasks : {}
        }
    }
    
    componentWillMount() {
        this.getMaximCalendar(() => {
            this.getWorkweekDates();
        });
        this.getAllTaskOptions();
        this.getTesterDetails();
    }

    getWorkweekDates () {
        const {transyear, transqtr, transww} = this.state.selected_period;
        const param = {transyear, transqtr, transww};
        const jsonrpc_url = this.props.params.JsonRpcServer;
        let client = JsonRpc.create(jsonrpc_url);
        client.call('ovt_getWorkweekDates', param, 
            (e,r) => {
                this.setState({
                    work_week_dates: r
                })
            }
        );
    }

    getDietypeLookup (query = false) {
        const jsonrpc_url = this.props.params.JsonRpcServer;
        let client = JsonRpc.create(jsonrpc_url);
        query = query || '';
        client.call('ovt_getDietypeLookup', {query}, 
            (e,r) => {
                if(e == null) {
                    this.setState({
                        dietype_lk : r
                    });
                } else {
                    this.setState({
                        dietype_lk : []
                    });
                }
            }
        )
    }
    
    getMaximCalendar (callback) {
        this.setState({
            selected_period : {
                transyear: 2021,
                transqtr: 3,
                transww: 28
             }
        })

        callback();

        // const date = formatJSDate(Date.now());
        // const jsonrpc_url = this.props.params.JsonRpcServer;
        
        // let client = JsonRpc.create(jsonrpc_url);
        // client.call('ovt_getMaximCalendar', {calendardate: date},
        //     (e,r) => {
                
        //        this.setState(r);
        //        this.setState({
        //         selected_period : {
        //             transyear: r.current_date.CALENDARYEAR,
        //             transqtr: r.current_date.QUARTER,
        //             transww: r.current_date.WEEK_NUMBER
        //          }
        //        })

        //        callback();
        //     });
    }

    getAllTaskOptions () {
        const jsonrpc_url = this.props.params.JsonRpcServer;
        let client = JsonRpc.create(jsonrpc_url);
        client.call('ovt_getTasks', {},
            (e,r) => {
                this.setState({
                    taskOptions : r
                });
            }
        );
    }
    
    getTesterDetails () {
        const jsonrpc_url = this.props.params.JsonRpcServer;
        let client = JsonRpc.create(jsonrpc_url);
        client.call('ovt_getTesterTypeCell', {},
            (e,r) => {
                this.setState({
                    testerDetails : r
                });
            }
        );
    }

    updateSelectedPeriod(selected_period) {
        this.setState({
            tasks: [],
            selected_period
        }, () => {
            this.getUserTasks()
        });        
    }
    
    setTpeGoal (e) {
        e.preventDefault();
        const prev_active = document.querySelector('li.is-active');
        prev_active.classList.remove('is-active');
        
        const active_tab = e.target.dataset.tab;
        const elmnt = e.target;
        const parent = elmnt.parentNode;

        parent.classList.add('is-active');

        this.setState({
            tasks: [],
            selected_tab : active_tab
        }, () => {
            this.getUserTasks()
        });        
    }

    getUserTasks () {
        const {transyear, transqtr, transww} = this.state.selected_period ;
        let tasks_params = {
            uid : this.props.params.userDetails.stremployeeno,
            goal : this.state.selected_tab,
            transyear, transqtr, transww
        }
        let jsonrpc_url = this.props.params.JsonRpcServer;
        let client = JsonRpc.create(jsonrpc_url);
        
        client.call('ovt_getTasksPerUser',  tasks_params,
            (e,r) => {
                let __tasks;
                if (e == null) {
                    __tasks = this.state.tasks || {};
                    __tasks = r;
                } else {
                    __tasks = {result: false}
                }

                this.setState({tasks : __tasks, taskForSave: __tasks});
            }
        );
    }

    handleTimesheetOnchange (e, idx) {
        console.log(this.state.taskForSave[idx]);
    }

    render () {
        let techview_body;
        if(this.state.selected_tab !== 'summ') {
            if(
                (typeof this.state.tasks.length === 'undefined' 
                || this.state.tasks.length === 0)
                & typeof this.state.tasks.result === 'undefined'
            ) {
                techview_body = <div style = {{textAlign: 'center'}}><div className = "is-loading is-primary button"></div></div>;
            } else if (typeof this.state.tasks.result !== "undefined" && !this.state.tasks.result ) {
                techview_body = <div style = {{textAlign: 'center'}}>No record found.</div>
            } else {
                techview_body = <Timesheet {...this.state} 
                                params = {this.props.params} 
                                handleTimesheetOnchange = {this.handleTimesheetOnchange}
                                getDietypeLookup = {this.getDietypeLookup}
                            />;
            }
        } else {
            techview_body = <div>Hello World</div>;
        }
        
        return (
            <div>
                <section className="hero is-primary">
                    <div className="hero-body">
                        <div className="container">
                            <div className = "columns is-vcentered">
                                <div className = "column is-10">
                                    <h1 className="title">
                                    Offline Verification Tool
                                  </h1>
                                  <h2 className="subtitle">
                                    Technician Dashboard
                                  </h2>
                                </div>
                                
                                <div className = "column is-narrow">
                                    <MaximCalendarForm {...this.state} updateSelectedPeriod = {this.updateSelectedPeriod} />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="hero-foot">
                        <nav className="tabs is-boxed">
                          <div className="container">
                            <ul>
                              <li className = "is-active"><a data-tab = "summ" onClick = {(e) => {this.setTpeGoal(e)}}>Summary</a></li>
                              <li><a data-tab = "oee" onClick = {(e) => {this.setTpeGoal(e)}}>OEE</a></li>
                              <li><a data-tab = "hold" onClick = {(e) => {this.setTpeGoal(e)}}>Holds</a></li>
                              <li><a data-tab = "ppm" onClick = {(e) => {this.setTpeGoal(e)}}>PPM</a></li>
                              <li><a data-tab = "npr" onClick = {(e) => {this.setTpeGoal(e)}}>NPR</a></li>
                              <li><a data-tab = "rel" onClick = {(e) => {this.setTpeGoal(e)}}>REL</a></li>
                              <li><a data-tab = "va" onClick = {(e) => {this.setTpeGoal(e)}}>Value Added</a></li>
                            </ul>
                          </div>
                        </nav>
                    </div>
                </section>
                
                <div className = "container is-fluid" >
                    <section className="section">
                        { techview_body }
                    </section>
                </div>
            </div>
        );
    }
}

export default TechView;