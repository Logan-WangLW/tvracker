import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import Input from './input';
import { login } from '../actions/auth.js';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { required, nonEmpty, isTrimmed } from '../utils/validators.js';

export class LogInForm extends React.Component {

  render() {
    if (this.props.submitSucceeded) {
      return <Redirect to="/show-search" />
    }
    let error;
    if (this.props.error) {
      error = (
        <div>
          {this.props.error}
        </div>
      )
    }
    return (
      <form
        className="login-form"
        onSubmit={this.props.handleSubmit}>
        {error}
        <label htmlFor="username">Username</label>
        <Field
          className="form-input"
          component={Input}
          type="text"
          name="username"
          id="username"
          validate={[required, nonEmpty, isTrimmed]}
        />
        <label htmlFor="password">Password</label>
        <Field
          className="form-input"
          component={Input}
          type="password"
          name="password"
          id="password"
          validate={[required, nonEmpty, isTrimmed]}
        />
        <button className="login-button" disabled={this.props.pristine || this.props.submitting}>
          Log in
        </button>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  error: state.auth.error
})

connect(mapStateToProps)(LogInForm);

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username')),
  onSubmit: (values, dispatch) => {
    return dispatch(login(values.username, values.password))
  }
})(LogInForm)