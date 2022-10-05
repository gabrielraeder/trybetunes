import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class ProfileEdit extends Component {
  state = {
    user: {},
    loading: true,
    savedName: '',
    savedImage: '',
    savedEmail: '',
    savedDescription: '',
    btnDisabled: true,
  }

  async componentDidMount() {
    this.setState({
      user: await getUser(),
      loading: true,
    }, () => {
      const { user } = this.state;
      const { name, description, email, image } = user;
      this.setState({
        loading: false,
        savedName: name,
        savedImage: image,
        savedEmail: email,
        savedDescription: description,
      });
    });
    this.validateForm();
  }

  validateEmail = (email) => (
    String(email)
      .toLowerCase()
      .match(/\S+@\S+\.\S+/)
  );

  validateForm = () => {
    const { savedEmail, savedImage, savedName, savedDescription } = this.state;
    const emailCheck = this.validateEmail(savedEmail);
    const arr = [savedDescription, savedImage, savedName];
    const checks = arr.every((item) => item.length > 0);
    if (emailCheck && checks) {
      this.setState({
        btnDisabled: false,
      });
    } else {
      this.setState({
        btnDisabled: true,
      });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.validateForm();
    });
  }

  saveChanges = async () => {
    this.setState({
      loading: true,
    });
    const { savedEmail, savedImage, savedName, savedDescription } = this.state;
    const obj = {
      name: savedName,
      email: savedEmail,
      image: savedImage,
      description: savedDescription,
    };
    await updateUser(obj);
    const { history } = this.props;
    history.push('/profile');
  }

  render() {
    const { loading, savedImage, savedName, savedEmail,
      savedDescription, btnDisabled } = this.state;

    const inputs = (
      <div>
        <br />
        <label htmlFor="input-name">
          Nome
          <br />
          <input
            id="input-name"
            data-testid="edit-input-name"
            type="text"
            name="savedName"
            value={ savedName }
            onChange={ this.handleChange }
          />
        </label>
        <br />
        <br />
        <label htmlFor="input-email">
          E-mail
          <br />
          <input
            id="input-email"
            data-testid="edit-input-email"
            type="email"
            name="savedEmail"
            value={ savedEmail }
            onChange={ this.handleChange }
          />
        </label>
        <br />
        <br />
        <label htmlFor="input-description">
          Descrição
          <br />
          <textarea
            data-testid="edit-input-description"
            name="savedDescription"
            value={ savedDescription }
            onChange={ this.handleChange }
            id="input-description"
            cols="30"
            rows="10"
          />
        </label>
        <br />
        <br />
        <label htmlFor="input-image">
          Imagem
          <br />
          <input
            id="input-image"
            data-testid="edit-input-image"
            type="text"
            name="savedImage"
            value={ savedImage }
            onChange={ this.handleChange }
          />
        </label>
        <br />
        <br />
        <button
          type="submit"
          data-testid="edit-button-save"
          disabled={ btnDisabled }
          onClick={ this.saveChanges }
        >
          Salvar
        </button>
      </div>
    );

    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading ? <Loading /> : inputs }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
