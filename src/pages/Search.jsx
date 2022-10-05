import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import ShowAlbum from '../components/ShowAlbum';

const MINIMUM_ARTIST_LENGTH = 2;

export default class Search extends Component {
  state = {
    searchDisabled: true,
    artist: '',
    loading: true,
    albuns: [],
    searched: '',
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { artist } = this.state;
      this.setState({
        searchDisabled: artist.length < MINIMUM_ARTIST_LENGTH,
      });
    });
  };

  handleSearchClick = async () => {
    const { artist } = this.state;
    this.setState({
      loading: true,
      albuns: await searchAlbumsAPI(artist),
      searched: artist,
    }, () => {
      this.setState({
        loading: false,
        artist: '',
      });
    });
  }

  isSearched = () => {
    const { searched } = this.state;
    return (
      searched.length > 0 ? <Loading /> : null
    );
  }

  render() {
    const { searchDisabled, artist, loading, albuns, searched } = this.state;
    const upcase = searched.toUpperCase();

    const mapAlbuns = albuns
      .map((album) => <ShowAlbum key={ album.collectionId } album={ album } />);

    const noAlbuns = <p>Nenhum álbum foi encontrado</p>;

    return (
      <div data-testid="page-search">
        <Header />
        <br />
        <br />
        <div>
          <input
            data-testid="search-artist-input"
            type="text"
            placeholder="Nome do Artista"
            name="artist"
            value={ artist }
            onChange={ this.handleChange }
          />
          <button
            data-testid="search-artist-button"
            type="submit"
            disabled={ searchDisabled }
            onClick={ this.handleSearchClick }
          >
            Pesquisar
          </button>
        </div>
        <div>
          { loading ? this.isSearched() : <p>{ `Resultado de álbuns de: ${upcase}` }</p> }
        </div>
        <div>
          { albuns.length === 0 ? noAlbuns : mapAlbuns }
        </div>
      </div>
    );
  }
}
