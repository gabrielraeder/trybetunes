import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

const MINIMUM_NAME_LENGTH = 3;

export default class Login extends Component {
  state = {
    buttonDisabled: true,
    inputName: '',
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { inputName } = this.state;
      this.setState({
        buttonDisabled: inputName.length < MINIMUM_NAME_LENGTH,
      });
    });
  };

  handleLogin = async () => {
    const { inputName } = this.state;
    const { history } = this.props;
    history.push('/loading');
    await createUser({ name: inputName });
    history.push('/search');
  }

  render() {
    const { buttonDisabled, inputName } = this.state;
    return (
      <div data-testid="page-login">
        <fieldset>
          <h1>TRYBETUNES</h1>
          <label htmlFor="login">
            Login
            <br />
            <input
              data-testid="login-name-input"
              type="text"
              name="inputName"
              value={ inputName }
              id="login"
              placeholder="Nome"
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="login-submit-button"
            type="submit"
            disabled={ buttonDisabled }
            onClick={ this.handleLogin }
          >
            Entrar
          </button>
        </fieldset>

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
