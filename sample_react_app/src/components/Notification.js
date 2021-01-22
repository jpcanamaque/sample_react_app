import React from 'react';
import ReactDOM from 'react-dom';

class Notification extends React.Component {
    render() {
        const isVisible = this.props.isVisible;
        const mode = this.props.mode;
        const notif_type = `notification ${mode} ${(!isVisible) ? `notif-hide` : ``}`;
        const message = this.props.message;
        
        let notification_body = <div className = {notif_type} >
              <button className ="delete"></button>
            <p id = "notif-message"></p>
            </div>;
        
        return notification_body;
    }
}

Notification.defaultProps = {
    isVisible: true,
    mode: 'is-primary',
    message: null
}

export default Notification;