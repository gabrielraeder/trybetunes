import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

export default class Album extends Component {
  state = {
    musics: '',
    artist: '',
    album: '',
    songs: [],
    loading: false,
    favoritas: [],
  }

  async componentDidMount() {
    const { match: {
      params: { id },
    } } = this.props;
    this.setState({
      musics: await getMusics(id),
    }, async () => {
      const { musics } = this.state;
      const { artistName, collectionName } = musics[0];
      this.setState({
        artist: artistName,
        album: collectionName,
        songs: musics.filter((music) => music.kind === 'song'),
        favoritas: await getFavoriteSongs(),
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
          favoritas: await getFavoriteSongs(),
        });
      }
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    const { artist, album, songs, loading, favoritas } = this.state;
    const showMusicCards = songs
      .map((song) => (<MusicCard
        key={ song.trackId }
        song={ song }
        favoriteSong={ this.favoriteSong }
        favoritas={ favoritas }
      />));

    return (
      <div data-testid="page-album">
        <Header />
        { loading ? <Loading /> : null }
        <div>
          <div>
            <h1 data-testid="artist-name">{ artist }</h1>
            <h3 data-testid="album-name">{ album }</h3>
          </div>
          <div>
            { showMusicCards }
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
