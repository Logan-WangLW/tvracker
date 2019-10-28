import React from 'react';
import LoginForm from './login-form.js';
import RegisterForm from './register-form.js';
import { connect } from 'react-redux';

export class Landing extends React.Component {
  state = {
    LoginHidden: true,
    RegisterHidden: true
  }

  showLogin() {
    this.setState({
      LoginHidden: !this.state.LoginHidden
    })
    if (this.state.RegisterHidden === false) {
      this.setState({ RegisterHidden: true })
    }
  }

  showRegister(e) {
    this.setState({
      RegisterHidden: !this.state.RegisterHidden
    })
    if (this.state.LoginHidden === false) {
      this.setState({ LoginHidden: true })
    }
  }


  render() {
    return (
      <div className="home-buttons">
        <button
          className="toggle-login-button"
          type="button"
          onClick={() => this.showLogin()}>Log In Form</button>
        {!this.state.LoginHidden && <LoginForm />}
        <button
          className="toggle-login-button"
          type="button"
          onClick={() => this.showRegister()}>Sign Up Form</button>
        {!this.state.RegisterHidden && <RegisterForm />}
      </div>
    )
  }
}


export default connect()(Landing);