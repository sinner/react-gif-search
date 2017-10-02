import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import * as Actions from '../actions';

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = "Please enter an email.";
  }
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = "Please enter a password.";
  }

  return errors;
};

class Login extends React.Component {

  constructor () {
    super();
  }

  componentWillUnmount() {
    this.props.removeErrorMessage();
  }

  handleFormSubmit = (values) => {
    this.props.signInUser(values);
  };

  renderAuthenticationError() {
    if (this.props.authenticationError) {
      return <div className="alert alert-danger">{ this.props.authenticationError }</div>;
    }
    return <div></div>;
  }

  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <fieldset className={`form-group ${touched && error ? 'has-error' : ''}`}>
      <label className="control-label">{label}</label>
      <div>
        <input {...input} placeholder={label} className="form-control" type={type} />
        {touched && error && <div className="help-block">{error}</div>}
      </div>
    </fieldset>
  );

  render() {
    return(
      <div className="container">
        <div className="col-md-6 col-md-offset-3">
          <h2 className="text-center">Log In</h2>

          {this.renderAuthenticationError()}

          <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>

            <fieldset className="form-group">
              <label>Email</label>
              <Field name="email" component={this.renderField} className="form-control" type="text" placeholder="Email"/>
            </fieldset>

            <fieldset className="form-group">
              <label>Password</label>
              <Field name="password" component={this.renderField} className="form-control" type="password" placeholder="Password"/>
            </fieldset>

            <button action="submit" className="btn btn-primary">Sign In</button>

          </form>

        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    authenticationError: state.auth.error
  }
}

export default connect(mapStateToProps, Actions)(reduxForm({
  form: 'login',
  validate
})(Login));
