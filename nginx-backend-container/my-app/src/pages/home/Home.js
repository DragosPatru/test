import React from 'react';

export class HomePage extends React.Component {
    componentDidMount() {  
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi !</h1>
                <p>You're logged in with React!!</p>
            </div>
        );
    }
}
