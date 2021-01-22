import React, { Component } from 'react';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';

import { AppConstants } from '../helpers/helper';
import { SelectOptionBuilder } from '../helpers/component-helper';

class TimesheetRows extends Component {
    constructor () {
        super();
        this.state = {
          value : ''
        }
    }

    render() {
        var operation, task_desc, testercell, testertype, dietype, tech_note;
        if(typeof this.props.tasks.length === 'undefined') {
          return 'None';
        } else {
          const task = this.props.tasks[this.props.task_index];
          operation = task.operation;
          task_desc = task.task_desc;
          testercell = task.testercell;
          testertype = task.testertype;
          dietype = task.dietype;
          tech_note = task.tech_note;
          
        }

        const oper = AppConstants().operations.map((op) => {
            return <SelectOptionBuilder key = {op} value = {op} />
        });
    
        let task_arr = this.props.taskOptions[this.props.selected_tab] || {};
        const tasks = Object.keys(task_arr).map((task_id) => {
            return <SelectOptionBuilder key = {task_id} value = {task_arr[task_id]} />
        });
    
        let tester_arr = this.props.testerDetails || {};
        const tester_cell = Object.keys(tester_arr).map((cell) => {
            return <SelectOptionBuilder key = {cell} value = {cell} />
        });
        
        let trid = `${this.props.selected_tab}_task_${this.props.task_index}_${this.props.userid}`;
        testercell = this.props.cell[trid] || testercell;
        const ttype = tester_arr[testercell].map((t) => {
            return <SelectOptionBuilder key = {t} value = {t} />
        });

        const dietypes = this.props.dietype_lk.map(dietype => {
          return {label: dietype};
        })
        
        return (
            <tr id = {trid}>
                  <td>
                    <div className ="select is-small">
                      <select defaultValue = {operation} onChange = {(e) => {this.props.handleTimesheetOnchange(e, this.props.task_index)}}>
                        <option value = "0"> --Select oper-- </option>
                        { oper }
                      </select>
                    </div>
                  </td>
                  <td>
                    <div className ="select is-small">
                      <select defaultValue = {task_desc}>
                        <option value = "0"> --Select task-- </option>
                        { tasks }
                      </select>
                    </div>
                  </td>
                  <td>
                    <div className ="select is-small">
                      <select defaultValue = {testercell} onChange = {(e) => {this.props.setTestertype(e)}}>
                        <option value = "0"> --Select cell-- </option>
                        { tester_cell }
                      </select>
                    </div>
                  </td>
                  <td>
                    <div className ="select is-small">
                      <select defaultValue = {testertype}>
                        <option value = "0"> --Select tester type-- </option>
                        { ttype }
                      </select>
                    </div>
                  </td>
                  <td>
                      <div className="control">
                        <AsyncTypeahead
                            className="input is-small"
                            onSearch={query => this.props.getDietypeLookup(query)}
                            labelKey="label"
                            options={dietypes}
                            placeholder="Enter Die type"
                            delay={800}
                            defaultValue="asd"
                            value ={dietype}
                            id="ovt_dt"
                        />
                      </div>
                  </td>
                  <td>
                      <div className="control">
                        <input className="input is-small" type="text" placeholder="Text input" />
                      </div>
                  </td>
                  <td>
                      <div className="control">
                        <input className="input is-small" type="text" placeholder="Text input" />
                      </div>
                  </td>
                  <td>
                      <div className="control">
                        <input className="input is-small" type="text" placeholder="Text input" />
                      </div>
                  </td>
                  <td>
                      <div className="control">
                        <input className="input is-small" type="text" placeholder="Text input" />
                      </div>
                  </td>
                  <td>
                      <div className="control">
                        <input className="input is-small" type="text" placeholder="Text input" />
                      </div>
                  </td>
                  <td>
                      <div className="control">
                        <input className="input is-small" type="text" placeholder="Text input" />
                      </div>
                  </td>
                  <td>
                      <div className="control">
                        <input className="input is-small" type="text" placeholder="Text input" />
                      </div>
                  </td>
                  <td>
                      <div className="control">
                          <input className="input is-small" type="text" placeholder="Text input" defaultValue = {tech_note}/>
                      </div>
                  </td>
                </tr>
        );
    }
}

export default TimesheetRows;