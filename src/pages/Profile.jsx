import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Profile extends Component {
  state = {
    user: {},
    loading: true,
  }

  async componentDidMount() {
    this.setState({
      user: await getUser(),
      loading: true,
    }, () => {
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    const { user, loading } = this.state;
    const { image, name, email, description } = user;

    return (
      <div data-testid="page-profile">
        <Header />
        { loading ? <Loading /> : (
          <div>
            <img src={ image } alt="imagem do usuario" data-testid="profile-image" />
            <h3>NOME</h3>
            <p>{ name }</p>
            <br />
            <h3>EMAIL</h3>
            <p>{ email }</p>
            <br />
            <h3>DESCRIÇÃO</h3>
            <p>{ description }</p>
            <br />
            <Link to="/profile/edit">Editar perfil</Link>
          </div>) }
      </div>
    );
  }
}
