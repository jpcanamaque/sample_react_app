import React from 'react';
// import ReactDOM from 'react-dom';

import {getParentNode} from '../helpers/helper';

import TimesheetWeekDates from './TimesheetWeekDates';
import TimesheetRows from './TimesheetRows';

class Timesheet extends React.Component {
    constructor () {
      super();
      this.setTestertype = this.setTestertype.bind(this);
      this.state = {
        cells : {}
      }
    }

    setTestertype (e) {
      const cells = this.state.cells || {};
      let value = e.target.value;
      let parent_tr_id = getParentNode(e.target, 'tr').id;
      cells[parent_tr_id] = value;
      this.setState({cells})
    }

    render() {       
        const userid = this.props.params.userDetails.stremployeeno;
       
        let tasks;
        if(typeof this.props.tasks.length === 'undefined') {
          tasks = [{}];
        } else {
          tasks = this.props.tasks;
        }
  
        return (
            <table className = "table is-narrow is-striped is-fullwidth">
              <thead>
                  <tr>
                      <th className = "mx-timesheet-header" rowSpan = "2">Operation</th>
                      <th className = "mx-timesheet-header" rowSpan = "2">Task</th>
                      <th className = "mx-timesheet-header" rowSpan = "2">Cell</th>
                      <th className = "mx-timesheet-header" rowSpan = "2">Tester Type</th>
                      <th className = "mx-timesheet-header" rowSpan = "2">Die Type</th>
                      <th className = "mx-timesheet-header" id = "mx-calendar-view" rowSpan = "1" colSpan = "7">Calendar View</th>
                      <th className = "mx-timesheet-header" rowSpan = "2">Tech Notes</th>
                  </tr>
                  <TimesheetWeekDates week_dates = {this.props.work_week_dates} />
              </thead>
              <tbody>
                {
                  tasks.map((d, i) => {
                    return <TimesheetRows {...this.props} key = {i} cell = {this.state.cells} task_index = {i} userid = {userid} setTestertype = {this.setTestertype}/>
                  })
                }
              </tbody>
            </table>
        );
        
    }
}

export default Timesheet;