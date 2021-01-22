import React from 'react';
import { SelectOptionBuilder } from '../helpers/component-helper';

class MaximCalendarForm extends React.Component {
    constructor() {
        super();
        this.passMaxcalPeriod = this.passMaxcalPeriod.bind(this);
    }
        
    passMaxcalPeriod() {
        let transyear = this.transyear.value,
            transqtr = this.transqtr.value,
            transww = this.transww.value;
        
        this.props.updateSelectedPeriod({transyear, transqtr, transww});
    }
    
    render() {
        let transyr, transww, transqtr
        if (typeof this.props.current_date !== 'undefined') {
            transyr = Object.keys(this.props.transww_per_year).map((yr) => {
                return <SelectOptionBuilder key = {yr.toString()} value = {yr} />
            });
            
            let current_year = this.props.selected_period.transyear || this.props.current_date.CALENDARYEAR;
            let current_qtr =  this.props.selected_period.transqtr || this.props.current_date.QUARTER;
                                
            transqtr = Object.keys(this.props.transww_per_year[current_year]).map((qtr) => {
                return <SelectOptionBuilder key = {qtr.toString()} value = {qtr} />
            });
            transww = this.props.transww_per_year[current_year][current_qtr].map((ww) => {
                return <SelectOptionBuilder key = {ww.toString()} value = {ww} />
            });
        }
                        
        return ( (typeof this.props.current_date !== 'undefined') ?
            <div className = "columns">
                <form onChange = { this.passMaxcalPeriod } onLoad = { this.passMaxcalPeriod } >
                    <div className = "column is-grouped is-grouped-right">
                        <div className = "field">
                            <label className = "label is-small">Fiscal Year</label>
                              <div className = "control">
                                    <div className ="select is-small">
                                      <select id = "mxm-transyr" ref = {(input) => {this.transyear = input}} defaultValue = {this.props.current_date.CALENDARYEAR}>
                                      { transyr }
                                      </select>
                                    </div>
                              </div>
                        </div>

                        <div className = "field">
                            <label className = "label is-small">Quarter</label>
                              <div className = "control">
                                    <div className ="select is-small">
                                      <select id = "mxm-transqtr" ref = {(input) => {this.transqtr = input}} defaultValue = {this.props.current_date.QUARTER}>
                                        {transqtr}
                                      </select>
                                    </div>
                              </div>
                        </div>

                        <div className = "field">
                            <label className = "label is-small">Work week</label>
                              <div className = "control">
                                    <div className ="select is-small">
                                      <select id = "mxm-transww" ref = {(input) => {this.transww = input}} defaultValue = {this.props.current_date.WEEK_NUMBER}>
                                        { transww }
                                      </select>
                                    </div>
                              </div>
                        </div>
                    </div>
                </form>
            </div>
                
                : <div className = "columns">
                        <div className = "column">
                            <a className = "is-primary is-loading is-large button"></a>
                        </div>
                </div>
        );
    }
}

export default MaximCalendarForm;