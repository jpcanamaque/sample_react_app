import React, { Component } from 'react';

class TimesheetWeekDates extends Component {
    render() {
        const week_dates = this.props.week_dates;
        return (
            <tr>
                {
                    week_dates.map((date, i) => {
                        return <th className = "mx-timesheet-header week_dates" key = {i}>{date}</th>
                    })
                }
                {/* <td className = "mx-timesheet-header">1</td>
                <td className = "mx-timesheet-header">2</td>
                <td className = "mx-timesheet-header">3</td>
                <td className = "mx-timesheet-header">4</td>
                <td className = "mx-timesheet-header">5</td>
                <td className = "mx-timesheet-header">6</td>
                <td className = "mx-timesheet-header">7</td> */}
            </tr>
        );
    }
}

export default TimesheetWeekDates;