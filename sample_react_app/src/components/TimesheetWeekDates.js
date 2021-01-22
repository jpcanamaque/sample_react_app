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
            </tr>
        );
    }
}

export default TimesheetWeekDates;