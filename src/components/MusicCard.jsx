import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  state = {
    isFavorite: false,
  }

  handleCheckbox = ({ target }) => {
    const { name, checked } = target;
    this.setState({
      [name]: checked,
    }, () => {
      const { isFavorite } = this.state;
      const { song, favoriteSong } = this.props;
      if (isFavorite) {
        favoriteSong(song, true);
      } else {
        favoriteSong(song, false);
      }
    });
  }

  render() {
    const { song, favoritas } = this.props;
    const { previewUrl, trackName, trackId } = song;
    const { isFavorite } = this.state;
    const isItFavorite = favoritas.some((fav) => fav.trackId === song.trackId);

    return (
      <div>
        <h5>{ trackName }</h5>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          <code>audio</code>
          .
        </audio>

        <label htmlFor="favoritar">
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name="isFavorite"
            id="favoritar"
            checked={ isItFavorite || isFavorite }
            onChange={ this.handleCheckbox }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.shape({
    previewUrl: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  favoriteSong: PropTypes.func.isRequired,
  favoritas: PropTypes.arrayOf(PropTypes.shape({
    trackId: PropTypes.number.isRequired,
  })).isRequired,
};
