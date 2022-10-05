import React, { Component } from 'react';
import Header from '../components/Header';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

export default class Favorites extends Component {
  state = {
    favorites: [],
    loading: false,
  }

  async componentDidMount() {
    this.setState({
      loading: true,
      favorites: await getFavoriteSongs(),
    }, () => {
      this.setState({
        loading: false,
      });
    });
  }

  favoriteSong = (song, isTrue) => {
    this.setState({
      loading: true,
    }, async () => {
      if (isTrue) await addSong(song);
      else {
        await removeSong(song);
        this.setState({
          favorites: await getFavoriteSongs(),
        });
      }
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    const { loading, favorites } = this.state;
    const mapFavs = favorites
      .map((song) => (<MusicCard
        key={ song.trackId }
        song={ song }
        favoriteSong={ this.favoriteSong }
        favoritas={ favorites }
      />));

    return (
      <div data-testid="page-favorites">
        <Header />
        <div>
          {loading ? <Loading /> : mapFavs }
        </div>
      </div>
    );
  }
}
