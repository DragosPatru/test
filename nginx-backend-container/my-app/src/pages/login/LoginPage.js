import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { login } from '../../actions/actions';
/*
admin@example.com && admin
*/
class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            submitted: false,
            isLoginPending: false,
            isLoginSuccess: false,
            loginError: ""
        };

        // bind actions
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        let { email, password } = this.state;
        this.props.login(email, password);

        this.setState({ submitted: true });
    }



    render() {
        let {email, password, submitted} = this.state;
        let {isLoginPending, isLoginSuccess, loginError} = this.props;

        if(isLoginSuccess) {
            return <Redirect to="/Home" />
        }

        return (
            <div className="container col-md-6 col-md-offset-3">
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
                        {submitted && !email &&
                            <div className="danger">Email is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="danger">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Login</button>
                    </div>

                    <div className="messages">
                        { isLoginPending && <div>Please wait...</div> }
                        { isLoginSuccess && <div className="text-success">Success.</div> }
                        { loginError && <div className="text-danger">{loginError.message}</div> }
                    </div>
                </form>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
      isLoginPending: state.isLoginPending,
      isLoginSuccess: state.isLoginSuccess,
      loginError: state.loginError
    };
}
  
const mapDispatchToProps = (dispatch) => {
    return {
      login: (email, password) => dispatch(login(email, password))
    };
}

const connectedLogin= connect(mapStateToProps, mapDispatchToProps)(LoginPage);
export { connectedLogin as LoginPage }; 
