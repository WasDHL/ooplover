import React, { Component } from 'react';
// export default props => (<div>{'Login Page'}</div>);
//
// const LoginComponent = props => (
//
// );

class LoginComponent extends Component {
    constructor (props) {
        super(props);
        this.props = props;
        this.history = this.props.history;

        this.state = {
            users:[
              {id:1,name:'XHM'},
              {id:2,name:'DHL'}
            ],
            name: 'XHM', password: 'OOPSTUDY_',
            errorMessage: null
        };
    }

    componentWillReceiveProps (newProps) {
        this.setState({ errorMessage: null });
        let loginSuccess = newProps.loginSuccess;
        if (loginSuccess) {
            return this.history.push('/home');
        }
        let loginFail = newProps.loginFail;
        if (loginFail) {
            this.setState({ errorMessage: newProps.errorMessage || { message: 'Login Failed' } });
        }
    }

    render () {
        return (
            <div className="login-page v-m-container">
                <div className="v-m-element" style={{ textAlign: 'center' }}>
                    <div className="login-panel">
                        <div className="login-title">面 向 对 象 面 向 君</div>
                        <div>
                            <div className="form-row">
                                <span className='form-ipt simulate-sel'>{this.state.name}</span>
                                <select  className="form-sel"  defaultValue='' onChange={event => this.setState({name: event.target.value})}>
                                    {
                                        this.state.users.map((i)=>{
                                            return (
                                                <option key={i.id} value={i.name}>
                                                    {i.name}
                                                </option>
                                            );
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-row">
                                <input type='password' value={this.state.password} onChange={event => this.setState({password: event.target.value})} className="form-ipt" placeholder="PASSWORD" />
                            </div>
                        </div>
                        <div>
                            <span className="btn" onClick={() => this.register()} style={{visibility: 'hidden'}}>Register</span>
                            <span className="btn" onClick={() => this.login()}>Login</span>
                        </div>
                        <div style={{ height: '60px' }}>
                            { this.state.errorMessage && <span style={{ color: 'red', fontSize: '13px' }}>{this.state.errorMessage.message}</span> }
                        </div>
                    </div>
                    <div className="login-recommend">好好学习，天天向上... </div>
                </div>
            </div>
        );
    }

    login () {
        var { name, password } = this.state;
        name && password && this.props.login && typeof this.props.login == 'function' && this.props.login({ name, password });
    }

    register () {
        var { name, password } = this.state;
        name && password && this.props.register && typeof this.props.register == 'function' && this.props.register({ name, password });
    }
}

import { withRouter } from 'react-router';
import { connectAuth } from './connect';

export default connectAuth(withRouter(LoginComponent));
