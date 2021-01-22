import React from 'react';

class NotLoggedIn extends React.Component {
    render() {
        setTimeout(() => {
            window.location = '/login';
        }, 2000);
        return (
            <h2>Not logged in. Redirecting to login page.. </h2>
        );
    }
}

export default NotLoggedIn;