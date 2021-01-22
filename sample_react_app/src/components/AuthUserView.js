import React, { Component } from 'react';

class AuthUserView extends Component {
    render() {
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
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <div className = "container " >
                    <section className="section">
                        <div className="container">
                        <h2 className="subtitle">
                            Hello World
                        </h2>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default AuthUserView;