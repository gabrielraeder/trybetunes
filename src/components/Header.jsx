import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  state = {
    user: {},
    loading: true,
  }

  async componentDidMount() {
    this.setState({
      loading: true,
      user: await getUser(),
    }, () => {
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    const { user, loading } = this.state;
    const { name } = user;
    const welcome = <p data-testid="header-user-name">{name}</p>;
    return (
      <div data-testid="header-component">
        <header>
          <div>
            <h1>TRYBETUNES</h1>
            <h4>{ loading ? 'Carregando...' : welcome}</h4>
          </div>
          <div>
            <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
            <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
            <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
          </div>
        </header>
      </div>
    );
  }
}
