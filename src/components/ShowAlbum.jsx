import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ShowAlbum extends Component {
  render() {
    const { album } = this.props;
    const { collectionName, artworkUrl100, collectionId, artistName } = album;
    return (
      <div>
        <img src={ artworkUrl100 } alt={ `capa ${collectionName}` } />
        <h4>{ collectionName }</h4>
        <h5>{ artistName }</h5>
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          Acessar álbum
        </Link>
      </div>
    );
  }
}

ShowAlbum.propTypes = {
  album: PropTypes.shape({
    collectionName: PropTypes.string,
    artworkUrl100: PropTypes.string,
    artistName: PropTypes.string,
    collectionId: PropTypes.number,
  }).isRequired,
};
